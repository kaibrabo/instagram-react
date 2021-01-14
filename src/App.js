import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import firebase from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

const getModalStyle = () => {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
};

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const db = firebase.firestore();
	const auth = firebase.auth();

	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [openSignIn, setOpenSignIn] = useState('');


	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	const signUp = (e) => {
		e.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password).then((user) => {
				return user.user.updateProfile({
					displayName: username
				})
			}).catch((error) => alert(error.message));

			setOpen(false);
	}

	const signIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.catch((err) => alert(err.message));

		setOpenSignIn(false);
	}

	useEffect(() => {
		db
			.collection('posts')
			.onSnapshot(snap => {
				setPosts(snap.docs.map(doc => ({
					id: doc.id, post: doc.data()
				})));
			})
	}, [db, posts]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		}
	}, [auth, user, username]);

	return (
		<div className="App">
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />
						</center>

						<Input placeholder="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
						<Input placeholder="email" type="text" value={email} onChange={e => setEmail(e.target.value)}
						/>
						<Input placeholder="password" type="text" value={password} onChange={e => setPassword(e.target.value)}
						/>

						<Button onClick={signUp}>Sign Up</Button>
					</form>
				</div>
			</Modal>

			<Modal
				open={openSignIn}
				onClose={() => setOpenSignIn(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />
						</center>

						<Input placeholder="email" type="text" value={email} onChange={e => setEmail(e.target.value)}
						/>
						<Input placeholder="password" type="text" value={password} onChange={e => setPassword(e.target.value)}
						/>

						<Button onClick={signIn}>Sign In</Button>
					</form>
				</div>
			</Modal>

			<header className="app__header">
				<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />

				{user ?
					(
						<Button type="button" onClick={() => auth.signOut()}>
							Sign out
						</Button>
					) : (
						<div>
							<Button type="button" onClick={() => setOpen(true)}>
								Sign up
							</Button>
							<Button type="button" onClick={() => setOpenSignIn(true)}>
								Sign in
							</Button>
						</div>
					)
				}
			</header>
			<section className="posts">
				{posts.map(({ id, post }) => {
					return (
						<Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
					)
				})}
			</section>
		</div>
	);
}

export default App;

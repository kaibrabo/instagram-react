import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import firebase from './firebase';

function App() {
	const db = firebase.firestore();
	const auth = firebase.auth();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection('posts')
			.onSnapshot(snap => {
				setPosts(snap.docs.map(doc => ({
					id: doc.id, post: doc.data()
				})));
			})
	}, [db, posts]);

	return (
		<div className="App">
			<header className="app__header">
				<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />
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

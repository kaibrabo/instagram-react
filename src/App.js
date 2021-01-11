import React from 'react';
import './App.css';
import Post from './Post';

function App() {
	return (
		<div className="App">
			<header className="app__header">
				<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />
			</header>
			<section className="posts">
				<Post username="kai_onthereal" caption="Wow its works" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png" />
				<Post username="wiserooster" caption="Wow its works" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png" />
				<Post username="_kchanguex" caption="Wow its works" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png" />

			</section>
		</div>
	);
}

export default App;

import React from 'react';
import './Post.css';

function Post() {
    return (
        <div className='post'>
            <h3> Username </h3>
            <img className="post__img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png" alt=""/>
            <h4 className="post__text"><strong>Username</strong> caption</h4>
        </div>
    )
}

export default Post;
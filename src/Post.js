import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, caption, imageUrl, postId, db, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')

    const postComment = e => {
        e.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setComment('');
    }

    useEffect(() => {
        let unsubscribe;

        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        }
    }, [postId, db])


    return (
        <div className='post'>
            <div className="post__header">
                <Avatar className="post__avatar" src="" alt={username} />
                <h3>{username}</h3>
            </div>

            <img className="post__img" src={imageUrl} alt="" />

            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map(comment => {
                    return (
                        <p className="comment__text" key={comment.timestamp}><strong>{comment.username}</strong> {comment.text}</p>
                    )
                })}
            </div>

            {
                user && (
                    <form className="post__commentInput">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}></input>
                        <button type="submit" disabled={!comment} onClick={postComment}>Post</button>
                    </form>
                )
            }

        </div>
    )
}

export default Post;
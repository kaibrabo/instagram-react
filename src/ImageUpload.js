import React, { useState } from 'react';
import { Button } from '@material-ui/core'
import firebase from './firebase';

function ImageUpload({username, setOpenImageUpload}) {
    const db = firebase.firestore();
    const storage = firebase.storage();
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    // const [url, setUrl] = useState('');

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const upload = storage
            .ref(`images/${image.name}`)
            .put(image);

        upload.on(
            'state_changed',
            (snapshot) => {
                // progress()
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                setProgress(progress);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default:
                        console.log("default");
                }
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                // complete()
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageUrl: url,
                            caption: caption,
                            username: username,
                        });
                    });

                setProgress(0);
                setCaption('');
                setImage(null);
                setOpenImageUpload(false);
            })
    }

    return (
        <div className="imageUpload">
            <progress value={progress} max="100"/>
            <p>{progress}%</p>
            <input type="file" onChange={handleChange} />
            <input type="text" placeholder="Write a caption..." onChange={e => setCaption(e.target.value)} style={{'border': '1px solid rgb(219,219,219)', 'border-radius': '3px', 'padding': '10px', 'width': '280px'}}/>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload;
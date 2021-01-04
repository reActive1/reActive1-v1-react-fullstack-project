import React, {useState} from 'react';
import axios from 'axios';
import './CssComponents/UploadNewExercise.css';

export default function UploadNewExercise() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // convert img to url
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
           const req =  await axios.post('http://localhost:5000/api/uploadExerciseImg',{data : base64EncodedImage});
        } catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Upload</h1>
            <form onSubmit={handleSubmitFile} className="form">
                <div>
                <input
                 type="file"
                  name="image" 
                  onChange={handleFileInputChange} 
                  value={fileInputState} 
                  className="form-input"
                   />
                </div>
          
                <button className="btn" type="submit">Submit</button>
            </form>
            {previewSource && (
                <img src={previewSource} alt="chosen" style={{height: '300px'}} />
            )}
        </div>
    )
}


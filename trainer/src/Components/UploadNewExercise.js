import React, {useState} from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './CssComponents/UploadNewExercise.css';


var Types_of_exercises = [ // todo: read from db (fix it also in exerciseForm)
    {
      key: 'Back exercises',
      text: "Back exercises",
      value: "Back exercises",
    },
    {
      key: 'Legs exercises',
      text: "Legs exercises",
      value: "Legs exercises",
    },
    {
      key: 'Abs exercisesbs',
      text: "Abs exercisesbs",
      value: "Abs exercisesbs",
    },
    {
      key: 'Shoulders exercises',
      text: "Shoulders exercises",
      value: "Shoulders exercises",
    },
    {
      key: 'FullBody exercises',
      text: "FullBody exercises",
      value: "FullBody exercises",
    },
  ];
export default function UploadNewExercise() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [categoryName, setCategoryName] = useState("Back exercises");
    const [exerciseName, setExerciseName] = useState('');
    const [sendData, setSendData] = useState(false);

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

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        // if (!previewSource) return;
        setSendData(true);
        const imgUrl = await uploadImage(previewSource);
        console.log("categoryName: ", categoryName)
        const newExercise = {
            name: exerciseName,
            category: categoryName,
            imgSource: imgUrl
        }
        console.log("new exercise: ", newExercise)
        try {
            const req =  await axios.post('http://localhost:5000/api/newExercise',newExercise);
            setSendData(false);
        } catch(error){
            alert("We are sorry, there is a problem. please try again later")
             console.error(error);
         }
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
           const req =  await axios.post('http://localhost:5000/api/uploadExerciseImg',{data : base64EncodedImage});
           return req.data.imgUrl;
        } catch(error){
            console.error(error);
        }
    }

    return (
                 <div className="container card-container">
                <div className="myCard">
                    <div className="row card-row">
                        <div className="col-md-6">
                            <div className="myLeftCtn"> 
            <header>Upload</header>
            <form onSubmit={handleSubmitFile} className="container">
                <div className="file-uploader">
                <input
                 type="file"
                  name="image" 
                  onChange={handleFileInputChange} 
                  value={fileInputState} 
                  className="form-input"
                   />
                </div>
 
                <div>
                <Dropdown
                    placeholder='Choose category'
                    selection
                    options={Types_of_exercises}
                    value={categoryName}
                    defaultValue={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                </div>
                <div>
                <input type = 'text'
                    placeholder='Exercise name'
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                />
                </div>
                <button className="btn" type="submit">Submit</button>
                <Loader
                type="Hearts"
                color="#00BFFF"
                height={100}
                width={100}
                visible={sendData}
               />            
      </form>
        </div>
                        </div> 
                        <div className="col-md-6">
                            <div className="myRightCtn">
                                <header>Preview:</header>
                            {previewSource && (
                            <img src={previewSource} alt="chosen" style={{height: '300px'}} />
                              )}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

    )
}


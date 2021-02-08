import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './CssComponents/UploadNewExercise.css';
import * as IoIo from "react-icons/io";


export default function UploadNewExercise() {
    const [fileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [categoryName, setCategoryName] = useState("Back exercises");
    const [exerciseName, setExerciseName] = useState('');
    const [sendData, setSendData] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
            async function fetchApi(){
            const res = await axios.get("http://localhost:5000/api/categories");
            let categoriesEdited = res.data.map(params => {
              return{
                key: params.name,
                text: params.name,
                value: params.name
              };
            });
            setCategories(categoriesEdited);
        }
        fetchApi();
      }, [categories]);

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
        console.log("categoryName: ", categoryName )
        const newExercise = {
            name: exerciseName,
            category: categoryName,
            imgSource: imgUrl
        }
        console.log("new exercise: ", newExercise)
        try {
            await axios.post('http://localhost:5000/api/newExercise',newExercise);
            setSendData(false);
            alert("You did it!")
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

            <form onSubmit={handleSubmitFile} className="container-upload">
            <header>Do it yourself! <IoIo.IoIosConstruct/></header>
                <input
                 type="file"
                  name="image" 
                  onChange={handleFileInputChange} 
                  value={fileInputState} 
                  className="form-input"
                   />
                <br></br>
                <Dropdown
                    placeholder='Choose category'
                    selection
                    options={categories}
                    value={categoryName}
                    categoriesEdited
                    onChange={(event, select) => {
                        console.log(select.value)
                    setCategoryName(select.value)}}
                />
                 <br></br>
                <input type = 'text'
                    placeholder='Exercise name'
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                />
                <button className="btn-hover color-1" type="submit">Submit</button>
                <Loader
                type="Hearts"
                color="#00BFFF"
                height={100}
                width={100}
                visible={sendData}
                className="hearts-spinner"
               />            
      </form>
        </div>
                        </div> 
                        <div className="col-md-6">
                            <div className="myRightCtn">  
                            <div className="box text-white pb-5 text-center">
                            {!previewSource && (<header>Missing any exercise?</header>)}
                            {!previewSource && (
                            <p className="contact-text pt-4">Upload a gif, select category, choose a name and thats it!</p>)}
                            {previewSource && (
                            <img src={previewSource} alt="chosen" style={{height: '250px'}} />
                              )}
                              </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

    )
}


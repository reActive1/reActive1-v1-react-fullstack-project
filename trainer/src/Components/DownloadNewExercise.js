import React, {useEffect, useState} from 'react';
import {Image} from 'cloudinary-react';
import axios from 'axios';


export default function DownloadNewExercise(){
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            // const res = await axios.get('http://localhost:5000/api/images');
            const res = await fetch('http://localhost:5000/api/images');
            const data = await res.json();
            // const data = await res.data();
            console.log(data);
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        console.log("useEffect");
        loadImages();
    }, []);
return (
    <div>
         <h1 className="title">Cloudinary Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName= "dudxklqht" //{process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    
                    ))}
                    
            </div>
    </div>
);
}
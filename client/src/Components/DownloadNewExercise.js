import React, {useEffect, useState} from 'react';
import {Image} from 'cloudinary-react';


export default function DownloadNewExercise(){
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/images');
            const data = await res.json();
            console.log(data);
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
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
                            cloudName= "dudxklqht"
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />

                    ))}

            </div>
    </div>
);
}
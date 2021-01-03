import React from 'react';
import ImageUploader from 'react-images-upload';
import './CssComponents/UploadNewExercise.css';
 
class UploadNewExercise extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        console.log(this.state.pictures)
    }
 
    render() {
        return (
         <ImageUploader
                className="UploadNewExercise"
                withIcon={true}
                singleImage={true}
                withPreview={true}
                buttonText='Choose an image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
            />
        );
    }
}

export default UploadNewExercise;
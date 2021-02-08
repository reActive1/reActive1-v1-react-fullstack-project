import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { ENV } from './../Common/Enums.js';

export default function DownloadNewExercise() {
	const [ imageIds, setImageIds ] = useState();
	const loadImages = async () => {
		try {
			const res = await fetch(`${ENV}/api/images`);
			const data = await res.json();
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
						<Image key={index} cloudName="dudxklqht" publicId={imageId} width="300" crop="scale" />
					))}
			</div>
		</div>
	);
}

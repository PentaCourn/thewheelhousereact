import React, { useEffect, useState } from 'react';
import path from './Images/image.png';

const Test = () => {
    const [imagePath, setImagePath] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/test/1/image-path') // Replace with your actual endpoint
            .then(response => response.text())
            .then(data => {
                setImagePath(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        console.log('image:', imagePath);
        console.log('path:', path);
    }, [imagePath]);

    return (
        <div>
            {imagePath && (
                <div>
                    <h2>Image from Path:</h2>
                    <img src={path} alt="Description" />
                </div>
            )}
            {imagePath && (
                <div>
                    <h2>Image from Path:</h2>
                    <img src={imagePath} alt="Description" />
                </div>
            )}
        </div>
    );
};

export default Test;
import React from 'react';
import './Text.css';

const ImageText = ({ left = true, title, text, imageUrl }) => {
    return (
        <div className={`text-layout ${left ? 'layout-left' : 'layout-right'}`}>
             <img src={imageUrl} alt={title} className="layout-image" />
            <div className="layout-text">
                <h2 className="layout-title">{title}</h2>
                <p className="layout-description">{text}</p>
            </div>
        </div>
    );
};

export default ImageText;
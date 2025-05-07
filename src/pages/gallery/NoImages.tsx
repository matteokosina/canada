import { Binoculars } from 'lucide-react';
import React from 'react';
import './gallery.css';
const NoImages: React.FC = () => {
    return (
    <div className='no-images'>
        <Binoculars className='binoculars'/>
        <p className="no-images-text">Hier gibt es noch nichts zu sehen...</p>
    </div>
    );
};

export default NoImages;
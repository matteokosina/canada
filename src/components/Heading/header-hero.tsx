import React, { useEffect, useState } from 'react';
import './hero.css';

const VancouverHeader = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="vancouver-header">
            <h1 className={`title ${isVisible ? 'animate-title' : ''}`}>
                Vancouver <span className="subtitle">Canada</span>
            </h1>
            <p className="description">
                Vancouver is a vibrant city nestled between the ocean and majestic mountains,
                offering breathtaking natural beauty.
            </p>
        </div>
    );
};

export default VancouverHeader;

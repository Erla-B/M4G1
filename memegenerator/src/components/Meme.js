import React from 'react';


// My meme component that I pass into the App
export const Meme = ({ template, onClick }) => {
    return (
        <img 
        style={{ width: 400, padding: 20 }}
        key={template.id} 
        src={template.url} 
        alt={template.name}
        onClick={onClick}
        />
    );
};
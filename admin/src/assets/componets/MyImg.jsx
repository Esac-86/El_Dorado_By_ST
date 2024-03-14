import React from 'react';

function MyImg({ src, className1, className2 }) {
    // Construir la URL completa de la imagen
    const imageUrl = `http://localhost:8000/${src}`;

    return (
        <div className={className1}>
            <img src={imageUrl} alt="" className={className2} />
        </div>
    );
}

export default MyImg;

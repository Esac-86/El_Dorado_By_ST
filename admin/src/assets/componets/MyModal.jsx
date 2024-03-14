import React, {useState } from 'react';
import estilos from './myModal.module.css';


function MyModal({ show, onClick, titulo, children}) {
    return (
        show && (
            <div className={`${estilos.modalBase}`} >
                <div className={`${estilos.modal}`}>
                    <div className={`${estilos.closeModal}`} onClick={onClick}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-11 h-11">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </div>
                    <h1>{titulo}</h1>
                    <div>{children}</div>
                </div>
            </div>
        )
    )
}

export default MyModal
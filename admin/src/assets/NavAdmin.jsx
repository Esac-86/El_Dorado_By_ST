import React, { useState } from 'react'
import estilos from './navAdmin.module.css'


function NavAdmin() {
    
    return (
        <>
            <div className={`${estilos.navegador} flex items-center justify-center relative py-6 px-5`}>
                <img src="http://localhost:8000/src/img/logo.png" alt="logoDorado" className="h-14 w-auto mr-4" />
                {/* <h1 className="panelh1 bg-white rounded-lg px-2 py-1 absolute text-sm text-black  font-bold sm-block right-5">Panel administrativo</h1> */}
            </div>
        </>
    )
}
export default NavAdmin
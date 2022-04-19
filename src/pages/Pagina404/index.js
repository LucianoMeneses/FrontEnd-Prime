import React from 'react'
import imagen from '../../assets/img/404.png'
import '../../assets/css/404.css'

const Pagina404 = () => {
    return (
        <main className="container flex flex--centro flex--coluna">
            <img className="imagem-404" src={imagen} alt="Pagina não encontrado" />
        </main>
    )
}

export default Pagina404;
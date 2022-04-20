import React, { useEffect, useState } from "react";
import api from "../../Api/api";

export default function Teste() {
    const [cliente, setCliente] = useState();

    useEffect(() => {
        api
            .get("/clientes")
            .then((response) => setCliente(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);

            });
    }, []);

    console.log(cliente[0])

    return (

        <div className="App">
            <p>Usuário: {cliente[0].nome}</p>
            <p>Biografia: {}</p>
        </div>


    );
}
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../App.css';
import React, { useState } from 'react';

function CadastroCliente() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numeroRua, setNumeroRua] = useState('');
    const [complemento, setComplemento] = useState('');

    const handleChangeNumero = (e) => {
        setNumero(e.target.value)
    }

    const handleChangeNome = (e) => {
        setNome(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeCidade = (e) => {
        setCidade(e.target.value)
    }

    const handleChangeBairro = (e) => {
        setBairro(e.target.value)
    }

    const handleChangeRua = (e) => {
        setRua(e.target.value)
    }

    const handleChangeNumeroRua = (e) => {
        setNumeroRua(e.target.value)
    }

    const handleChangeComplemento = (e) => {
        setComplemento(e.target.value)
    }

    return (
        <>
            <div className="areaFormulario">
                <div className="card">
                    <h1 className="info">Informações do cliente</h1>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="in" value={nome} onChange={(e) => handleChangeNome(e)} className="p-inputtext-sm block mb-2" maxLength="80" />
                                <label htmlFor="in">Nome Cliente</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="in" value={email} onChange={(e) => handleChangeEmail(e)} className="p-inputtext-sm block mb-2" maxLength="60" />
                                <label htmlFor="in">Email</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-2">
                            <span className="p-float-label">
                                <InputMask id="basic" mask="99-999999999" value={numero} onChange={(e) => handleChangeNumero(e)} className="p-inputtext-sm block mb-2"></InputMask>
                                <label htmlFor="in">Número telefone</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-2">
                            <span className="p-float-label">
                                <InputText id="in" value={cidade} onChange={(e) => handleChangeCidade(e)} className="p-inputtext-sm block mb-2" maxLength="20" />
                                <label htmlFor="in">Cidade</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-3">
                            <span className="p-float-label">
                                <InputText id="in" value={bairro} onChange={(e) => handleChangeBairro(e)} className="p-inputtext-sm block mb-2" maxLength="30" />
                                <label htmlFor="in">Bairro</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-4">
                            <span className="p-float-label">
                                <InputText id="in" value={rua} onChange={(e) => handleChangeRua(e)} className="p-inputtext-sm block mb-2" maxLength="30" />
                                <label htmlFor="in">Rua</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-1">
                            <span className="p-float-label">
                                <InputText id="in" value={numeroRua} onChange={(e) => handleChangeNumeroRua(e)} className="p-inputtext-sm block mb-2" maxLength="10" />
                                <label htmlFor="in">Número</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-12">
                            <span className="p-float-label">
                                <InputText id="in" value={complemento} onChange={(e) => handleChangeComplemento(e)} className="p-inputtext-sm block mb-2" maxLength="200" />
                                <label htmlFor="in">Complemento</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-1">
                            <span className="p-float-label">
                                <Button label="Salvar" className="p-button p-component p-button-sm mr-2 mb-2" icon="pi pi-check" iconPos="right" />
                            </span>
                        </div>
                        <div className="field col-12 md:col-1">
                            <span className="p-float-label">
                                <Button label="Voltar" className="p-button-secondary p-button-sm mr-2 mb-2" icon="pi pi-replay" iconPos="right" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default CadastroCliente;
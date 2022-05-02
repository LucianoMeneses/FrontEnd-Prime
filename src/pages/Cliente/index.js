import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import '../../App.css';
import api from "../../Api/api";

const DataTableCliente = () => {

    useEffect(() => {

        async function buscar() {
            await api
                .get("/clientes")
                .then((response) => setCliente(response.data))
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
        }
        buscar();
    }, []);

    async function buscar() {
        await api
            .get("/clientes")
            .then((response) => setCliente(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const [id, setId] = useState()
    const [cliente, setCliente] = useState();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [clienteDialog, setClienteDialog] = useState(false);
    const [deleteClienteDialog, setDeleteClienteDialog] = useState(false);
    const [deleteClientesDialog, setDeleteClientesDialog] = useState(false);
    const [clientesSelecionados, setClientesSelecionados] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const novo = () => {
        setId(null)
        setNome('')
        setEmail('')
        setTelefone('')
        setCidade('')
        setBairro('')
        setRua('')
        setNumero('')
        setComplemento('')
        setSubmitted(false);
        setClienteDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setClienteDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteClienteDialog(false);
    }

    const ocultarPopupExcluirClientes = () => {
        setDeleteClientesDialog(false);
    }

    const saveProduct = async () => {
        setSubmitted(true);

        if (nome.trim() && email && telefone && cidade && bairro && rua && numero) {

            const clientes =
            {
                nome: nome,
                email: email,
                telefone: telefone,
                cidade: cidade,
                bairro: bairro,
                rua: rua,
                numero: numero,
                complemento: complemento
            }

            if (id) {

                await api
                    .put(`/clientes/${id}`, clientes)
                    .then(function (response) {
                        console.log(response);

                        if (response.status === 200) {
                            setClienteDialog(false);
                            showSuccess();
                            buscar();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        setClienteDialog(false);
                        showError()
                    });

            } else {

                await api
                    .post("/clientes", clientes)
                    .then(function (response) {
                        console.log(response);
                        if (response.status === 200) {
                            setClienteDialog(false)
                            showSuccess();
                            buscar();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        setClienteDialog(false)
                        showError()
                    });

                setClienteDialog(false)
            }
        }

    }

    const confirmDeleteClient = (rowData) => {
        setDeleteClienteDialog(true);
        setId(rowData.id)
        setNome(rowData.nome)

    }

    const confirmEditCliente = (cliente) => {

        setClienteDialog(true);
        setId(cliente.id)
        setNome(cliente.nome)
        setEmail(cliente.email)
        setTelefone(cliente.telefone)
        setCidade(cliente.cidade)
        setBairro(cliente.bairro)
        setRua(cliente.rua)
        setNumero(cliente.numero)
        setComplemento(cliente.complemento)
    }

    const deleteProduct = async () => {

        await api
            .delete(`/clientes/${id}`)
            .then(function (response) {
                console.log(response);

                if (response.status === 204) {
                    setDeleteClienteDialog(false);
                    showSuccess();
                    setClientesSelecionados(null);
                    buscar();
                }
            })
            .catch(function (error) {
                console.log(error);
                setDeleteClienteDialog(false);
                setClientesSelecionados(null);
                showError()
            });
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteClientesDialog(true);
    }

    const deleteSelectedProducts = async () => {

        clientesSelecionados.map(
            async (clientes) => {

                await api
                    .post("/clientes/deletarClientes", clientes)
                    .then(function (response) {
                        console.log(response);

                        if (response.status === 204) {
                            setDeleteClientesDialog(false);
                            setClientesSelecionados(null);
                            showSuccess();
                            buscar();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        setDeleteClientesDialog(false);
                        setClientesSelecionados(null);
                        showError()
                    });
            }
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => confirmEditCliente(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteClient(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="">Clientes</h5>
            <div className="button-header">
                <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={novo} />
                <Button label="Excluir" icon="pi pi-trash" className="p-button-danger mr-2" onClick={confirmDeleteSelected} disabled={!clientesSelecionados || !clientesSelecionados.length} />
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help mr-2" onClick={exportCSV} />
            </div>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Procurar..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={ocultarPopupExcluirClientes} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada', life: 4000 });
    }

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Operação não realizada, favor contate o administrador do sistema', life: 8000 });
    }

    return (

        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card-table">
                <DataTable ref={dt} value={cliente} selection={clientesSelecionados} onSelectionChange={(e) => setClientesSelecionados(e.value)}
                    dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 12, 24]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} Clientes"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '1rem' }} exportable={false}></Column>
                    <Column field="id" header="Id" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="email" header="Email" style={{ minWidth: '4rem' }}></Column>
                    <Column field="telefone" header="Telefone" style={{ minWidth: '5rem' }}></Column>
                    <Column field="cidade" header="Cidade" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="bairro" header="Bairro" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="rua" header="Rua" style={{ minWidth: '5rem' }}></Column>
                    <Column field="numero" header="Número" style={{ minWidth: '2rem' }}></Column>
                    <Column field="complemento" header="Complemento" style={{ minWidth: '5rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '9rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={clienteDialog} style={{ width: '900px' }} header="Detalhes do cliente" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" minLength="3" maxLength="50" value={nome} onChange={(e) => setNome(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nome.trim() })} />
                </div>

                <div className="field">
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-7 mb-1">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" maxLength="40" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !email.trim() })} />
                        </div>

                        <div className="p-fieldset-content col-5">
                            <label htmlFor="telefone">Telefone</label>
                            <InputText id="telefone" maxLength="11" keyfilter="num" value={telefone} onChange={(e) => setTelefone(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !telefone.trim() })} />
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-5">
                            <label htmlFor="cidade">Cidade</label>
                            <InputText id="cidade" maxLength="20" value={cidade} onChange={(e) => setCidade(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !cidade.trim() })} />
                        </div>
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="bairro">Bairro</label>
                            <InputText id="bairro" maxLength="20" value={bairro} onChange={(e) => setBairro(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !bairro.trim() })} />
                        </div>
                        <div className="p-fieldset-content col-9">
                            <label htmlFor="rua">Rua</label>
                            <InputText id="rua" maxLength="20" value={rua} onChange={(e) => setRua(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !rua.trim() })} />
                        </div>
                        <div className="p-fieldset-content col-3">
                            <label htmlFor="numero">Número</label>
                            <InputText id="numero" maxLength="10" value={numero} onChange={(e) => setNumero(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !numero.trim() })} />
                        </div>
                        <div className="p-fieldset-content col-12">
                            <label htmlFor="complemento">Complemento</label>
                            <InputText id="complemento" maxLength="30" value={complemento} onChange={(e) => setComplemento(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !complemento.trim() })} />
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteClienteDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {cliente && <span>Você tem certeza que deseja excluir <b>{nome}</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={deleteClientesDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={ocultarPopupExcluirClientes}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {cliente && <span>Você tem certeza que deseja excluir todos os clientes selecionados?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default DataTableCliente;
import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import '../../App.css';
import api from "../../Api/api";

const DataTableCliente = () => {

    const showSuccess = () => {
        messages.current.show({ severity: 'success', summary: 'Success Message', detail: 'Order submitted', life: 5000, content: "Usuário exluído com sucesso" });
    }

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

    let emptyProduct = {

        id: null,
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: ''
    };

    const [id, setId] = useState([])
    const [cliente, setCliente] = useState([emptyProduct]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [products, setProducts] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = async () => {
        setSubmitted(true);

        const clientes =
        {
            id: null,
            nome: nome,
            email: email,
            telefone: telefone,
            cidade: cidade,
            bairro: bairro,
            rua: rua,
            numero: numero
        }

        await api
            .post("/clientes", clientes)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        showSuccess();

    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteClient = (rowData) => {
        setDeleteProductDialog(true);
        setId(rowData.id)

    }

    const deleteProduct = async () => {

        await api
            .delete(`/clientes/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        setDeleteProductDialog(false);

        showSuccess();
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {

    }

    const messages = useRef(null);

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteClient(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="">Clientes</h5>
            <div className="button-header">
                <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Excluir" icon="pi pi-trash" className="p-button-danger mr-2" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help mr-2" onClick={exportCSV} />
            </div>
            <Messages ref={messages}></Messages>
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
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );


    return (

        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card-table">
                <DataTable ref={dt} value={cliente} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={6} rowsPerPageOptions={[6, 12, 24]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} Clientes"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="id" header="Id" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="email" header="Email" style={{ minWidth: '5rem' }}></Column>
                    <Column field="telefone" header="Telefone" style={{ minWidth: '5rem' }}></Column>
                    <Column field="cidade" header="Cidade" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="bairro" header="Bairro" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="rua" header="Rua" style={{ minWidth: '5rem' }}></Column>
                    <Column field="numero" header="Número" style={{ minWidth: '2rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '5rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '600px' }} header="Detalhes do cliente" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div className="field">
                    <label className="mb-3">Contato</label>
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="name">Email</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="p-fieldset-content col-5">
                            <label htmlFor="in">Telefone</label>
                            <InputMask id="email" value={telefone} mask="99-999999999" onChange={(e) => setTelefone(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="mb-3">Endereço</label>
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-5">
                            <label htmlFor="in">Cidade</label>
                            <InputText id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                        </div>
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="in">Bairro</label>
                            <InputText id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </div>
                        <div className="p-fieldset-content col-9">
                            <label htmlFor="in">Rua</label>
                            <InputText id="rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                        </div>
                        <div className="p-fieldset-content col-3">
                            <label htmlFor="in">Número</label>
                            <InputText id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                        </div>
                        <div className="p-fieldset-content col-12">
                            <label htmlFor="in">Complemento</label>
                            <InputText id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Você tem certeza que deseja excluir <b>{nome}</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Você tem certeza que deseja excluir todos os clientes selecionados?</span>}
                </div>
            </Dialog>
        </div>
    );
}


export default DataTableCliente;
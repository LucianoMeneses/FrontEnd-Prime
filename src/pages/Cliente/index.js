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

    let emptyCliente = {

        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: ''
    };

    const [id, setId] = useState([])
    const [cliente, setCliente] = useState();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyCliente);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const openNew = () => {
        setProduct(emptyCliente);
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

        if (nome && email && telefone && cidade && bairro && rua && numero) {

            const clientes =
            {
                id: null,
                nome: nome,
                email: email,
                telefone: telefone,
                cidade: cidade,
                bairro: bairro,
                rua: rua,
                numero: numero,
                complemento: complemento
            }

            await api
                .post("/clientes", clientes)
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        setProductDialog(false)
                        showSuccess();
                        buscar();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setProductDialog(false)
                    showError()
                });

            setProductDialog(false)
        }

    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteClient = (rowData) => {
        setDeleteProductDialog(true);
        setId(rowData.id)
        setNome(rowData.nome)

    }

    const deleteProduct = async () => {

        await api
            .delete(`/clientes/${id}`)
            .then(function (response) {
                console.log(response);

                if (response.status === 204) {
                    setDeleteProductDialog(false);
                    showSuccess();
                    buscar();
                }
            })
            .catch(function (error) {
                console.log(error);
                setDeleteProductDialog(false);
                showError()
            });
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {

    }

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
                <DataTable ref={dt} value={cliente} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={6} rowsPerPageOptions={[6, 12, 24]}
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

            <Dialog visible={productDialog} style={{ width: '600px' }} header="Detalhes do cliente" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" maxLength="50" value={nome} onChange={(e) => setNome(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nome })} />
                </div>

                <div className="field">
                    <label className="mb-3">Contato</label>
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="name">Email</label>
                            <InputText id="email" maxLength="40" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !email })} />
                        </div>

                        <div className="p-fieldset-content col-5">
                            <label htmlFor="in">Telefone</label>
                            <InputText id="telefone" maxLength="11" keyfilter="num" value={telefone} onChange={(e) => setTelefone(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !telefone })} />
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="mb-3">Endereço</label>
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-5">
                            <label htmlFor="in">Cidade</label>
                            <InputText id="cidade" maxLength="20" value={cidade} onChange={(e) => setCidade(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !cidade })} />
                        </div>
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="in">Bairro</label>
                            <InputText id="bairro" maxLength="20" value={bairro} onChange={(e) => setBairro(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !bairro })} />
                        </div>
                        <div className="p-fieldset-content col-9">
                            <label htmlFor="in">Rua</label>
                            <InputText id="rua" maxLength="20" value={rua} onChange={(e) => setRua(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !rua })} />
                        </div>
                        <div className="p-fieldset-content col-3">
                            <label htmlFor="in">Número</label>
                            <InputText id="numero" maxLength="10" value={numero} onChange={(e) => setNumero(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !numero })} />
                        </div>
                        <div className="p-fieldset-content col-12">
                            <label htmlFor="in">Complemento</label>
                            <InputText id="complemento" maxLength="30" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
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
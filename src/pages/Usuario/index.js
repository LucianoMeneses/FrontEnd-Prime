import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import '../../App.css';
import api from "../../Api/api";

const DataTableUsuario = () => {

    const showSuccess = () => {
        messages.current.show({ severity: 'success', summary: 'Success Message', detail: 'Order submitted', life: 5000, content: "Usuário excluido com sucesso" });
    }

    useEffect(() => {

        async function buscar() {
            await api
                .get("/usuarios")
                .then((response) => setUsuario(response.data))
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
        }
        buscar();
    }, []);

    let emptyUsuario = {

        id: null,
        nome: '',
        dataCadastro: '',
        perfil: '',
    };

    const [id, setId] = useState([])
    const [usuario, setUsuario] = useState([emptyUsuario]);
    const [nome, setNome] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [perfil, setPerfil] = useState('');
    const [city, setCity] = useState('');
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyUsuario);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const openNew = () => {
        setProduct(emptyUsuario);
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

        const usuario =
        {
            id: null,
            nome: nome,
            perfil: perfil,
        }

        await api
            .post("/usuarios", usuario)
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
            .delete(`/usuarios/${id}`)
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


    const perfis = [
        { label: 'Admnistrador', value: 'ADMINISTRADOR' },
        { label: 'Vendedor', value: 'VENDEDOR' }
    ];


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
            <h5 className="">Usuários</h5>
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
            <Button label="NÃ£o" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="NÃ£o" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );


    return (

        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card-table">
                <DataTable ref={dt} value={usuario} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={6} rowsPerPageOptions={[6, 12, 24]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} usuários"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="id" header="Id" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="perfil" header="Perfil" style={{ minWidth: '5rem' }}></Column>
                    <Column field="dataCadastro" header="Data de cadastro" style={{ minWidth: '5rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '5rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '600px' }} header="Detalhes do usuário" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div className="field">
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="name">Perfil</label>
                            <Dropdown value={perfil} options={perfis} onChange={(e) => setPerfil(e.value)} placeholder="Selecione um perfil" />
                        </div>
                    </div>
                </div>

            </Dialog>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>VocÃª tem certeza que deseja excluir <b>{nome}</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Você tem certeza que deseja excluir todos os usuarios selecionados?</span>}
                </div>
            </Dialog>
        </div>
    );
}


export default DataTableUsuario;


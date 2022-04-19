import React, { useState, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputMask } from 'primereact/inputmask'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../../App.css';

const DataTableCliente = () => {

    const cliente = [{
        id: 1,
        nome: 'Luciano Araujo Meneses',
        email: "luciano@gmail.com",
        telefone: '85-999663245',
        cidade: 'Fortaleza',
        bairro: 'Siqueira',
        rua: 'Rua João pedro moreira brandão',
        numero: '100A'
    },
    {
        id: 4,
        nome: 'Luciano Araujo Meneses',
        email: "luciano@gmail.com",
        telefone: '85-999663245',
        cidade: 'Fortaleza',
        bairro: 'Siqueira',
        rua: 'Rua João pedro moreira brandão',
        numero: '100A'
    },
    {
        id: 5,
        nome: 'Luciano Araujo Meneses',
        email: "luciano@gmail.com",
        telefone: '85-999663245',
        cidade: 'Fortaleza',
        bairro: 'Siqueira',
        rua: 'Rua João pedro moreira brandão',
        numero: '100A'
    },
    {
        id: 6,
        nome: 'Luciano Araujo Meneses',
        email: "luciano@gmail.com",
        telefone: '85-999663245',
        cidade: 'Fortaleza',
        bairro: 'Siqueira',
        rua: 'Rua João pedro moreira brandão',
        numero: '100A'
    },
    {
        nome: 'Pedro Araujo Meneses',
        email: "luciano@gmail.com",
        telefone: '85-999663245',
        cidade: 'Fortaleza',
        bairro: 'Siqueira',
        rua: 'Rua João pedro moreira brandão',
        numero: '100A'
    },
    {
        id: 8,
        nome: 'João Araujo Meneses',
        email: "luciano@gmail.com",
        telefone: '85-999663245',
        cidade: 'Fortaleza',
        bairro: 'Siqueira',
        rua: 'Rua João pedro moreira brandão',
        numero: '100A'
    },
    {
        id: 9,
        nome: 'Thiago Araujo Meneses',
        email: "luciano@gmail.com",
        telefone: '85-999663245',
        cidade: 'Fortaleza',
        bairro: 'Siqueira',
        rua: 'Rua João pedro moreira brandão',
        numero: '100A'
    },

    ]

    let emptyProduct = {
        id: 9,
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: ''
    };

    const [products, setProducts] = useState(null);
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

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const importCSV = (e) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map(d => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c.toLowerCase());
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                    return obj;
                }, {});

                processedData['id'] = createId();
                return processedData;
            });

            const _products = [...products, ...importedData];

            setProducts(_products);
        };

        reader.readAsText(file, 'UTF-8');
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Excluir" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Importar" className="mr-2 inline-block" onUpload={importCSV} />
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Clientes</h5>
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
                <Toolbar className="mb-4 button-table" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={cliente} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} Clientes"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="email" header="Email" style={{ minWidth: '5rem' }}></Column>
                    <Column field="telefone" header="Telefone" style={{ minWidth: '5rem' }}></Column>
                    <Column field="cidade" header="Cidade" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="bairro" header="Bairro" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="rua" header="Rua" style={{ minWidth: '5rem' }}></Column>
                    <Column field="numero" header="Número" style={{ minWidth: '2rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '600px' }} header="Detalhes do cliente" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" value={cliente.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.nome })} />
                    {submitted && !cliente.nome && <small className="p-error">Nome é brigatório.</small>}
                </div>

                <div className="field">
                    <label className="mb-3">Contato</label>
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="name">Email</label>
                            <InputText id="email" value={cliente.email} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.email })} />
                            {submitted && !cliente.email && <small className="p-error">Email é obrigatório.</small>}
                        </div>
                        <div className="p-fieldset-content col-5">
                            <label htmlFor="in">Telefone</label>
                            <InputMask id="email" value={cliente.telefone} mask="99-999999999" onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.telefone })} />
                            {submitted && !cliente.telefone && <small className="p-error">Telefone é obrigatório.</small>}
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="mb-3">Endereço</label>
                    <div className="formgrid grid">
                        <div className="p-fieldset-content col-5">
                            <label htmlFor="in">Cidade</label>
                            <InputText id="cidade" value={cliente.cidade} onChange={(e) => onInputChange(e, 'cidade')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.cidade })} />
                            {submitted && !cliente.cidade && <small className="p-error">Cidade é obrigatório.</small>}
                        </div>
                        <div className="p-fieldset-content col-7">
                            <label htmlFor="in">Bairro</label>
                            <InputText id="bairro" value={cliente.bairro} onChange={(e) => onInputChange(e, 'bairro')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.bairro })} />
                            {submitted && !cliente.bairro && <small className="p-error">Bairro é obrigatório.</small>}
                        </div>
                        <div className="p-fieldset-content col-9">
                            <label htmlFor="in">Rua</label>
                            <InputText id="rua" value={cliente.rua} onChange={(e) => onInputChange(e, 'rua')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.rua })} />
                            {submitted && !cliente.rua && <small className="p-error">Rua é obrigatório.</small>}
                        </div>
                        <div className="p-fieldset-content col-3">
                            <label htmlFor="in">Número</label>
                            <InputText id="numero" value={cliente.numero} onChange={(e) => onInputChange(e, 'numero')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.numero })} />
                            {submitted && !cliente.numero && <small className="p-error">Número é obrigatório.</small>}
                        </div>
                        <div className="p-fieldset-content col-12">
                            <label htmlFor="in">Complemento</label>
                            <InputText id="complemento" value={cliente.complemento} onChange={(e) => onInputChange(e, 'bairro')} />
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Você tem certeza que deseja excluir <b>{cliente.nome}</b>?</span>}
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
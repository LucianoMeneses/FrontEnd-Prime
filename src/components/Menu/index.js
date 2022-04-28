import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";

function Menu() {

    const navigate = useNavigate();

    const items = [

        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate('/') }
        },
        {
            label: 'Usuários',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate('/usuarios')
            }
        },
        {
            label: 'Clientes',
            icon: 'pi pi-fw pi-user',
            command: () => { navigate('/clientes') }
        },
        {
            label: 'Produtos',
            icon: 'pi pi-shopping-bag',
            command: () => { navigate('/testes') }
        },
        {
            label: 'Realizar pedido',
            icon: 'pi pi-shopping-cart',
            command: () => { navigate('/cliente') }
        },
        {
            label: 'Relatórios',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'Produtos',
                    icon: 'pi pi-shopping-bag',
                },
                {
                    label: 'Pedidos',
                    icon: 'pi pi-shopping-cart',
                }
            ]
        },
        {
            label: 'Sair',
            icon: 'pi pi-fw pi-power-off'
        },
    ];

    return (
        <>
            <Menubar model={items} />

        </>
    );
}


export default Menu;
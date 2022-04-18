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
            items: [
                {
                    label: 'Novo',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => { navigate('/usuario') }
                },
                {
                    label: 'Procurar',
                    icon: 'pi pi-fw pi-users',
                }
            ]
        },
        {
            label: 'Clientes',
            icon: 'pi pi-fw pi-user',
            command: () => { navigate('/cliente') }

        },
        {
            label: 'Produtos',
            icon: 'pi pi-shopping-bag',
            items: [
                {
                    label: 'Novo',
                    icon: 'pi pi-plus-circle',
                },
                {
                    label: 'Deletar',
                    icon: 'pi pi-minus-circle',
                },
                {
                    label: 'Procurar',
                    icon: 'pi pi-search',
                }
            ]
        },
        {
            label: 'Realizar pedido',
            icon: 'pi pi-shopping-cart',
            items: [
                {
                    label: 'Novo',
                    icon: 'pi pi-plus-circle',
                },
                {
                    label: 'Deletar',
                    icon: 'pi pi-minus-circle',
                },
                {
                    label: 'Procurar',
                    icon: 'pi pi-search',
                }
            ]
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
        }
    ];


    return (
        <>
            <Menubar model={items} />
        </>
    );
}


export default Menu;
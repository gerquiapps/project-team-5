import React from "react";
import store from "../../state/store";
import { unloadUserData } from "../../state/actions/user.actions";
import { resetPlayer } from "../../state/actions/player.actions";
import './topbar.css';
import { Link } from "react-router-dom";
import LocalStorageUserService from "../../services/localStorageUser.service";
import Search from '../search/search';

export default class Topbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            navigateLogin: false,
            hide: false
        }

        this.logout = this.logout.bind(this);
        this.unsubscribeFunction = null;

    }

    componentDidMount() {
        // traigo del store el usuario ya logueado al cambiar el estado
        // para mostrarlo en pantalla, si no esta logueado
        // en render defino lo que muestro

        let userStored = store.getState().user;
        this.setState({ user: userStored });
        // console.log(this.state.user);

        let themeStored = store.getState().theme;
        this.setState({ hide: themeStored.hideToolbar })

        this.unsubscribeFunction = store.subscribe(() => {
            userStored = store.getState().user;
            if (userStored && this.state.user !== userStored)
                this.setState({ user: userStored });

            themeStored = store.getState().theme;
            if (this.state.hide !== this.themeStored?.hideToolbar)
                this.setState({ hide: themeStored.hideToolbar })
        })
    }

    componentWillUnmount() {
        this.unsubscribeFunction();
    }

    logout(e) {
        e.preventDefault();
        store.dispatch(unloadUserData());
        store.dispatch(resetPlayer());
        this.setState((prevState) => {
            return { ...prevState, user: null }
        },
            () => {
                LocalStorageUserService.deleteUserFromLocal();
                this.setState({ navigateLogin: true });
            })
    }

    render() {
        // //console.log(this.state.user)

        if (this.state.hide) {
            return (<></>);
        }

        if (this.state.user && this.state.user.isLogged) {
            return (
               
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    {/* <Search></Search> */}
                    <div className="container-fluid justify-content-end">
                        <div>
                            <a className="nav-link dropdown-toggle name" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>{this.state.user.name}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <Link className="nav-link" to='/profile'>
                                        Mi perfil
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={(e) => { this.logout(e) }}>Cerrar sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );

        } else {

            return (
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid justify-content-end">
                        <div>
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/register'>
                                        <span>Registrate</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/login'>
                                        <span>Ingresá</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }
    }
}
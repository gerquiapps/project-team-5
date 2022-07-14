import React from "react";
import { config } from '../../../constants/config';
import { loadUserData } from "../../../state/actions/user.actions";
import './login.css';
import { Navigate, Link } from "react-router-dom";
import LocalStorageUserService from "../../../services/localStorageUser.service";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SocialLogin from "./socialLogin";
import store from "../../../state/store";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // email: 'german.quirogasottile@gmail.com',
            // password: 'abcd1234',
            email: '',
            password: '',
            isLogged: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitSocialLogin = this.handleSubmitSocialLogin.bind(this);

    }

    errorMessage = (text) => {
        return toast.warn(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        fetch(config.login.url,
            {
                method: config.login.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            })
            .then((fulfilled) => {
                return fulfilled.json();
            })
            .then((data) => {
                if (data.code > 399) {
                    console.log(data)
                    this.errorMessage(data.message);
                    return;
                }
                console.log(data);
                let _user = data.user;
                _user.isLogged = true;
                store.dispatch(loadUserData(_user));
                console.log(store.getState().user);
                this.setState({ isLogged: true });

                LocalStorageUserService.setUserToLocal(_user);

            })
            .catch((err) => {
                console.log(err);
            })

    }

    handleSubmitSocialLogin(user) {

        store.dispatch(loadUserData(user));
        this.setState({ isLogged: true });
        LocalStorageUserService.setUserToLocal(user);

    }

    render() {
        if (this.state.isLogged) {
            return (
                <Navigate to='/' />
            );
        }
        return (


            <div className="row w-100 justify-content-center">
                <ToastContainer />
                <div className="mb-4">
                    <h5>Para continuar iniciá sesión</h5>
                </div>
                <div className="mb-4"></div>
                <form id="login-form" onSubmit={this.handleSubmit}>

                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-3 col-form-label text-start">Email</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                        </div>
                    </div>

                    <div className="mb-4 row">
                        <label htmlFor="password" className="col-sm-3 col-form-label text-start">Contraseña</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>
                    </div>

                    <div className="row justify-content-center me-1">
                        <input id="login-btn" type="submit" className="btn btn-success" value="Iniciar sesion" />
                    </div>

                    <div className="row justify-content-center mt-3 me-1">
                        <SocialLogin handleSubmit={this.handleSubmitSocialLogin} />
                    </div>

                    <div className="row justify-content-center mt-3 me-1">
                        <Link id="forget-passwd" className="nav-link" to='/recovery'>
                            <span>Olvidé mi contraseña</span>
                        </Link>
                    </div>

                </form>
            </div>

        );
    }
}
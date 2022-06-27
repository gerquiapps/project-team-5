import React from "react";
import store from "../../../state/store";
import { config } from '../../../constants/config';
import { loadUserData } from "../../../state/actions/user.actions";
import './recovery.css';
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Recovery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'german.quirogasottile@gmail.com',
            renderChangePassword: false,
            newPasswd: '',
            newPasswd2: '',
            navigateLogin: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitChangePassword = this.handleSubmitChangePassword.bind(this);
    }

    componentDidMount() {
        if (this.props.onlyChangePassword) {
            let email = store.getState().user.email;
            console.log(email);
            this.setState({ renderChangePassword: true });
        }
    }

    errorMsg = (text) => {
        return toast.warn(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(config.verifyEmail.url + '?email=' + this.state.email,
            {
                method: config.verifyEmail.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((fulfilled) => {
                return fulfilled.json();
            })
            .then((data) => {
                console.log(data);
                if (data.code > 399) {
                    this.errorMsg(data.message);
                    return;
                }
                this.setState({ renderChangePassword: true });

            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleSubmitChangePassword(event) {
        event.preventDefault();

        if (this.state.newPasswd != this.state.newPasswd2) {
            this.errorMsg('Las contraseñas no coinciden!!');
            return;
        }

        fetch(config.changePassword.url,
            {
                method: config.changePassword.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.state.email, password: this.state.newPasswd })

            })
            .then((fulfilled) => {
                return fulfilled.json();
            })
            .then((data) => {
                console.log(data);
                if (data.code > 399) {
                    this.errorMsg(data.message);
                    return;
                }
                this.setState({ navigateLogin: true });

            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {

        if (this.state.navigateLogin) {
            return (
                <Navigate to="/login" />
            );
        } else {

            if (!this.state.renderChangePassword) {
                // step 1 - verificar existencia de user

                return (
                    <div className="row w-100 justify-content-center">
                        <ToastContainer />
                        <div className="mb-4">
                            <h5>Para recuperar tu cuenta ingresá tu correo</h5>
                        </div>
                        <div className="mb-4"></div>
                        <div className="mb-4"></div>
                        <form id="login-form" onSubmit={this.handleSubmit}>

                            <div className="mb-3 row">
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                                </div>
                            </div>

                            <div className="row justify-content-end me-1">
                                <input id="login-btn" type="submit" className="btn btn-success" value="Enviar" />
                            </div>

                        </form>
                    </div>
                );
            } else {

                // step 2 - setear una nueva contrasenia
                return (
                    <div className="row w-100 justify-content-center">
                        <ToastContainer />
                        <div className="mb-4">
                            <h5>Ahora ingresá tu nueva contraseña</h5>
                        </div>
                        <div className="mb-4"></div>
                        <div className="mb-4"></div>
                        <form id="login-form" onSubmit={this.handleSubmitChangePassword}>

                            <div className="mb-3 row">
                                <label htmlFor="newPasswd" className="col-sm-3 col-form-label">Nueva Contraseña</label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" id="newPasswd" value={this.state.newPasswd} onChange={(event) => this.setState({ newPasswd: event.target.value })} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label htmlFor="newPasswd2" className="col-sm-3 col-form-label">Repetí Contraseña</label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" id="newPasswd2" value={this.state.newPasswd2} onChange={(event) => this.setState({ newPasswd2: event.target.value })} />
                                </div>
                            </div>

                            <div className="row justify-content-end me-1">
                                <input id="login-btn" type="submit" className="btn btn-success" value="Crear nueva contraseña" />
                            </div>

                        </form>
                    </div>
                );
            }
        }

    }
}
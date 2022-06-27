import React from "react";
import store from "../../../state/store";
import './profile.css';
import { Navigate } from "react-router-dom";


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goBack: false,
            goChangePassword: false
        }

        this.goBack = this.goBack.bind(this);
        this.goChangePassword = this.goChangePassword.bind(this);

    }

    goBack() {
        this.setState({ goBack: true });
    }

    goChangePassword() {
        this.setState({ goChangePassword: true })
    }

    render() {
        if (this.state.goBack) {
            console.log('going back')
            return (
                <Navigate to={-1} />
            );
        }
        if (this.state.goChangePassword) {
            console.log('going chang password')
            return (
                <Navigate to={'/changePassword'} />
            );
        }
        return (
            <div id="content" className="row justify-content-center">

                <div className="mb-4">
                    <h5>Mi perfil</h5>
                </div>
                <div className="mb-4"></div>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">Nombre</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="name" value={store.getState().user.name} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Apellido</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="lastname" value={store.getState().user.lastname} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Apodo</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="username" value={store.getState().user.username} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="email" value={store.getState().user.email} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Teléfono</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="phone" value={store.getState().user.phone} />
                    </div>
                </div>

                <div className="mb-3 row justify-content-end">
                </div>
                <div className="mb-3 row justify-content-around">
                    <div className="col col-6 text-center">
                        <button id="prof-btn" className="btn btn-success" onClick={() => { this.goChangePassword() }}>Cambiar contraseña</button>
                    </div>
                    <div className="col col-6 text-end">
                        <button id="prof-btn" className="btn btn-success" onClick={() => { this.goBack() }}>Volver</button>

                    </div>

                </div>
            </div>
        );
    }
}
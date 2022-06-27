import React from "react";
import { config } from '../../../constants/config';
import './register.css';
import { Navigate } from 'react-router-dom'


export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
            phone: '',
            picture: '',
            role: '',
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(config.signup.url,
            {
                method: config.signup.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: this.state.name,
                        lastname: this.state.lastname,
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                        phone: this.state.phone,
                        picture: this.state.picture,
                        role: 'user'
                    }
                )
            })
            .then((fulfilled) => {
                return fulfilled.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({ redirect: true });
                return;
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {

        if (this.state.redirect) {
            return <Navigate to='/' />;
        }

        return (
            <div className="row w-100 justify-content-center">
                <div className="mb-4">
                    <h5>Registrate ahora para disfrutar de la mejor música</h5>
                </div>
                <form id="reg-form" onSubmit={this.handleSubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-3 col-form-label">Nombre</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="lastname" className="col-sm-3 col-form-label">Apellido</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="lastname" value={this.state.lastname} onChange={(event) => this.setState({ lastname: event.target.value })} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="username" className="col-sm-3 col-form-label">Apodo</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="password" className="col-sm-3 col-form-label">Contraseña</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="phone" className="col-sm-3 col-form-label">Teléfono</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="phone" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
                        </div>
                    </div>

                    <div className="row justify-content-end me-1">
                        <input id="reg-btn" type="submit" className="btn btn-success" value="Registrarme" />
                    </div >
                </form>
            </div>


        );
    }
}
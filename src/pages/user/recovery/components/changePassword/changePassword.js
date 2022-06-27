

export default class ChangePassword {

    constructor(props) {
        this.state = {
            password: '',
            passwordConfirm: ''
        }
    }

    render() {

        return (
            <div className="row w-100 justify-content-center">

                <div className="mb-4">
                    <h5>Ingresá una nueva contraseña</h5>
                </div>
                <div className="mb-4"></div>
                <div className="mb-4"></div>
                <form id="login-form" onSubmit={this.handleSubmit}>

                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-3 col-form-label">Contraseña</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-3 col-form-label">Repetir Contraseña</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="passwordConfirm" value={this.state.passwordConfirm} onChange={(event) => this.setState({ passwordConfirm: event.target.value })} />
                        </div>
                    </div>

                    <div className="row justify-content-end me-1">
                        <input id="login-btn" type="submit" className="btn btn-success" value="Aplicar cambio" />
                    </div>

                </form>
            </div>
        );
    }
}
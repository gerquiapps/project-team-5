import React from "react";
import store from "../../state/store";
import { hideToolbar } from "../../state/actions/theme.actions";
import { Navigate } from "react-router-dom";

export default class NotFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goBack: false
        };

        this.fireGoBack = this.fireGoBack.bind(this);
    }

    componentDidMount() {
        store.dispatch(hideToolbar(true));
    }

    fireGoBack() {
        store.dispatch(hideToolbar(false));
        this.setState({ goBack: true });
    }

    render() {
        if (this.state.goBack) {
            return (
                <Navigate to={'/'} />
            );

        } else {
            return (
                <>
                    <h3>Página no encontrada</h3>
                    <button className="btn btn-primary mt-3" onClick={this.fireGoBack}>Volver</button>
                </>
            );
        }

    }

}
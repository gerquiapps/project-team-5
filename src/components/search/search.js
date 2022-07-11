import React from "react";
import './search.css';


export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };

        this.click = this.click.bind(this);

    }

    componentDidMount() {
        //console.log(this.state.items)
    }

    click() {

    }

    render() {
        return (
            <>
                <div class="input-group">
                    <div class="form-outline">
                        <input type="search" id="form1" className="form-control" />
                        <label className="form-label" for="form1">Artistas o canciones</label>
                    </div>
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </>
        )
    }
}
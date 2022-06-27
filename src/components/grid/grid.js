import React from "react";
import Card from "../card/card";


export default class Grid extends React.Component {

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

    click(e) {
        e.preventDefault();
        //console.log('es click')
    }

    render() {

        return (
            <div className="row row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 g-4">
                {this.state.items.map((item, key) => {
                    // //console.log(item);
                    return (
                        <div key={key} className="col" >
                            <div style={{ height: '100%' }} onClick={(e) => this.props.action(e, item)}>
                                <Card item={item} ></Card>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
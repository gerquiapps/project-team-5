import React from "react";
import Card from "../card/card";
import './grid.css'


export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.click = this.click.bind(this);
        console.log(props)
    }

    componentDidMount() {

        let newItems = this.props.items.map(item => {
            return { ...item, renderProps: { class: 'card generic-card' } }
        })
        console.log(newItems);
        this.setState(prevState => {
            return { ...prevState, items: newItems }
        })

        if (this.props.selected) {
            console.log('selected', this.props.selected)
            this.click(null, this.props.selected)
        }
    }

    click(e, selectedItem) {
        if (e) e.preventDefault();
        console.log('es click')
        let newItems = this.state.items.map(item => {
            if (item === selectedItem) {
                return { ...item, renderProps: { class: 'card generic-card selected' } }
            } else {
                return { ...item, renderProps: { class: 'card generic-card' } }
            }
        })
        this.setState(prevState => {
            return { ...prevState, items: newItems }
        })
    }

    render() {

        return (
            <div className="row row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 g-4">
                {this.state.items.map((item, key) => {
                    // //console.log(item);
                    return (
                        <div key={key} className="col" >
                            <div style={{ height: '100%' }} onClick={(e) => { this.props.action(e, item); this.click(e, item) }}>
                                <Card className="selected" item={item} ></Card>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
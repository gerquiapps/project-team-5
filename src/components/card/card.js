import React from "react";
import './card.css'

export default class Card extends React.Component {

    constructor(props) {
        super(props);
        //console.log('card item')
        //console.log(props)
        this.state = {
            img: props.item.image || props.item.cover_file || null,
            number: props.item.number || null,
            title: props.item.artist || props.item.title || null,
            text: props.item.text || null,
            artist: props.item.artist || null,
            disc: props.item.disc || null,
            date: props.item.date || null,
            btnEvent: props.item.btnEvent || null
        };
    }

    render() {
        console.log('card render', this.props.item.renderProps.class);
        const cardClassName = this.props.item.renderProps.class ?? 'card generic-card'
        return (

            <div className={cardClassName}>
                {this.state.img ? <img className="card-img-top" src={this.state.img} alt="Card image cap" /> : null}
                < div className="card-body" >
                    <h5 className="card-title">{this.state.title}</h5>
                    <p className="card-text">{this.state.text}</p>
                </div >
            </div >

        );
    }

}
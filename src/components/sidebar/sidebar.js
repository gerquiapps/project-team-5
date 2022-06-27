import React from "react";
import store from "../../state/store";
import './sidebar.css'


export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hide: false,
        };

        this.unsubscribeStore = null;
    }

    componentDidMount() {

        let themeStored = store.getState().theme;
        this.setState({ hide: themeStored.hideSidebar });

        this.unsubscribeStore = store.subscribe(() => {
            let currentThemeState = store.getState().theme;
            if (this.state.hide != currentThemeState.hideSidebar) {
                this.setState(prevState => {
                    return { ...prevState, hide: currentThemeState.hideSidebar }
                })
            }
        })

    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    render() {
        if (this.state.hide) {
            return (<></>);
        } else {
            return (
                <>
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav" style={{ marginLeft: '0' }}>
                            <li>
                                <a href="#"><i className="fa fa-sort-alpha-asc " aria-hidden="true"> </i> <span style={{ marginLeft: '10px' }}>Favoritos</span>  </a>
                            </li>
                            <li>
                                <a href="#"> <i className="fa fa-play-circle-o " aria-hidden="true"> </i> <span style={{ marginLeft: '10px' }}>Más escuchados</span> </a>
                            </li>
                            <li>
                                <a href="#"> <i className="fa fa-puzzle-piece" aria-hidden="true"> </i> <span style={{ marginLeft: '10px' }}>Géneros</span> </a>
                            </li>
                            {/* <li>
                                <a href="#"> <i className="fa fa-font" aria-hidden="true"> </i> <span style={{ marginLeft: '10px' }}> Section</span> </a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-info-circle " aria-hidden="true"> </i> <span style={{ marginLeft: '10px' }}>Section </span> </a>
                            </li>
                            <li>
                                <a href="#"> <i className="fa fa-comment-o" aria-hidden="true"> </i> <span style={{ marginLeft: '10px' }}> Section</span> </a>
                            </li> */}
                        </ul>
                    </div>
                </>
            );
        }
    }

}
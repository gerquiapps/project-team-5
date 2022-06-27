import React from "react";
import store from "../../../state/store";
import { setCurrentDisc } from "../../../state/actions/player.actions";
import './artist.css';
import Grid from "../../../components/grid/grid";
import SideBar from "../../../components/sidebar/sidebar";
import TracksList from '../../../components/trackslist/trackslist';
import Player from "../../../components/player/player";

import LocalStorageUserService from "../../../services/localStorageUser.service";
import { Navigate } from "react-router";


export default class Artist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            player: null,
            currentDisc: null,
            showTracksList: false,
            isLogged: true
        };

        this.unsuscribeStore = null;

        LocalStorageUserService.getUserFromLocal(); // carga en store el usuario desde localstorage
        this.setDiscSelected = this.setDiscSelected.bind(this);
    }

    componentDidMount() {
        // //console.log('componente montado');
        let userStored = store.getState().user;

        if (!userStored.isLogged) {
            this.setState({ isLogged: false });
            return;
        }

        let playerStored = store.getState().player;
        this.setState({ player: playerStored });

        this.unsuscribeStore = store.subscribe(() => {
            playerStored = store.getState().player;
            userStored = store.getState().user;
            if (!userStored.isLogged) {
                this.setState({ isLogged: false });
                return;
            }

            if (playerStored.currentDisc !== this.state.currentDisc) {
                this.setState(prevState => {
                    return {
                        ...prevState, showTracksList: false
                    }
                }, () => {
                    //console.log('cambio de disco')
                    //console.log(playerStored.currentDisc);
                    //console.log(this.state.currentDisc);
                    this.setState(prevState => {
                        return {
                            ...prevState, currentDisc: playerStored.currentDisc, showTracksList: true
                        }
                    });
                });

                // this.setState({ currentDisc: playerStored.currentDisc, showTracksList: true })
            }
        })

    }
    componentWillUnmount() {
        this.unsuscribeStore();
    }

    setDiscSelected(e, item) {
        e.preventDefault();
        let currentDisc = item;
        store.dispatch(setCurrentDisc(currentDisc));
        // //console.log(item)
        this.setState({ currentDisc: item, showPlayer: true });
    }


    render() {
        if (this.state.isLogged) {

            return (
                <>
                    <SideBar></SideBar>
                    {this.state.player != null ?
                        <>
                            <div className="container artist">
                                <h2 className="mb-4">Estás viendo discos de {this.state.player.artist}</h2>
                                <Grid items={this.state.player.discography} action={this.setDiscSelected}></Grid>
                                {this.state.showTracksList ? <TracksList tracks={this.state.currentDisc.tracks}></TracksList> : null}
                            </div>
                            {this.state.showPlayer ? <Player></Player> : null}
                        </> : null}
                </>
            );

        } else {
            return (
                <Navigate to={'/'}></Navigate>
            )
        }
    }
}
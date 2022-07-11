import React from "react";
import store from "../../../state/store";
import './artist.css';
import Grid from "../../../components/grid/grid";
import SideBar from "../../../components/sidebar/sidebar";
import TracksList from '../../../components/trackslist/trackslist';

import LocalStorageUserService from "../../../services/localStorageUser.service";
import { Navigate, useLocation } from "react-router-dom";


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
        this.setState(prevState => {
            return { ...prevState, player: playerStored }
        }, () => {
            console.log('seteo de disco')
            console.log(playerStored.currentDisc);
            console.log(this.state.currentDisc);
            let currentDiscIsFromArtistSelected = playerStored.discography.filter(disc => disc.title == playerStored.currentDisc.title)
            if (currentDiscIsFromArtistSelected.length) {
                console.log(currentDiscIsFromArtistSelected);
                this.setDiscSelected(null, playerStored.currentDisc)
            }
            else {
                this.setState(prevState => { return { ...prevState, currentDisc: null, showTracksList: false } })
            }
        });


        this.unsuscribeStore = store.subscribe(() => {
            playerStored = store.getState().player;
            userStored = store.getState().user;
            if (!userStored.isLogged) {
                this.setState({ isLogged: false });
                return;
            }

            if (playerStored.currentDisc) {
                this.setState(prevState => {
                    return {
                        ...prevState, showTracksList: false
                    }
                }, () => {
                    console.log('cambio de disco')
                    console.log(playerStored.currentDisc);
                    console.log(this.state.currentDisc);

                    this.setDiscSelected(null, playerStored.currentDisc)

                });

            }
        })

    }
    componentWillUnmount() {
        this.unsuscribeStore();
    }

    setDiscSelected(e, item) {
        if (e) e.preventDefault();
        let currentDisc = item;
        // // store.dispatch(setCurrentDisc(currentDisc));
        console.log(item)
        // this.setState({ currentDisc: item, showPlayer: true });
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
                    ...prevState, currentDisc: currentDisc, showTracksList: true
                }
            });
        });
    }


    render() {
        if (this.state.isLogged) {

            return (
                <>
                    <SideBar></SideBar>
                    {this.state.player != null ?
                        <>
                            <div className="container artist">
                                <h1 className="mb-4"><strong>{this.state.player.artist}</strong></h1>
                                <Grid items={this.state.player.discography} action={this.setDiscSelected} selected={this.state.currentDisc}></Grid>
                                {this.state.showTracksList ? <TracksList currentDisc={this.state.currentDisc}></TracksList> : null}
                            </div>
                            {/* {this.state.showPlayer ? <Player></Player> : null} */}
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
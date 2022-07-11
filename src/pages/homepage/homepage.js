import React from "react";
import store from "../../state/store";
import { setArtist, setCurrentDisc } from "../../state/actions/player.actions";
import { unloadUserData } from "../../state/actions/user.actions";
import LocalStorageUserService from "../../services/localStorageUser.service";
import './homepage.css';
import SideBar from "../../components/sidebar/sidebar";
import Grid from "../../components/grid/grid";
import { getCollection, searchBy } from "../../services/api/collection.service";
import TracksList from '../../components/trackslist/trackslist';
import Player from "../../components/player/player";
import { Navigate } from "react-router";


export default class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            showArtistsGrid: false,
            collection: null,
            goToArtist: false,
        };

        this.unsubscribeFunction = null;
        // console.log('llama homepage');

        LocalStorageUserService.getUserFromLocal(); // carga en store el usuario desde localstorage

        this.setArtistSelected = this.setArtistSelected.bind(this);

    }

    componentDidMount() {

        // console.log('componente montado');
        // let playerStored = store.getState().player;
        let userStored = store.getState().user;
        // console.log(userStored)
        this.setState({ user: userStored });

        if (userStored.isLogged) {
            getCollection()
                .then((data) => {
                    // console.log(data);
                    if (data.code == 401) {
                        store.dispatch(unloadUserData());
                    } else {
                        this.setState({ collection: data.results });
                    }
                })
                .catch(err => {
                    console.log('error getting collection');
                })
                .finally(() => {
                    this.setState({ showArtistsGrid: true });
                });
        }

        this.unsubscribeFunction = store.subscribe(() => {
            // console.log('subscription')
            userStored = store.getState().user;
            // playerStored = store.getState().player;

            // cambio de estado de usaurio
            if (userStored && this.state.user != userStored) {
                this.setState({ user: userStored });
                // console.log(this.state.user);
                if (userStored.isLogged) {
                    getCollection()
                        .then((data) => {
                            if (data.code == 401) {
                                store.dispatch(unloadUserData());
                            } else {
                                this.setState({ collection: data.results });
                            }
                        })
                        .catch(err => {
                            console.log('error getting collection');
                            console.log(err)
                        })
                        .finally(() => {
                            this.setState({ showArtistsGrid: true });
                        });
                }
            }

        });

    }

    componentWillUnmount() {
        this.unsubscribeFunction();
    }

    setArtistSelected(e, item) {
        e.preventDefault();
        let artistInfo = {
            artist: item.artist,
            genres: item.genres,
            discography: item.discography
        }

        store.dispatch(setArtist(artistInfo));
        this.setState({ goToArtist: true });

    }

    render() {

        if (this.state.user?.isLogged) {
            if (this.state.goToArtist) {
                return (
                    <Navigate to={'/artist'}></Navigate>
                )
            } else {

                return (
                    <>
                        <SideBar></SideBar>
                        <div className="container homepage">
                            <h2>Bienvenido {this.state.user.name}!</h2>
                            <p className="welcome-message">Música que puede interesarte</p>
                            {this.state.showArtistsGrid ? <Grid items={this.state.collection} action={this.setArtistSelected}></Grid> : null}
                        </div>
                        {/* {this.state.showTracksList ? <TracksList tracks={this.state.collection.filter(item => item.artist == this.state.player.artist)}></TracksList> : null} */}
                        {/* {this.state.showPlayer ? <Player></Player> : null} */}
                    </>
                );
            }

        } else {
            return (
                <>
                    <main>
                        <h2>No iniciaste sesión</h2>
                        <p>Por favor logueate o registrate</p>
                    </main>
                </>
            );
        }
    }
}
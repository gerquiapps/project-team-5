import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './player.css'
import store from "../../state/store";
import { setCurrentArtist, setCurrentTrack } from "../../state/actions/player.actions";
import { Navigate } from "react-router";

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            source: props.file_location, // https://github.com/sampotts/plyr#the-source-setter
            options: undefined, // https://github.com/sampotts/plyr#options
            currentTrack: null,
            isLogged: false,
            showPanel: false,
            tracks: null,
            canGoToArtistTracksList: false

        };

        this.unsubscribeStore = null;
        this.verifyRenderingConditions = this.verifyRenderingConditions.bind(this);
        this.mapTracksClasses = this.mapTracksClasses.bind(this);
        this.skipTrack = this.skipTrack.bind(this);
        this.defaultItemClassName = 'list-group-item list-group-item-dark d-flex justify-content-between align-items-center';

    }

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(() => {
            let currentTrack = store.getState().player.currentTrack;
            console.log('current track', currentTrack);
            let tracks = store.getState().player.currentDisc.tracks;
            let newTracksList = this.mapTracksClasses(tracks);
            this.setState(prevState => {
                return {
                    ...prevState,
                    isLogged: store.getState().user.isLogged,
                    currentTrack: currentTrack,
                    tracks: newTracksList
                }
            },
                () => {
                    this.verifyRenderingConditions()
                });
        })
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    verifyRenderingConditions() {
        console.log(this.state.currentTrack)
        this.setState({ showPanel: this.state.isLogged && this.state.currentTrack.title != '' });
    }

    // setPlayerStatus(status) {

    // }

    mapTracksClasses(tracks) {
        let newTracksList = tracks.map(track => {
            return { ...track, renderProps: { class: `${this.defaultItemClassName} track-item`, showPlaying: false } };
        })
        return newTracksList;
    }

    skipTrack(e, trackToJump) {
        e.preventDefault();
        const currentTrackIndex = this.state.currentTrack.number - 1;
        console.log(currentTrackIndex)
        console.log(this.state.tracks.length)
        if (currentTrackIndex < this.state.tracks.length - 1 &&
            currentTrackIndex > 0) {
            let trackToPlay = this.state.tracks[currentTrackIndex + trackToJump];
            trackToPlay = { ...trackToPlay, renderProps: { class: `${this.defaultItemClassName} track-item-selected`, showPlaying: true } };
            this.setState(prevState => {
                return { ...prevState, currentTrack: trackToPlay }
            }, () => {
                store.dispatch(setCurrentTrack(trackToPlay));
                store.dispatch(setCurrentArtist(store.getState().player.artist));
            })
        } else {
            this.setState(prevState => {
                return { ...prevState, currentTrack: null }
            }, () => {
                store.dispatch(setCurrentTrack({
                    title: '',
                    number: 0,
                    duration: '',
                    file_location: ''
                }));
                store.dispatch(setCurrentArtist(''));

            })
        }

    }

    goToArtistTracksList(e) {
        e.preventDefault();
        this.setState(prevState => {
            return { ...prevState, canGoToArtistTracksList: true };
        }, () => {
            this.setState(prevState => {
                return { ...prevState, canGoToArtistTracksList: false };
            })
        })
    }

    renderHeaderMetadata(data) {
        return (
            <>
                <div
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="tooltip" title={`Artista: ${store.getState().player.currentArtist} | Album: ${store.getState().player.currentDisc.title} | Canción: ${data.title}`}
                    onClick={(e) => { this.goToArtistTracksList(e) }}>
                    <strong>{store.getState().player.currentArtist}</strong> {'  -  '} {data.title}
                </div>
            </>
        )
    }

    render() {

        if (this.state.showPanel) {

            return (
                <>
                    <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid justify-content-center">
                            <div>
                                <AudioPlayer id="player"
                                    autoPlay
                                    showJumpControls={false}
                                    showSkipControls={true}
                                    src={this.state.currentTrack?.file_location}
                                    onPlay={e => console.log("onPlay")}
                                    onClickNext={e => this.skipTrack(e, 1)}
                                    onClickPrevious={e => this.skipTrack(e, -1)}
                                    onEnded={e => this.skipTrack(e, 1)}
                                    onPause={e => console.log('paused')}
                                    header={this.renderHeaderMetadata(this.state.currentTrack)}
                                />
                            </div>
                        </div>
                    </nav>

                    {this.state.canGoToArtistTracksList ? <Navigate to={'/artist'} ></Navigate> : null}

                </>
            );
        }
        else {
            return (<></>)
        }
    }
}

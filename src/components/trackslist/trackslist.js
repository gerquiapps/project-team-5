import React from "react";
import store from "../../state/store";
import { setCurrentTrack, setCurrentDisc, setCurrentArtist } from "../../state/actions/player.actions";
import './trackslist.css';
import playing from '../../assets/playing.gif';

export default class TracksList extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            currentDisc: this.props.currentDisc,
            tracks: [],
            currentTrack: null
        }
        this.unsubscribeStoreFunction = null;
        this.setCurrentTrackToPlay = this.setCurrentTrackToPlay.bind(this);
        this.setClassesToTracks = this.setClassesToTracks.bind(this);
        this.defaultItemClassName = 'list-group-item list-group-item-dark d-flex justify-content-between align-items-center';
    }

    setClassesToTracks(tracks) {
        return new Promise((resolve, reject) => {
            if (tracks) {
                let tracksWithClasses = tracks.map(track => { return { ...track, renderProps: { class: `${this.defaultItemClassName} track-item`, showPlaying: false } } })
                this.setState(prevState => {
                    return { ...prevState, tracks: tracksWithClasses };
                }, () => {
                    resolve(true)
                })
            }
        })

    }

    async componentDidMount() {
        console.log(this.props.currentDisc)
        
        await this.setClassesToTracks(this.state.currentDisc.tracks);
        let trackSelected = store.getState().player.currentTrack
        let newTracksList = this.state.tracks.map(track => {
            return (track.number === trackSelected.number && track.title === trackSelected.title) ? trackSelected : { ...track, renderProps: { class: `${this.defaultItemClassName} track-item`, showPlaying: false } };
        })
        this.setState(prevState => {
            return { ...prevState, currentTrack: store.getState().player.currentTrack, tracks: newTracksList }
        })

        this.unsubscribeStoreFunction = store.subscribe(() => {
            trackSelected = store.getState().player.currentTrack;
            console.log('track', trackSelected.title)
            newTracksList = this.state.tracks.map(track => {
                return (track.number === trackSelected.number && track.title === trackSelected.title) ? trackSelected : { ...track, renderProps: { class: `${this.defaultItemClassName} track-item`, showPlaying: false } };
            })
            this.setState(prevState => {
                return {
                    ...prevState, tracks: newTracksList
                }
            });
        })
    }

    componentWillUnmount() {
        if (this.unsubscribeStoreFunction) this.unsubscribeStoreFunction();
    }

    setCurrentTrackToPlay(e, track) {

        e.preventDefault();
        let trackSelected = { ...track, renderProps: { class: `${this.defaultItemClassName} track-item-selected`, showPlaying: true } };
        let newTracksList = this.state.tracks.map(track => {
            return (track.number === trackSelected.number && track.title === trackSelected.title) ? trackSelected : { ...track, renderProps: { class: `${this.defaultItemClassName} track-item`, showPlaying: false } };
        })
        this.setState(prevState => {
            return {
                ...prevState, tracks: newTracksList
            }
        }, () => {
            store.dispatch(setCurrentDisc(this.state.currentDisc));
            store.dispatch(setCurrentTrack(trackSelected));
            store.dispatch(setCurrentArtist(store.getState().player.artist));
        });

    }

    render() {
        return (
            <>
                <ul className="list-group tracks-list">
                    {this.state.tracks.map((track, i) => {
                        return (
                            <li key={'track-' + i} className={track.renderProps.class} onClick={(e) => { this.setCurrentTrackToPlay(e, track) }}>
                                {track.title}
                                {track.renderProps.showPlaying ? (<span className="playing-equalizer">
                                    <img src={playing} height="30px"></img>
                                </span>) : null}
                                <span className="badge badge-primary badge-pill">{track.duration}</span>
                            </li>
                        )
                    })}
                </ul>
            </>
        );
    }
}
import React from "react";
import store from "../../state/store";
import { setCurrentTrack } from "../../state/actions/player.actions";
import './trackslist.css'

export default class TracksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: props.tracks || [],
        }
        this.setCurrentTrackToPlay = this.setCurrentTrackToPlay.bind(this);
    }


    setCurrentTrackToPlay(e, track) {
        ////console.log(track)
        e.preventDefault();
        store.dispatch(setCurrentTrack(track));

    }




    render() {
        return (
            <>
                <ul className="list-group tracks-list">
                    {this.state.tracks.map((track, i) => {
                        return (
                            <li key={'track-' + i} className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center track-item" onClick={(e) => { this.setCurrentTrackToPlay(e, track) }}>
                                {track.title}
                                <span className="badge badge-primary badge-pill">{track.duration}</span>
                            </li>
                        )
                    })}
                </ul>
            </>
        );
    }


}
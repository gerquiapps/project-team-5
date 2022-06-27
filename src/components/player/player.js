import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './player.css'
import store from "../../state/store";
export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            source: props.file_location, // https://github.com/sampotts/plyr#the-source-setter
            options: undefined, // https://github.com/sampotts/plyr#options
            currentTrack: null

        };

        this.unsubscribeStore = null;
    }

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(() => {
            let currentTrack = store.getState().player.currentTrack;
            this.setState({ currentTrack: currentTrack });
        })
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    render() {
        return (
            <>
                <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid justify-content-center">
                        <div>
                            <AudioPlayer id="player"
                                // autoPlay
                                // src="https://firebasestorage.googleapis.com/v0/b/project-5912398450612195027.appspot.com/o/music%2Flinkin_park%2Falbums%2Fhybrid_theory%2Ftracks%2F01%20Papercut.mp3?alt=media&token=e6112f1f-29ee-4411-abf4-f642fb74ecdb"
                                src={this.state.currentTrack?.file_location}
                                onPlay={e => console.log("onPlay")}
                            // other props here
                            />
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

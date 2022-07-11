import { SET_ARTIST, SET_DISCS, SET_CURRENT_DISC, SET_CURRENT_TRACK, RESET_PLAYER, SET_CURRENT_PLAYER_STATUS, SET_CURRENT_ARTIST } from '../actions/player.actions'

const initialState = {
    artist: '',
    currentArtist: '',
    genres: '',
    discography: [],
    currentDisc: {
        title: '',
        number: 0,
        cover_file: '',
        date: '',
        record_company: '',
        tracks: []
    },
    currentTrack: {
        title: '',
        number: 0,
        duration: '',
        file_location: '',
        renderProps: null
    },
    playingStatus: {
        isPlaying: false,
        currentStatus: ''
    }
}

export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ARTIST:

            return {
                ...state,
                artist: action.payload.artist,
                genres: action.payload.genres,
                discography: action.payload.discography
            };
        case SET_DISCS:
        case SET_CURRENT_DISC:
            return {
                ...state,
                currentDisc: action.payload.currentDisc
            };
        case SET_CURRENT_ARTIST:
            return {
                ...state,
                currentArtist: action.payload
            };
        case SET_CURRENT_TRACK:
            //console.log(action.payload)
            return {
                ...state,
                currentTrack: action.payload
            };
        case SET_CURRENT_PLAYER_STATUS:
            return {
                ...state,
                playingStatus: action.payload
            };
        case RESET_PLAYER:
            state = { ...initialState };
            return state;
        default:
            return state
    }
}
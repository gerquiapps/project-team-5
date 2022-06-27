import { SET_ARTIST, SET_DISCS, SET_CURRENT_DISC, SET_CURRENT_TRACK, RESET_TRACK } from '../actions/player.actions'

const initialState = {
    artist: '',
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
        file_location: ''
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
        case SET_CURRENT_TRACK:
            //console.log(action.payload)
            return {
                ...state,
                currentTrack: action.payload
            };
        case RESET_TRACK:
            state = { ...initialState };
            return state;
        default:
            return state
    }
}
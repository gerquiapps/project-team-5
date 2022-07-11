
export const SET_ARTIST = 'SET_ARTIST';
export const SET_DISCS = 'SET_DISCS';
export const SET_CURRENT_DISC = 'SET_CURRENT_DISC';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const RESET_PLAYER = 'RESET_PLAYER';
export const SET_CURRENT_PLAYER_STATUS = 'SET_CURRENT_PLAYER_STATUS';
export const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST';

export function setArtist(artistInfo) {
    return {
        type: SET_ARTIST,
        payload: artistInfo
    }
}

export function setDiscs(disc) {
    return {
        type: SET_DISCS,
        payload: {}
    }
}

export function setCurrentArtist(artist) {
    return {
        type: SET_CURRENT_ARTIST,
        payload: artist
    }
}

export function setCurrentDisc(disc) {
    return {
        type: SET_CURRENT_DISC,
        payload: { currentDisc: disc }
    }
}


export function setCurrentTrack(trackInfo) {
    return {
        type: SET_CURRENT_TRACK,
        payload: trackInfo
    }
}

export function resetPlayer() {
    return {
        type: RESET_PLAYER
    }
}

export function setCurrentPlayerStatus(status) {
    return {
        type: SET_CURRENT_PLAYER_STATUS,
        payload: status
    }
}
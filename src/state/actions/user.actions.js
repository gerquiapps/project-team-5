
export const LOAD_USER_DATA = 'LOAD_USER_DATA'
export const UNLOAD_USER_DATA = 'UNLOAD_USER_DATA'
// creador de action para login de usuario
export function loadUserData(userData) {
    return {
        type: LOAD_USER_DATA,
        payload: userData
    }
}

export function unloadUserData() {
    return {
        type: UNLOAD_USER_DATA,
    }
}

export const CHANGE_THEME = 'CHANGE_THEME';
export const HIDE_TOOLBAR = 'HIDE_TOOLBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';



// creador de action para theme a dark o light
export function changeTheme() {
    return {
        type: CHANGE_THEME
    }
}

export function hideToolbar(confirm) {
    return {
        type: HIDE_TOOLBAR,
        payload: confirm
    }
}

export function hideSidebar(confirm) {
    return {
        type: HIDE_SIDEBAR,
        payload: confirm
    }
}
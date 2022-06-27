import { CHANGE_THEME, HIDE_TOOLBAR, HIDE_SIDEBAR } from '../actions/theme.actions'

const initialState = {
    darkMode: true,
    hideToolbar: false,
    hideSidebar: false

}

export function themeReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return { ...state, darkMode: !state.darkMode };
        case HIDE_TOOLBAR:
            return { ...state, hideToolbar: action.payload };
        case HIDE_SIDEBAR:
            return { ...state, hideSidebar: action.payload };
        default:
            return state;
    }
}
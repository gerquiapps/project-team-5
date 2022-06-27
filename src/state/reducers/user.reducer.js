import { LOAD_USER_DATA, UNLOAD_USER_DATA } from '../actions/user.actions'

const initialState = {
    _id: '',
    name: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    picture: '',
    role: '',
    token: '',
    isLogged: false,
    error: null,
    hasSocialLogin: false
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_DATA:
            state = { ...action.payload };
            return state;
        case UNLOAD_USER_DATA:
            console.log('unload user data')
            state = { ...initialState };
            return state;
        default:
            return state
    }
}
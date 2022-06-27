import store from "../state/store";
import { loadUserData } from "../state/actions/user.actions";

export default class LocalStorageUserService {

    static getUserFromLocal() {
        let user = localStorage.getItem('user');
        if (user) {
            let userLocalObj = JSON.parse(user);
            let userStored = store.getState().user;
            if (!userStored || userStored.isLogged == false) {
                store.dispatch(loadUserData(userLocalObj));
                return store.getState().user;
            } else {
                return null;
            }
        }
    }

    static setUserToLocal(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static deleteUserFromLocal() {
        localStorage.removeItem('user');
    }
}
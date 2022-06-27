import { collectionConfig } from "../../constants/config"
import store from "../../state/store";


export function getCollection() {
    return new Promise((resolve, reject) => {
        let token = store.getState().user.token;
        fetch(collectionConfig.getCollection.url, {
            method: collectionConfig.getCollection.method,
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            }
        }).then((fulfilled) => {
            return fulfilled.json();
        }).then((collection) => {
            resolve(collection);
        }).catch(err => {
            reject(err);
        })
    });
}

export function searchBy(params) {
    return new Promise((resolve, reject) => {
        let token = store.getState().user.token;
        let urlParams = new URLSearchParams(params);
        fetch(collectionConfig.searchBy.url + urlParams, {
            method: collectionConfig.searchBy.method,
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            }
        }).then((fulfilled) => {
            return fulfilled.json();
        }).then((collection) => {
            resolve(collection);
        }).catch(err => {
            reject(err);
        })
    });
}
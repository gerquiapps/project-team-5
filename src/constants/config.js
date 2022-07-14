function getEnvironment() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // console.log('Corriendo en debug');
        // return 'http://localhost:4000';
        return 'https://team5-22013-backend.herokuapp.com';

    } else {
        return 'https://team5-22013-backend.herokuapp.com';
    }

}

export const config = {
    signup: {
        url: getEnvironment() + '/user/signup',
        method: 'POST'
    },
    login: {
        url: getEnvironment() + '/user/login',
        method: 'POST'
    },
    verifyEmail: {
        url: getEnvironment() + '/user/verifyEmail',
        method: 'GET'
    },
    changePassword: {
        url: getEnvironment() + '/user/changePassword',
        method: 'PUT'
    },
}

export const collectionConfig = {
    getCollection: {
        url: getEnvironment() + '/collection',
        method: 'GET'
    },
    searchBy: {
        url: getEnvironment() + '/collection/searchBy',
        method: 'GET'
    },
}

export const SOCIAL_CONFIG = {
    google: true,
    microsoft: false,
    facebook: false,
    twitter: false,
    github: false,
}

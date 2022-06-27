export const config = {
    signup: {
        url: 'http://localhost:4000/user/signup',
        method: 'POST'
    },
    login: {
        url: 'http://localhost:4000/user/login',
        method: 'POST'
    },
    verifyEmail: {
        url: 'http://localhost:4000/user/verifyEmail',
        method: 'GET'
    },
    changePassword: {
        url: 'http://localhost:4000/user/changePassword',
        method: 'PUT'
    },
}

export const collectionConfig = {
    getCollection: {
        url: 'http://localhost:4000/collection',
        method: 'GET'
    },
    searchBy: {
        url: 'http://localhost:4000/collection/searchBy',
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

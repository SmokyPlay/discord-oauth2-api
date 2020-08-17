const fetch = require('node-fetch');
const API = 'https://discord.com/api/v7';
const Token = require('./classes/token.js');
const User = require('./classes/user.js');
const Guild = require('./classes/guild.js');

class Client {
    /**
     * Create Oauth2 client 
       * @param {Object} options
       * @param {String} options.clientID
       * @param {String} options.clientSecret
       * @param {Array} options.scopes
       * @param {String} options.redirectURI
    */
    constructor(options) {
        this._clientID = options.clientID;
        this._clientSecret = options.clientSecret;
        this.scopes = options.scopes;
        this.redirectURI = options.redirectURI;
    }
    /**
     * Get Oauth2 access token
     * @param {String} code
     * @returns {Promise<Token>}
    */
    getAccessToken(code) {
        return new Promise((resolve, reject) => {
            fetch(`${API}/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'client_id': this._clientID,
                    'client_secret': this._clientSecret,
                    'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': this.redirectURI,
                    'scope': this.scopes.join(" ")
                })
            }).then(async response => {
                let body = await response.json();
                if (response.status < 200 || response.status > 299) reject(new Error(body.error))
                else resolve(new Token(body));
            }).catch(error => {
                reject(error);
            })
        })
    }
    /**
    * Get user with Oauth2 access token
    * @param {String} accessToken 
    * @returns {Promise<User>}
    */
    getUser(accessToken) {
        return new Promise((resolve, reject) => {
            fetch(`${API}/users/@me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(async response => {
                let body = await response.json();
                if (response.status < 200 || response.status > 299) reject(new Error(body.error))
                else resolve(new User(body));
            }).catch(error => {
                reject(error);
            })
        })
    }
    /**
    * Get user guilds with Oauth2 access token
    * @param {String} accessToken 
    * @returns {Promise<Array<Guild>>}
    */
    getGuilds(accessToken) {
        return new Promise((resolve, reject) => {
            fetch(`${API}/users/@me/guilds`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(async response => {
                let body = await response.json();
                if (response.status < 200 || response.status > 299) reject(new Error(body.error))
                let guilds = [];
                body.forEach(guild => {
                    guilds.push(new Guild(guild));
                });
                resolve(guilds);
            }).catch(error => {
                reject(error);
            })
        })
    }
    /**
    * Refresh Oauth2 access token
    * @param {String} refreshToken
    * @returns {Promise<Token>}
    */
    refreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            fetch(`${API}/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'client_id': this._clientID,
                    'client_secret': this._clientSecret,
                    'grant_type': 'refresh_token',
                    'refresh_token': refreshToken,
                    'redirect_uri': this.redirectURI,
                    'scope': this.scopes.join(" ")
                })
            }).then(async response => {
                let body = await response.json();
                if (response.status < 200 || response.status > 299) reject(new Error(body.error))
                else resolve(new Token(body));
            }).catch(error => {
                reject(error);
            })
        })
    }
}
module.exports = Client;
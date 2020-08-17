module.exports = class Token {
    /**
     * @param {Object} options 
     * @param {String} options.accessToken
     * @param {Number} options.expiresIn
     * @param {String} options.refreshToken
     * @param {Array} options.scopes
     * @param {String} options.tokenType
     */
    constructor(options) {
        this.accessToken = options.access_token;
        this.expiresIn = options.expires_in;
        this.refreshToken = options.refresh_token;
        this.scopes = options.scope.split(' ');
        this.tokenType = options.token_type;
    }
}
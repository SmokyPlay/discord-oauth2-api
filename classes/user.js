module.exports = class User {
    /**
     * @param {Object} options
     * @param {String} options.id
     * @param {String} options.username
     * @param {String} options.discriminator
     * @param {String} options.tag
     * @param {String} options.avatar
     * @param {String} options.email
     * @param {Boolean} options.verified
     * @param {Boolean} options.mfa_enabled
     * @param {String} options.locale
     * @param {Number} options.flags
     * @param {Number} options.premium_type
     */
    constructor(options) {
        this.id = options.id;
        this.username = options.username;
        this.discriminator = options.discriminator;
        this.tag = `${options.username}#${options.discriminator}`;
        this.avatar = options.avatar;
        this.email = options.email || null;
        this.verified = options.verified;
        this.MFAEnabled = options.mfa_enabled;
        this.locale = options.locale;
        this.flags = options.flags;
        this.premiumType = options.premium_type;
    }
    /**
     * @returns {Array}
     */
    /**
     * Get user avatar URL
     * @param {Object} options
     * @param {Number} options.size
     * @param {String} options.format
     * @param {Boolean} options.dynamic
     * @returns {String}
     */
    avatarURL(options = {size: 512, format: 'webp', dynamic: false}) {
        if(this.avatar == null) return `https://cdn.discordapp.com/embed/avatars/${this.discriminator%5}.png?width=230&height=230`
        if(options.size % 128 !== 0 || options.size > 2048) throw new Error('Invalid avatar size');
        if (options.dynamic) options.format = this.avatar.startsWith('a_') ? 'gif' : options.format;
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options.format}?size=${options.size}`
    }
}
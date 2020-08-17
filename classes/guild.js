module.exports = class Guild {
    /**
     * @param {Object} options
     * @param {String} options.id
     * @param {String} options.name
     * @param {String} options.icon
     * @param {Boolean} options.isOwner
     * @param {Number} options.permissions
     * @param {Array} options.features
     */
    /**
     * Get guild icon URL
     * @param {Object} options
     * @param {Number} options.size
     * @param {String} options.format
     * @param {Boolean} options.dynamic
     * @returns {String}
     */
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.icon = options.icon;
        this.owner = options.owner;
        this.permissions = options.permissions;
        this.features = options.features;
    }
    iconURL(options = {size: 512, format: 'webp', dynamic: false}) {
        if(this.icon == null) return `https://media.discordapp.net/attachments/708680940385337386/744701622885810336/91_Discord_logo_logos-512.png`
        if(options.size % 128 !== 0 || options.size > 2048) throw new Error('Invalid avatar size');
        if (options.dynamic) options.format = this.icon.startsWith('a_') ? 'gif' : options.format;
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.${options.format}?size=${options.size}`
    }
}
# Discord Oauth2 API
### Library for interacting with Discord Oauth2 API

## Installation
```
$ npm i discord-oauth2-api
```

## Constructor
#### Usage

`new Client(options)`

`options.clientID` - Your application client ID

`options.clientSecret` - Your application client secret

`options.scopes` - Array of Oauth2 scopes

`options.redirectURI` - Your Oauth2 redirect URI

#### Example

```js
const Client = require('discord-oauth2-api');
const client = new Client({
    clientID: '665555588004053002',
    clientSecret: 'Z2EkOCKCwr4f6BhCjJ3jGWPZOk7RaRpK',
    scopes: ['identify', 'guilds'],
    redirectURI: 'http://localhost:3000/login'
});
```

## Get Access Token
#### Usage

`client.getAccessToken(code)`

`code` - Your query code

Returns: `Promise<Token>`

#### Example

```js
client.getAccessToken('8kYuLrkA7KXKYwJDIHpgpVYCKAIqUC').then(token => console.log(token.accessToken));
// OwxOnwxbAMzsa8ZE9ugYQk5feIJL6K
```

## Get User
#### Usage

`client.getUser(accessToken)`

`accessToken` - Oauth2 access token

Returns: `Promise<User>`

#### Example

```js
client.getUser('OwxOnwxbAMzsa8ZE9ugYQk5feIJL6K').then(user => console.log(user.tag));
// 🚀!SMOKY PLAY!🚀#1050
```

## Get User Guilds
##### Usage

`client.getGuilds(accessToken)`

`accessToken` - Oauth2 access token

Returns: `Promise<Array<Guild>>`

##### Example

```js
client.getUser('OwxOnwxbAMzsa8ZE9ugYQk5feIJL6K').then(guilds => console.log(guilds[0].name))
// Cool Server
```

## Refresh Token
##### Usage
`client.refreshToken(refreshToken)`

`refreshToken` - Oauth2 refresh token

Returns: `Promise<Token>`

##### Example

```js
client.refreshToken('afzGuTtQI9hhXY4rhMP7lp7RCyaT0C').then(token => console.log('New access token: ' + token.accessToken))
// New access token: ANawRpft7SNOcibq7HLLfCA8rGQ0bp
```

## Revoke Token
##### Usage
`client.revokeToken(token)`

`token` - Oauth2 access token

Returns: `Promise<Token>` (token is null)

##### Example

```js
client.revokeToken('afzGuTtQI9hhXY4rhMP7lp7RCyaT0C').then(token => console.log('Access token successfully revoked!'))
// New access token: ANawRpft7SNOcibq7HLLfCA8rGQ0bp
```


## Classes

### Token

| Property | Type | Example | Description |
| --- | --- |--- | --- |
| `accessToken` | String | 'OwxOnwxbAMzsa8ZE9ugYQk5feIJL6K' | Oauth2 access token |
| `expiresIn` | Number | 604800 | Time in seconds, after which the token will become invalid |
| `refreshToken` | String | 'afzGuTtQI9hhXY4rhMP7lp7RCyaT0C' | Token, that is used to refresh access token |
| `scopes` | Array | ['identify', 'guilds'] | Oauth2 scopes |
| `tokenType` | String | 'Bearer' | Type of token |

### User

| Property | Type | Example | Description |
| --- | --- |--- | --- |
| `id` | String | '591321756799598592' | User ID |
| `username` | String | '🚀!SMOKY PLAY!🚀' | User username |
| `discriminator` | String | '1050' | User's 4 digits after `#` |
| `tag` | String | '🚀!SMOKY PLAY!🚀#1050' | User username with 4 digits after `#` |
| `avatar` | String | 'a_21575f7072eba9af0e6b5255b219296f' | User avatar hash |
| `email` | String | 'example@gmail.com' | User enail address (available if the user granted access) |
| `verified` | Boolean | true | Whether the user email has been verified |
| `MFAEnabled` | Boolean | false | Whether the user has two factor enabled |
| `locale` | String | 'ru' | The user's chosen language option |
| `flags` | Number | 131328 | User's flags |
| `premiumType` | Number | 1 | The type of user's Nitro subscription

##### Methods

`avatarURL(options)`

`options.size` - avatar size

`options.format` - avatar format: `png`, `jpg`, `webp` or `gif`

`options.dynamic` - animated (true/false)

Returns: `AvatarURL`

### Guild

| Property | Type | Example | Description |
| --- | --- |--- | --- |
| `id` | String | '629712997849367400' | Guild ID |
| `name` | String | 'Cool Server' | Server name |
| `icon` | String | 'afec5e0a86a89bd20b8e87402a31eac4' | Guild icon hash |
| `isOwner` | Boolean | true | Whether the user is an owner of this guild |
| `permissions` | Number | 104189504 | User permissions on this guild |
| `features` | Array | [ 'COMMUNITY', 'NEWS' ] | Array of guild features |

##### Methods

`iconURL(options)`

`options.size` - icon size

`options.format` - icon format: `png`, `jpg`, `webp` or `gif`

`options.dynamic` - animated (true/false)

Returns: `IconURL`
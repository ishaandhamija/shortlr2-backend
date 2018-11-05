const OneauthStrategy = require('passport-oneauth').Strategy
const HttpBearerStrategy = require('passport-http-bearer').Strategy

const User = require('../../db/index').User

const config = require ('./config')

const oneauthStrategy = new OneauthStrategy({
  clientID: config.CLIENT.ID,
  clientSecret: config.CLIENT.SECRET,
  callbackURL: config.CLIENT.CALLBACK_URL,
  include: ["facebook","twitter","github","lms"]
}, (accessToken, refreshToken, profile, done) => {

	User.findCreateFind({
    	where: {
    		id: profile.id
    	}
	}).then(([user, created]) => {
		return done (null, user)
	}).catch (err => {
		return done (err)
	})

})

const bearerStrategy = new HttpBearerStrategy((token, done) => {

})

module.exports = {
  oneauth: oneauthStrategy,
  bearer: bearerStrategy
}
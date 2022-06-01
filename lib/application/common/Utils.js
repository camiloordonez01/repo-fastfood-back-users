const moment = require('moment-timezone')

const { TIMEZONE } = process.env
/**
 * Get the expiration date for the token
 *
 * @author camilo.ordonez
 *
 */
const getExpirationDate = (seconds) =>
    moment(new Date().getTime())
        .tz(TIMEZONE)
        .add(seconds, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss')
        .toString()

module.exports = {
    getExpirationDate,
}

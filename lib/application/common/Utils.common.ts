import moment from 'moment-timezone'

const { TIMEZONE } = process.env
/**
 * Get the expiration date for the token
 *
 * @author camilo.ordonez
 *
 */
export const getExpirationDate = (seconds: number) =>
    moment(new Date().getTime()).tz(TIMEZONE).add(seconds, 'seconds').format('YYYY-MM-DD HH:mm:ss').toString()

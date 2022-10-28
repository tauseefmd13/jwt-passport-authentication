/*
 *    ttl - JWT time to live(seconds or time units(https://github.com/vercel/ms))
 *    ttl: 3600 // 1 hour
 *    ttl: '1h' // 1 hour
 *    ttl: 86400 // 24 hours
 *    ttl: '1d' // 24 hours
 *    ttl: '7d' // 7 days
 */
export default {
	secret: process.env.JWT_SECRET,
	ttl: 86400,
};

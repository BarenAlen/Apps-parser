import gplay from 'google-play-scraper';

export default defineEventHandler((event) => {

    return gplay.category || {}
})
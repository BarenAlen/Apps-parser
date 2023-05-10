import store from 'app-store-scraper';

export default defineEventHandler((event) => {

    return store.category || {}
})
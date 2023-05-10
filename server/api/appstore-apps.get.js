import store from 'app-store-scraper';

export default defineEventHandler((event) => {

    const params = getQuery(event)

    return store.search({
            term: params.keyword,
            num: 50,
            page: 1,
            country : 'us',
        })
        .then((value) => {
            return value
        })
        .catch((error) => {
            return error
        }
    );
})
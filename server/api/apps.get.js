import gplay from 'google-play-scraper';

export default defineEventHandler((event) => {

    const params = getQuery(event)

    return gplay.search({
        term: params.keyword,
        num: 250,
        throttle: 10
    })
    .then(
        (value) => {
            console.log(value)
            return value
        },
        (error) => {
            throw new Error(error);
        }
    )
    .catch((error) => {
        return error
    });
})
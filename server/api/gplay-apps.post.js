import mysql from 'mysql2';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // console.log(body)

    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'apps'
    })

    body.apps.forEach((el, index) => {
        if (el.title) {
            let categoryNm = 'SEARCH'
            var title = el.title.replaceAll('\"', '\'')
            var developer = el.developer.replaceAll('\"', '\'')
            var summary = el.summary.replaceAll('\"', '\'')
            var scoreText = el.scoreText ? el.scoreText : '0'
            var score = el.score ? el.score : 0

            pool.query(`SELECT EXISTS(SELECT * FROM gplay WHERE title="`+title+`")`, (err, results, fields) => {
                let isExists = results[0][Object.keys(results[0])[0]]

                if (isExists == 0) {
                    pool.query(`INSERT INTO gplay (category, title, appId, url, icon, developer, currency, price, free, summary, scoreText, score) VALUES ("` + categoryNm + `","` + title + `","` + el.appId + `","` + el.url + `","` + el.icon + `","` + developer + `","` + el.currency + `", ${el.price}, ${el.free}, "` + summary + `","` + scoreText + `", ${score})`)
                }
            })

        }
    })
    
    return body.apps
})
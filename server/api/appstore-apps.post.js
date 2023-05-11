import mysql from 'mysql2';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    // console.log(body)

    const pool = mysql.createPool({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    })

    body.apps.forEach((el, index) => {
        if (el.title) {
            let categoryNm = 'SEARCH'
            var title = el.title.replaceAll('\"', '\'')
            var developer = el.developer.replaceAll('\"', '\'')
            var description = el.description.replaceAll('\"', '\'')
            var scoreText = el.scoreText ? el.scoreText : '0'
            var score = el.score ? el.score : 0

            pool.query(`SELECT EXISTS(SELECT * FROM appstore WHERE appId="`+el.appId+`")`, (err, results, fields) => {
                let isExists = results[0][Object.keys(results[0])[0]]

                if (isExists == 0) {
                    pool.query(`INSERT INTO appstore (category, title, appId, url, icon, developer, currency, price, free, summary, scoreText, score) VALUES ("` + categoryNm + `","` + title + `","` + el.appId + `","` + el.url + `","` + el.icon + `","` + developer + `","` + el.currency + `", ${el.price}, ${el.free}, "` + description + `","` + scoreText + `", ${score})`)
                }
            })

        }
    })
    
    return body.apps
})
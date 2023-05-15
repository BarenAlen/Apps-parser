import mysql from 'mysql2';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const pool = mysql.createPool({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    })

    const fetcher = (el) => {
        return new Promise((resolve, reject) => {
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
                        pool.query(`INSERT INTO gplay (category, title, appId, url, icon, developer, currency, price, free, summary, scoreText, score) VALUES ("` + categoryNm + `","` + title + `","` + el.appId + `","` + el.url + `","` + el.icon + `","` + developer + `","` + el.currency + `", ${el.price}, ${el.free}, "` + summary + `","` + scoreText + `", ${score})`, () => {
                            resolve(el)
                        })
                    }
                })
    
            }
        })
    }

    const result = async () => {
        let arr =[]

        for (let i = 0; i < body.apps.length; i++) {
            try {
                let response = await fetcher(body.apps[i])

                arr.push(response)

            }
            catch(error) {
                console.log(error)
            }
        }

        return arr
    }
    
    return result()
})
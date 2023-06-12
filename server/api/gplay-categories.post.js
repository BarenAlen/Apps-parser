import gplay from 'google-play-scraper';
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

    const fetcher = (categoryNm, collectionNm) => {
        console.log(categoryNm, collectionNm)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                gplay.list({
                    category: categoryNm,
                    collection: collectionNm,
                    num: 2000,
                    throttle: 10,
                    fullDetail: true,
                    lang: body.lang,
                    country: body.country
                })
                .then(
                    (value) => {
                        value.forEach((el, index) => {
                            if (el.title) {
                                let title = el.title.replaceAll('\"', '\'')
                                let summary = el.summary.replaceAll('\"', '\'')
    
                                pool.query(`SELECT EXISTS(SELECT * FROM gplay WHERE appId="`+el.appId+`")`, (err, results, fields) => {
                                    let isExists = results[0][Object.keys(results[0])[0]]
    
                                    if (isExists == 0) {
                                        pool.query(`INSERT INTO gplay (category, genre, title, appId, downloads, currency, price, free, summary) VALUES ("` + categoryNm + `","` + el.genre + `","` + title + `","` + el.appId + `","` + el.downloads + `","` + el.currency + `", ${el.price}, ${el.free}, "` + summary + `")`, (err) => {
                                            if (err) return log("Query failed. Error: %s. Query: %s", err, query);
                                        })
                                    }
                                })
            
                            }
                        })

                        resolve({ apps: value })

                    },
                    (error) => {
                        reject(error)
                    }
                )
            }, 5000)
        })
    }

    const delayedFetcher = async () => {
        let obj = { apps: [] }

        for (let i = 0; i < body.categories.length; i++) {
            let categoryNm = body.categories[i]
            let newArr = []

            for (let collectionNm in gplay.collection) {
                try {
                    let response = await fetcher(categoryNm, collectionNm)
                    newArr = response.apps

                    obj.apps = [...obj.apps, ...newArr]
                }
                catch(error) {
                    console.log(error)
                }
            }
        }

        return obj
    }

    return delayedFetcher()
})
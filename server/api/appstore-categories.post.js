import store from 'app-store-scraper';
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

    const fetcher = (category, collectionNm) => {
        console.log(category, collectionNm)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                store.list({
                    category: category.value,
                    collection: collectionNm,
                    num: 200,
                    fullDetail: true,
                    lang: body.lang,
                    country: body.country
                })
                .then(
                    (value) => {
                        value.forEach((el, index) => {
                            if (el.title) {
                                let title = el.title.replaceAll('\"', '\'')
                                let summary = el.description.replaceAll('\"', '\'')
    
                                pool.query(`SELECT EXISTS(SELECT * FROM appstore WHERE appId="`+el.appId+`")`, (err, results, fields) => {
                                    let isExists = results[0][Object.keys(results[0])[0]]
    
                                    if (isExists == 0) {
                                        pool.query(`INSERT INTO appstore (category, genre, title, appId, downloads, currency, price, free, summary) VALUES ("` + category.name + `","` + el.primaryGenre + `","` + title + `","` + el.appId + `","` + 'undefined' + `","` + el.currency + `", ${el.price}, ${el.free}, "` + summary + `")`, (err) => {
                                            if (err) return log("Query failed. Error: %s. Query: %s", err, query);
                                        })
                                    }
                                })
            
                            }
                        })

                        resolve({apps: value})

                    },
                    (error) => {
                        reject(error)
                    }
                ).catch(console.log)
            }, 5000)
        })
    }

    const delayedFetcher = async () => {
        let obj = { apps: [] }

        for (let i = 0; i < body.categories.length; i++) {
            let category = body.categories[i]
            let newArr = []

            for (let collectionNm in store.collection) {
                try {
                    // let response = 0
                    let response = await fetcher(category, store.collection[collectionNm])
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
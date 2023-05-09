import gplay from 'google-play-scraper';
import mysql from 'mysql2';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // console.log(body.categories)

    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'apps'
    })

    pool.query(`
        CREATE TABLE IF NOT EXISTS gplay (id INT AUTO_INCREMENT PRIMARY KEY, category VARCHAR(255), title VARCHAR(255), appId VARCHAR(255), url TEXT, icon TEXT, developer VARCHAR(255), currency VARCHAR(255), price FLOAT, free BOOLEAN, summary TEXT, scoreText VARCHAR(255), score FLOAT) DEFAULT CHARSET=utf8mb4;
    `)

    pool.query(`
        ALTER TABLE gplay 
        CHANGE summary summary TEXT 
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `)

    const fetcher = (categoryNm, collectionNm) => {
        console.log(categoryNm, collectionNm)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                gplay.list({
                    category: categoryNm,
                    collection: collectionNm,
                    num: 2000,
                    throttle: 10
                })
                .then(
                    (value) => {
                        value.forEach((el, index) => {
                            if (el.title) {
                                let title = el.title.replaceAll('\"', '\'')
                                let developer = el.developer.replaceAll('\"', '\'')
                                let summary = el.summary.replaceAll('\"', '\'')
                                let scoreText = el.scoreText ? el.scoreText : '0'
                                let score = el.score ? el.score : 0
    
                                pool.query(`SELECT EXISTS(SELECT * FROM gplay WHERE appId="`+el.appId+`")`, (err, results, fields) => {
                                    let isExists = results[0][Object.keys(results[0])[0]]
    
                                    if (isExists == 0) {
                                        pool.query(`INSERT INTO gplay (category, title, appId, url, icon, developer, currency, price, free, summary, scoreText, score) VALUES ("` + categoryNm + `","` + title + `","` + el.appId + `","` + el.url + `","` + el.icon + `","` + developer + `","` + el.currency + `", ${el.price}, ${el.free}, "` + summary + `","` + scoreText + `", ${score})`, (err) => {
                                            if (err) return log("Query failed. Error: %s. Query: %s", err, query);
                                        })
                                    }
                                })
            
                            }
                        })

                        resolve(value)
                    },
                    (error) => {
                        reject(error)
                    }
                )
            }, 5000)
        })
    }

    const delayedFetcher = async () => {
        var arr = [];

        for (let i = 0; i < body.categories.length; i++) {
            let categoryNm = body.categories[i]
            let newArr = []

            for (let collectionNm in gplay.collection) {
                try {
                    newArr = await fetcher(categoryNm, collectionNm)

                    arr = [...arr, ...newArr]
                }
                catch(error) {
                    console.log(error)
                }
            }
        }

        return arr
    }

    return delayedFetcher()
})
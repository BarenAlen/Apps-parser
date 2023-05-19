import mysql from 'mysql2';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const pool = mysql.createPool({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    })

    const fetcher = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                pool.query('SELECT COUNT(*) FROM gplay', (err, results, fields) => {
                    if (err) {
                        reject(err)
                        console.log('Count: ', err)
                    } else {
                        resolve(results[0][Object.keys(results[0])[0]])
                    }
                })
            }, 2000)
        })
    }

    const result  = async () => {
        let count = 0

        try {
            count = await fetcher()
        }
        catch(error) {
            console.log(error)
        }

        return count || 0
    }


    return result()
})
import mysql from 'mysql2';

export default defineEventHandler(async (event) => {

    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'apps'
    })

    const fetcher = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                pool.query('SELECT COUNT(*) FROM gplay', (err, results, fields) => {
                    resolve(results[0][Object.keys(results[0])[0]])
                })
            }, 500)
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
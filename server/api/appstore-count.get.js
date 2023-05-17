export default defineEventHandler(async (event) => {
    const { pool } = useMySQL()

    const fetcher = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                pool.query('SELECT COUNT(*) FROM appstore', (err, results, fields) => {
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
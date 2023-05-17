import store from 'app-store-scraper';

export default defineEventHandler((event) => {
    const params = getQuery(event)
    const { pool } = useMySQL()

    const fetcher = (keyword) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                store.search({
                    term: keyword.trim(),
                    num: 50,
                    page: 1,
                    country : 'us',
                })
                .then(
                    (value) => {
                        const isInDBChecker = (el) => {
                            return new Promise((resolve, reject) => {
                                let obj = { isInDB: false }

                                pool.query(`SELECT EXISTS(SELECT * FROM appstore WHERE appId="`+el.appId+`")`, (err, results, fields) => {
                                    let isExists = results[0][Object.keys(results[0])[0]]
                                    
                                    if (isExists == 1) {
                                        obj.isInDB = true
                                    }
                                    resolve(Object.assign(el, obj))
                                })
                            })
                        }

                        const result = async () => {
                            let apps = []

                            for (let i = 0; i < value.length; i++) {
                                let app = value[i]

                                try {
                                    let response = await isInDBChecker(app)

                                    apps.push(app)
                                }
                                catch(error) {
                                    console.log(error)
                                }
                            }

                            return apps
                        }

                        return result()

                    }
                )
                .then((value) => {
                    resolve(value)
                })
                .catch((error) => {
                    reject(error)
                });
            }, 500)
        })
    }

    const result = async () => {
        let arr = []
        let paramsArr = typeof params.keywords == 'object' ? params.keywords : [params.keywords]

        for (let i = 0; i < paramsArr.length; i++) {
            let keyword = paramsArr[i]

            try {
                let response = await fetcher(keyword)

                response.forEach((newApp) => {
                    if (!arr.some((app) => app.appId == newApp.appId )) {
                        arr = [...arr, newApp]
                    }
                })
            }
            catch(error) {
                console.log(error)
            }
        }

        return arr
    }

    return result()
})
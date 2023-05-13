import gplay from 'google-play-scraper';

export default defineEventHandler((event) => {

    const params = getQuery(event)

    const fetcher = (keyword) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                gplay.search({
                    term: keyword.trim(),
                    num: 250,
                    throttle: 10
                })
                .then(
                    (value) => {
                        resolve(value)
                    },
                    (error) => {
                        reject(error)
                    }
                )
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
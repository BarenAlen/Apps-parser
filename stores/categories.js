export const useCategory = defineStore('categories', {
    state: () => ({
        gplay: {},
        appstore: {}
    }),

    actions: {
        async getGplay() {

            await useFetch('/api/gplay-categories',
                {
                    method: 'get',
                    onResponse: ({ request, response, options }) => {

                        this.gplay = response._data
                    },
                    onRequestError({ request, options, error }) {
                        console.error('RequestError', request, error)
                    },
                    onResponseError({ request, response, options }) {
                        console.error('ResponceError', response)
                    }
                }
            )
        },
        async postGplay(categories) {
            const globalState = useGlobalState()

            globalState.setLoading(true)

            await useFetch('/api/gplay-categories',
                {
                    method: 'post',
                    body: {
                        categories: categories,
                        lang: globalState.gplay.lang,
                        country: globalState.gplay.country
                    },
                    onResponse: ({ request, response, options }) => {
                        console.log('Response: ', response)
                        globalState.setLoading(false)
                    },
                }
            )
        },

        async getAppstore() {

            await useFetch('/api/appstore-categories',
                {
                    method: 'get',
                    onResponse: ({ request, response, options }) => {

                        this.appstore = response._data
                    },
                    onRequestError({ request, options, error }) {
                        console.error('RequestError', request, error)
                    },
                    onResponseError({ request, response, options }) {
                        console.error('ResponceError', response)
                    }
                }
            )
        },
        async postAppstore(categories) {
            const globalState = useGlobalState()

            globalState.setLoading(true)

            await useFetch('/api/appstore-categories',
                {
                    method: 'post',
                    body: {
                        categories: categories,
                        lang: globalState.appstore.lang,
                        country: globalState.appstore.country
                    },
                    onResponse: ({ request, response, options }) => {
                        console.log('Response: ', response)
                        globalState.setLoading(false)
                    },
                }
            )
        },
    }
})
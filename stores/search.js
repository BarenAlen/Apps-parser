export const useSearch = defineStore('search', {
    state: () => ({
        gplay: [],
        apstore: [],
    }),

    actions: {
        async getGplay(keywords) {
            const globalState = useGlobalState()

            this.gplay = []
            globalState.setLoading(true)

            await useFetch('/api/gplay-apps',
                {
                    method: 'get',
                    params: { keywords: keywords },
                    onResponse: ({ request, response, options }) => {
                        this.gplay = response._data
                        globalState.setLoading(false)
                    },
                    onRequestError({ request, options, error }) {
                        console.error('RequestError', request, error)
                    },
                    onResponseError({ request, response, options }) {
                        console.error('ResponceError', response)
                    }
                }
            )
        }
    }
})
export const useGlobalState = defineStore('global', {
    state: () => ({
        loading: false,
        locales: [
            {title: 'En', value: 'en'},
            {title: 'Ru', value: 'ru'}
        ],
        countries: [
            {title: 'Us', value: 'us'},
            {title: 'Ru', value: 'ru'}
        ],
        gplay: {
            country: 'us',
            lang: 'en'
        },
        appstore: {
            country: 'us',
            lang: 'en'
        }
    }),
    
    actions: {
        setLoading(loading) {
            this.loading = loading
        },

        async tableAction(params) {
            const globalState = useGlobalState()

            globalState.setLoading(true)

            await useFetch('/api/table-actions',
                {
                    method: 'post',
                    body: params,
                    onResponse: ({ request, response, options }) => {
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
        },
    }
})
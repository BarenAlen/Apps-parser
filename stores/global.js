export const useGlobalState = defineStore('global', {
    state: () => ({
        loading: false
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
export const useCount = defineStore('count', {
    state: () => ({
        appstore: 0,
        gplay: 0
    }),

    actions: {
        async getGplay() {
            await useFetch('/api/gplay-count', {
                method: 'get',
                onResponse: ({request, response, options}) => {
                    this.gplay = response._data
                },
                onRequestError({ request, options, error }) {
                    console.error('RequestError', request, error)
                },
                onResponseError({ request, response, options }) {
                    console.error('ResponceError', response)
                }
            })
        },

        async getAppstore() {
            await useFetch('/api/appstore-count', {
                onResponse: ({request, response, options}) => {
                    this.appstore = response._data
                },
                onRequestError({ request, options, error }) {
                    console.error('RequestError', request, error)
                },
                onResponseError({ request, response, options }) {
                    console.error('ResponceError', response)
                }
            })
        }
    }
})
export const useSearch = defineStore('search', {
    state: () => ({
        gplay: [],
        appstore: [],
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
        },
        async postGplay() {
            const globalState = useGlobalState()

            globalState.setLoading(true)

            let response = await useFetch('/api/gplay-apps',
                {
                    method: 'post',
                    body: { apps: this.gplay },
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
        },
        clearGplay() {
            this.gplay = []
        },
        deleteGplayApp(appId) {
            this.gplay.filter((app, index) => {
				if (app.appId == appId) {
					this.gplay.splice(index, 1);

					return true;
				}
				return false;
			})
        },

        async getAppstore(keywords) {
            const globalState = useGlobalState()

            this.gplay = []
            globalState.setLoading(true)

            await useFetch('/api/appstore-apps',
                {
                    method: 'get',
                    params: { keywords: keywords },
                    onResponse: ({ request, response, options }) => {
                        this.appstore = response._data
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
        async postAppstore() {
            const globalState = useGlobalState()

            globalState.setLoading(true)

            let response = await useFetch('/api/appstore-apps',
                {
                    method: 'post',
                    body: { apps: this.appstore },
                    onResponse: ({ request, response, options }) => {
                        this.appstore = response._data
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
        clearAppstore() {
            this.appstore = []
        },
        deleteAppstoreApp(appId) {
            this.appstore.filter((app, index) => {
				if (app.appId == appId) {
					this.appstore.splice(index, 1);

					return true;
				}
				return false;
			})
        },
    }
})
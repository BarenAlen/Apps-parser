export const useGlobalState = defineStore('global', {
    state: () => ({
        loading: false
    }),
    
    actions: {
        setLoading(loading) {
            this.loading = loading
        }
    }
})
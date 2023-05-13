<template>
    <div class="page-content">
        <div class="container">
            <h1 class="mb-3">Google play</h1>
			<!-- <small>
				<pre>{{ search.gplay }}</pre>
			</small> -->
            <div class="row">
                <div class="col-6">
                    <label for="keywords">Keywords:</label>
                    <textarea class="form-control mt-1 mb-3" rows="6" id="keywords" v-model="keywords"></textarea>
                    <button @click="getApps" :disabled="globalState.loading" class="btn btn-primary me-3" type="button">Fetch</button>
                    <button @click="postApps" :disabled="globalState.loading" class="btn btn-secondary me-3" type="button">Write to DB</button>
                    <button @click="clearApps" :disabled="globalState.loading" class="btn btn-danger" type="button">Clear</button>
                </div>
                <div class="col-6">
                    <CategoriesFetcherWidget></CategoriesFetcherWidget>
                </div>
            </div>
            <div class="pt-3">
                <div class="row">
                    <div class="col-auto">Apps found: {{ appsTotal }}</div>
                </div>
                <hr>
                <div v-for="app in search.gplay" :key="app.appId">
                    <AppItem :app="app" @deleteApp="deleteApp"></AppItem>
                    <hr>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
definePageMeta({
    layout: 'inner',
})

export default {
	setup() {
		const search = useSearch()
		const globalState = useGlobalState()

		const keywords = ref('')
		const keywordsArray = computed(() => {
			if (keywords.value.length > 0) {
				return keywords.value.split(',')
			}
			return []
		})
		const appsTotal = computed(() => {
			let length = search.gplay?.length
			
			return length
		})

		const getApps = async () => {
			search.getGplay(keywordsArray.value)
		}

		const postApps = async () => {
			let response = await useFetch('/api/gplay-apps', { method: 'post', body: { apps: apps.value } })
		}

		const clearApps = () => {
			apps.value = []
		}

		const deleteApp = (appId) => {
			apps.value.filter((app, index) => {
				if (app.appId == appId) {
					apps.value.splice(index, 1);

					return true;
				}
				return false;
			})
		}

		return {
			getApps,
			postApps,
			clearApps,
			deleteApp,
			appsTotal,
			keywords,

			search,
			globalState
		}
	},
}
</script>

<template>
    <div class="page-content">
        <div class="container">
            <h1 class="mb-3">Google play</h1>
            <div class="row">
                <div class="col-6">
                    <label for="keywords">Keywords:</label>
                    <textarea class="form-control mt-1 mb-3" rows="6" id="keywords" v-model="keywords"></textarea>
                    <button @click="getApps" class="btn btn-primary me-3" type="button">Fetch</button>
                    <button @click="postApps" class="btn btn-secondary me-3" type="button">Write to DB</button>
                    <button @click="clearApps" class="btn btn-danger" type="button">Clear</button>
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
                <div v-for="app in apps" :key="app.appId">
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
		const keywords = ref('')
		const keywordsArray = computed(() => {
			if (keywords.value.length > 0) {
				return keywords.value.split(',')
			}
			return []
		})
		const apps = ref([])
		const appsTotal = computed(() => {
			let length = apps.value?.length
			
			return length
		})

		const getApps = () => {

			keywordsArray.value.forEach((item, index) => {
				setTimeout(async () => {
					await useFetch('/api/gplay-apps',
						{
							method: 'get',
							params: { keyword: item.trim() },
							onResponse: ({ request, response, options }) => {
								// console.dir(response)
	
								response._data.forEach((newApp) => {
									if (apps.value.some((app) => app.appId == newApp.appId )) {
									} else {
										apps.value = [...apps.value, newApp]
									}
								})
							},
							onRequestError({ request, options, error }) {
								console.error('RequestError', request, error)
							},
							onResponseError({ request, response, options }) {
								console.error('ResponceError', response)
							}
						}
					)
				}, 500 * index + 1)
			})
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
			apps,
			appsTotal,
			keywords,
			keywordsArray
		}
	},
}
</script>

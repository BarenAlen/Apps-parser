<template>
	<div class="page-wrapper">
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
			</div>
			<div class="pt-3">
				<div class="row">
					<div class="col-auto">Apps total: {{ appsTotal }}</div>
					<div class="col-auto">Matches found: {{ matchingAppsCount }}</div>
				</div>
				<hr>
				<div v-for="app in apps" :key="app.appId">
					<AppItem :app="app" @deleteApp="deleteApp"></AppItem>
					<hr>
				</div>
			</div>
			<!-- <small>
				<pre>{{ apps.value.length }}</pre>
			</small> -->
		</div>
	</div>
</template>

<script>

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
		const matchingAppsCount = ref(0)
		const appsTotal = computed(() => {
			let length = apps.value?.length
			
			return length
		})

		const getApps = () => {

			keywordsArray.value.forEach((item, index) => {
				setTimeout(async () => {
					let response = await useFetch('/api/apps', { method: 'get', params: { keyword: item.trim() } })
	
					if (response.data._rawValue) {

						response.data._rawValue.forEach((newApp) => {
							if (apps.value.some((app) => app.appId == newApp.appId )) {
								matchingAppsCount.value++
							} else {
								apps.value = [...apps.value, newApp]
							}
						})
						console.log(response.data._rawValue)
					} else {
						console.error('request error')
					}
				}, 1000 * index + 1)
			})
		}

		const postApps = async () => {
			let response = await useFetch('/api/apps', { method: 'post', body: { apps: apps.value } })
		}

		const clearApps = () => {
			apps.value = []
			matchingAppsCount.value = 0
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
			matchingAppsCount,
			keywords,
			keywordsArray
		}
	},
}
</script>

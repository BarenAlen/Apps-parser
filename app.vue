<template>
	<div class="container">
		<h1 class="mb-3">Google play</h1>
		<div class="row">
			<div class="col-6">
				<label for="keywords">Keywords:</label>
				<textarea class="form-control mt-1 mb-3" rows="6" id="keywords" v-model="keywords"></textarea>
				<button @click="getApps" class="btn btn-primary me-3" type="button">Fetch</button>
				<button @click="postApps" class="btn btn-secondary" type="button">Write to DB</button>
			</div>
		</div>
		<div class="pt-3">
			<div>Apps total: {{ appsTotal }}</div>
			<div v-for="app in apps" :key="app.appId">
				<div class="row align-items-center">
					<div class="col-4 py-3">
						<div class="d-flex align-items-center">
							<img :src="app.icon" width="46" class="d-inline-block me-2" alt="">
							<div>
								<div class="fsz-sm mb-1">Title:</div>
								<a :href="app.url">{{ app.title }}</a>
							</div>
						</div>
					</div>
					<div class="col-3 py-3">
						<div class="fsz-sm mb-1">Developer:</div>
						{{ app.developer }}
					</div>
					<div class="col-1 py-3">
						<div class="fsz-sm mb-1">Rating:</div>
						{{ app.scoreText }}
					</div>
					<div class="col-1 py-3">
						<div class="fsz-sm mb-1">Price:</div>
						{{ app.price }} {{ app.currency }}
					</div>
					<div class="col-3 py-3">
						<button type="button" @click="toggleDescription">{{ isDescriptionVisible ? 'Hide' : 'Show' }} Description</button>
					</div>
					<div class="col-12 py-3" v-show="isDescriptionVisible">
						<div class="fsz-sm mb-1">Description:</div>
						<div v-html="app.summary"></div>
					</div>
				</div>
				<hr>
			</div>
		</div>
		<!-- <small>
			<pre>{{ apps.value.length }}</pre>
		</small> -->
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
		const appsTotal = computed(() => {
			let length = apps.value?.length
			
			return length
		})
		const isDescriptionVisible = ref(false)

		const getApps = () => {

			keywordsArray.value.forEach((item, index) => {
				setTimeout(async () => {
					console.log(item.trim())
					let response = await useFetch('/api/apps', { method: 'get', params: { keyword: item.trim() } })
	
					if (response.data._rawValue) {
						console.log(response.data._rawValue)
						apps.value = [...apps.value, ...response.data._rawValue]
					} else {
						console.error('request error')
					}
				}, 1000 * index + 1)
			})
		}

		const postApps = async () => {
			let response = await useFetch('/api/apps', { method: 'post', body: { apps: apps.value } })
		}

		const toggleDescription = () => {
			isDescriptionVisible.value = !isDescriptionVisible.value
		}

		return {
			getApps,
			postApps,
			apps,
			appsTotal,
			toggleDescription,
			isDescriptionVisible,
			keywords,
			keywordsArray
		}
	},
}
</script>

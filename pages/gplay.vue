<template>
    <div class="page-content">
        <div class="container">
            <h1 class="mb-3">Google play</h1>
			<div class="row mb-3">
				<div class="col-auto pe-0">
					<button @click="createTable" type="button" class="btn btn-primary">Create table</button>
				</div>
				<div class="col-auto pe-0">
					<button @click="clearTable" type="button" class="btn btn-secondary">Clear table</button>
				</div>
				<div class="col-auto pe-0">
					<button @click="dropTable" type="button" class="btn btn-danger">Drop table</button>
				</div>
			</div>
			<div class="row mb-3">
				<div class="col-1 pe-0">
					<UiSelect @selectOption="setLang" label="Lang" id="lang" name="lang" :options="globalState.locales"></UiSelect>
				</div>
				<div class="col-1 pe-0">
					<UiSelect @selectOption="setCountry" label="Country" id="country" name="country" :options="globalState.countries"></UiSelect>
				</div>
			</div>
            <div class="row">
                <div class="col-6">
                    <label for="keywords">Keywords:</label>
                    <textarea class="form-control mt-1 mb-3" rows="6" id="keywords" v-model="keywords"></textarea>
					<div class="row align-items-center">
						<div class="col-auto">
                    		<button @click="getApps" :disabled="globalState.loading  || keywords.length == 0" class="btn btn-primary" type="button">Fetch</button>
						</div>
						<div class="col-auto ps-0">
                    		<button @click="postApps" v-show="search.gplay.length > 0" :disabled="globalState.loading" class="btn btn-secondary" type="button">Write to DB</button>
						</div>
						<div class="col-auto ps-0">
                    		<button @click="clearApps" v-show="search.gplay.length > 0" :disabled="globalState.loading" class="btn btn-danger" type="button">Clear</button>
						</div>
						<div class="col-auto ps-0 flex-grow-1 text-end">Apps found: {{ appsTotal }}</div>
					</div>
                </div>
                <div class="col-6">
                    <CategoriesFetcherWidget></CategoriesFetcherWidget>
                </div>
            </div>
            <div class="pt-3">
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
		const count = useCount()

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
			search
				.postGplay()
				.then(() => {
					count.getGplay()
				})
			
		}
		const clearApps = () => {
			search.clearGplay()
		}
		const deleteApp = (appId) => {
			search.deleteGplayApp(appId)
		}

		const dropTable = () => {
			globalState
				.tableAction({tableName: 'gplay', action: 'drop'})
				.then(() => {
					alert('Table gplay deleted')
				})
		}
		const createTable = () => {
			globalState
				.tableAction({tableName: 'gplay', action: 'create'})
				.then(() => {
					alert('Table gplay ready')
				})
		}
		const clearTable = () => {
			globalState
				.tableAction({tableName: 'gplay', action: 'clear'})
				.then(() => {
					alert('Table gplay cleared')
				})
		}

		const setLang = (value) => {
			globalState.gplay.lang = value
		}
		const setCountry = (value) => {
			globalState.gplay.country = value
		}

		return {
			getApps,
			postApps,
			clearApps,
			deleteApp,
			appsTotal,
			keywords,
			setLang,
			setCountry,

			dropTable,
			createTable,
			clearTable,

			search,
			globalState
		}
	},
}
</script>

<template>
    <div>
        <div class="mb-3">
            <label for="category-select" class="mb-1">Choose categories:</label>
            <select v-model="selectedCategories" multiple name="category-select" id="category-select" class="form-select category-select">
                <option v-for="(value, key) in categories" :key="value" :value="value">{{ key }}</option>
            </select>
        </div>
        <div class="row align-items-center">
            <div class="col-6">
                <button @click="postCategories" class="btn btn-primary" type="button">Scrape selected categories</button>
            </div>
            <div class="col-3">
                <div v-show="loading" class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="col-3" v-if="total > 0 && loading == false">
                Total: {{ total }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        const categories = ref({})
        const selectedCategories = ref([])
        const loading = ref(false)
        const total = ref(0)

        onMounted(() => {
            getCategories()
		});

		const getCategories = async () => {
            await useFetch('/api/appstore-categories',
                {
                    method: 'get',
                    onResponse: ({ request, response, options }) => {
                        console.log(response)
                        categories.value = response._data
                    },
                    onRequestError({ request, options, error }) {
                        console.error('RequestError', request, error)
                    },
                    onResponseError({ request, response, options }) {
                        console.error('ResponceError', response)
                    }
                }
            )
            console.log('get Categories')
        }

        const postCategories = async () => {
            loading.value = true

            await useFetch('/api/appstore-categories',
                {
                    method: 'post',
                    body: { categories: selectedCategories.value },
                    onResponse: ({ request, response, options }) => {
                        console.log('Response: ', response)
                        loading.value = false
                        getCount()
                    },
                }
            )

            // console.log('Response: ', response)
        }

        const getCount = async () => {
            await useFetch('/api/appstore-count',
                {
                    method: 'get',
                    onResponse: ({ request, response, options }) => {
                        console.log(response)
                        total.value = response._data
                    },
                    onRequestError({ request, options, error }) {
                        console.error('RequestError', request, error)
                    },
                    onResponseError({ request, response, options }) {
                        console.error('ResponceError', response)
                    }
                }
            )
            // console.log('get Categories')
        }

        return {
            categories,
            selectedCategories,
            postCategories,
            getCount,
            loading,
            total
        }
    },
}
</script>

<style lang="scss" scoped>
    .category-select {
        height: 158px;
    }
</style>
<template>
    <div>
        <div class="mb-3">
            <label for="category-select" class="mb-1">Choose categories:</label>
            <select v-model="selectedCategories" multiple name="category-select" id="category-select" class="form-select category-select">
                <option v-for="(value, key) in categories.appstore" :key="value" :value="value">{{ key }}</option>
            </select>
        </div>
        <div class="row align-items-center">
            <div class="col-6">
                <button @click="postCategories" :disabled="globalState.loading || selectedCategories.length == 0" class="btn btn-primary" type="button">Scrape selected categories</button>
            </div>
            <div class="col-3">
                <div v-show="globalState.loading" class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="col-3 text-end">
                Total: {{ count.appstore }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        const count = useCount()
        const globalState = useGlobalState()
        const categories = useCategory()

        const selectedCategories = ref([])

        categories.getAppstore()
        count.getAppstore()

        const postCategories = async () => {
            categories
                .postAppstore(selectedCategories.value)
                .then(() => {
                    count.getAppstore()
                })
        }

        return {
            categories,
            selectedCategories,
            postCategories,
            globalState,
            count
        }
    },
}
</script>

<style lang="scss" scoped>
    .category-select {
        height: 158px;
    }
</style>
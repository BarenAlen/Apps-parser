<template>
    <div>
        <div class="mb-3">
            <label for="category-select" class="mb-1">Choose categories:</label>
            <select v-model="selectedCategories" multiple name="category-select" id="category-select" class="form-select category-select">
                <option v-for="(key, value) in categories.gplay" :key="key" :value="value">{{ key }}</option>
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
                Total: {{ count.gplay }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        const categories = useCategory()
        const globalState = useGlobalState()
        const count = useCount()

        const selectedCategories = ref([])

        categories.getGplay()
        count.getGplay()

        const postCategories = () => {
            categories
                .postGplay(selectedCategories.value)
                .then(() => {
                    count.getGplay()
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
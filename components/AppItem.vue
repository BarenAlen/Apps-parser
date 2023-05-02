<template>
	<div class="app-item">
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
			<div class="col-2 py-3">
				<button type="button" class="btn btn-secondary" @click="toggleDescription">{{ isDescriptionVisible ? 'Hide' : 'Show' }} Description</button>
			</div>
			<div class="col-1">
				<button type="button" @click="handleAppItemDelete(app.appId)" class="app-item__delete btn btn-danger">&times;</button>
			</div>
			<div class="col-12 py-3" v-show="isDescriptionVisible">
				<div class="fsz-sm mb-1">Description:</div>
				<div v-html="app.summary"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppItem',
	props: {
		app: {
			type: Object,
			required: true
		}
	},
	setup(props, { emit }) {
		const isDescriptionVisible = ref(false)

		const toggleDescription = () => {
			isDescriptionVisible.value = !isDescriptionVisible.value
		}

		const handleAppItemDelete = (appId) => {
            emit("deleteApp", appId)
        }

		return {
			toggleDescription,
			isDescriptionVisible,
			handleAppItemDelete
		}
	},
}
</script>

<style>

</style>
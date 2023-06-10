<template>
	<div class="app-item" :class="{'in-db' : app.isInDB}">
		<!-- <small>
			<pre>{{ app }}</pre>
		</small> -->
		<div class="row align-items-center">
			<div class="col-3 py-3 align-self-start">
				<div class="d-flex align-items-start">
					<img :src="app.icon" width="46" class="d-inline-block me-2" alt="">
					<div>
						<div class="fsz-sm mb-1">Title:</div>
						<a :href="app.url">{{ app.title }}</a>
						<div class="fsz-sm my-1">Id:</div>
						<a :href="app.url">{{ app.appId }}</a>
					</div>
				</div>
			</div>
			<div class="col-2 py-3">
				<div class="fsz-sm mb-1">Genre:</div>
				{{ genre }}
			</div>
			<div class="col-2 py-3">
				<div class="fsz-sm mb-1">Downloads:</div>
				{{ app.installs }}
			</div>
			<div class="col-1 py-3">
				<div class="fsz-sm mb-1">Rating:</div>
				{{ app.scoreText || app.score  }}
			</div>
			<div class="col-1 py-3">
				<div class="fsz-sm mb-1">Price:</div>
				{{ app.price }} {{ app.currency }}
			</div>
			<div class="col-2 py-3">
				<button type="button" class="btn btn-secondary" @click="toggleDescription">{{ isDescriptionVisible ? 'Hide' : 'Show' }} Description</button>
			</div>
			<div class="col-1 py-3">
				<button type="button" @click="handleAppItemDelete(app.appId)" class="app-item__delete btn btn-danger">&times;</button>
			</div>
			<div class="col-12 py-3" v-show="isDescriptionVisible">
				<div class="fsz-sm mb-1">Description:</div>
				<div v-if="app.summary" v-html="app.summary"></div>
				<div class="mt-2" v-else>
					<pre> {{app.description}} </pre>
				</div>
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

		const genre = computed(() => {
			if (props.app.genre) {
				return props.app.genre
			}
			if (props.app.primaryGenre) {
				return props.app.primaryGenre
			}
		})

		const toggleDescription = () => {
			isDescriptionVisible.value = !isDescriptionVisible.value
		}

		const handleAppItemDelete = (appId) => {
            emit("deleteApp", appId)
        }

		return {
			toggleDescription,
			isDescriptionVisible,
			handleAppItemDelete,
			genre
		}
	},
}
</script>

<style lang="scss" scoped>
	pre {
		white-space: break-spaces;
	}
	.app-item {
		&.in-db {
			color: tomato;
		}
	}
</style>
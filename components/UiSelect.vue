<template>
    <div class="ui-select">
        <label class="mb-1" v-if="label">{{ label }}</label>
        <select @change="handleSelect" v-model="value" :name="name" :id="id">
            <option v-for="option in options" :key="option.title" :value="option.value">
                {{ option.title }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'UiSelect',
    props: {
		id: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: true
		}
	},
    setup(props, { emit }) {
        const value = ref(props.options[0].value)

        const handleSelect = () => {
            emit('selectOption', value.value)
        }

        return {
            handleSelect,
            value
        }
    },
}
</script>

<style lang="scss" scoped>
.ui-select {
    select {
        // padding: 5px 14px;
        width: 100%;
        height: 38px;
    }
}
</style>
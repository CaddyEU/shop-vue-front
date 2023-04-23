<template>
    <div>
        <h1>Name: {{ currentItem.name }}</h1>
        <p>Description: {{ currentItem.description }}</p>
        <h3>Category: {{ currentItem.category }}</h3>
        <h3>Posted: {{ formatDate(currentItem.posted) }}</h3>
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/items"
import useDateFormating from "../composables/useDateFormating.js"

export default {
    props: {
        item: Object,
        required: true
    },
    data() {
        return {
            currentItem: { name: "", description: "", category: "", posted: "" }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentItem = await (await fetch(url + "/" + this.item.id)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>
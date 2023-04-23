<template>
    <!-- <item-details :item="item"></item-details> -->
    <item-list :items="items" @deleted="removeItem"></item-list>
</template>
<script>
const API_URL = "http://localhost:8080/items"

import itemDetails from "./components/itemDetails.vue"
import itemList from "./components/itemList.vue"

export default {
    components:{
        itemDetails,
        itemList
    },
    data() {
        return {
            msg: "Hello World",
            id:2,
            item: {
                name:"test",
                description:"test",
                price:0
            },
            items: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.items = await (await fetch(url)).json()
        },
        removeItem(id) {
            this.items.splice(this.items.map(i => i.id).indexOf(id), 1)
        }
    }
}
</script>
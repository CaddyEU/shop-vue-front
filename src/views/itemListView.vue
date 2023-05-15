<template>
    <item-list :items="items" @deleted="removeItem"></item-list>
    <item-form @submit="fetchData"></item-form>
</template>
<script>
const API_URL = "http://localhost:8080/items"

import itemDetails from "../components/itemDetails.vue"
import itemList from "../components/itemList.vue"
import itemForm from  "../components/itemForm.vue"


    export default{
        components:{
            itemList,
            itemDetails,
            itemForm,
        },
        data(){
            return{
                id: 2,
                ItemId: 1,
                item: {
                    ItemName: "iPhone 14",
                    price: "999",
                }, 
                items: []
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}`
                this.items= await (await fetch(url)).json()
            },
            removeItem(ItemId){
                console.log("Item ", ItemId)
                this.items.splice(this.items.map(i=>i.ItemId).indexOf(ItemId), 1)
            }
        }
    }
</script>
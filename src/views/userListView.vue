<template>
    <user-details :user="user"></user-details>
    <user-list :users="users" @deleted="removeItem"></user-list>
    <user-form @submit="fetchData"></user-form>
</template>
<script>
const API_URL = "http://localhost:8080/users"

import userDetails from "../components/userDetails.vue"
import userList from "../components/userList.vue"
import userForm from  "../components/userForm.vue"


    export default{
        components:{
            userDetails,
            userList,
            userForm,
        },
        data(){
            return{
                id: 2,
                UserId: 1,
                user: {
                    UserName: "KuriKoer",
                }, 
                users: []
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}`
                this.users= await (await fetch(url)).json()
            },
            removeItem(UserId){
                console.log("Item ", ItemId)
                this.users.splice(this.users.map(i=>i.UserId).indexOf(UserId), 1)
            }
        }
    }
</script>
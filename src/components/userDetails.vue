<template>
    <div>
        <h1>Users: {{ currentUser.UserName }}</h1>    
         <ul>
            <li v-for="(review, index) in currentUser.reviews" :key="index">
                Review date: {{ formatDate(review.reviewDate) }}<br>
                Username: {{ user.UserName }}<br>
            </li>
        </ul> 
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/users"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        user: Object,
        required: true
    },
    data() {
        return {
            currentUser: { UserName: "" }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            if (this.User !==undefined) await (await fetch(url + "/" + this.user.id)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>
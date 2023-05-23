<template>
    <div>
        <h1>Reviews: {{ currentReview.reviewId }}</h1>    
         <ul>
            <li>               
                Review time: {{ currentReview.reviewTime }} <br>
                User: {{ currentReview.user.UserName }} <br>
                Item: {{ currentReview.item.name }} <br>
                Review: {{ currentReview.review.reviewBody }}<hr>
            </li>
        </ul>
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/reviews"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        review: Object,
        required: true
    },
    data() {
        return {
            currentReview: { 
                reviewId: "", 
                user: {
                    UserName: "" 
                }, 
                item: {
                    name: ""
                }, 
                review: {
                    reviewBody: ""
                }
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentReview = await (await fetch(url + "/" + this.review.reviewId)).json()
            console.log("reviewDetails",this.currentReview );
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>
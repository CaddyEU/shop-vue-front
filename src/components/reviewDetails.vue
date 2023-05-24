<template>
    <div>
        <h1>Reviews: {{ currentReview.id }}</h1>
        <ul>
            <li>
                Review time: {{ currentReview.reviewDate }} <br>
                User: {{ currentReview.User.UserName }} <br>
                Item: {{ currentReview.Item.name }} <br>
                Review: {{ currentReview.reviewBody }}
                <hr>
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
                id: "",
                User: {
                    UserName: ""
                },
                Item: {
                    name: ""
                },
                reviewBody: "",
                reviewDate: ""
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentReview = await (await fetch(url + "/" + this.review.id)).json()
            console.log("reviewDetails", this.currentReview);
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>
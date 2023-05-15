<template>
     <review-list :reviews="reviews" @deleted="removeItem"></review-list>
     <review-form @submit="fetchData"></review-form>
 </template>
 <script>
 const API_URL = "http://localhost:8080/reviews"
 
 import reviewDetails from "../components/reviewDetails.vue"
 import reviewList from "../components/reviewList.vue"
 import reviewForm from  "../components/reviewForm.vue"
 
 
     export default{
         components:{
             reviewDetails,
             reviewList,
             reviewForm,
         },
         data(){
             return{
                 id: 2,
                 reviewId: 1,
                 review: {
                     reviewDate: "2023-02-15",
                     reviewBody: "All good!"
                 }, 
                 reviews: []
             }
         },
         created(){
             this.fetchData()
         },
         methods:{
             async fetchData(){
                 const url = `${API_URL}`
                 this.reviews= await (await fetch(url)).json()
             },
             removeItem(reviewId){
                 console.log("Item ", reviewId)
                 this.reviews.splice(this.reviews.map(i=>i.reviewId).indexOf(reviewId), 1)
             }
         }
     }
 </script>
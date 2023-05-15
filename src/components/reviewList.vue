<template>
    <table class="table">
        <tr class="table thead th">
            <th>Reviews</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="review in reviews" :key="review.reviewId">
            <td class="table td">{{ review.reviewDate }}</td>           
            <td class="table td">
                <button id="show-details-modal" @click="reviewDetailId = review.reviewId">Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="reviewDeleteId = review.reviewId">Delete</button>
            </td>
        </tr>
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="reviewDetailId !==0" @close="reviewDetailId = 0">
        <template #header>{{ currentReview.reviewId }}</template>
        <template #body>
            <reviewDetails :review="currentReview"></reviewDetails>
        </template>
        <template #footer></template>
        </modal>
  </Teleport>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="reviewDeleteId !== 0">
      <template #header>Delete {{ currentReview.reviewId }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
            <button class="modal-default-button button-danger" @click="deleteReview">
            Yes
            </button>
            <button class="modal-default-button button-safe" @click="reviewDeleteId = 0">
            No
            </button>
        </div>
        <div v-else>
            <span class="text-danger">{{  error }}</span>
            
            <button class="modal-default-button button-safe" @click="reviewDeleteId = 0">
            Ok
            </button>
        </div>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import reviewDetails from "./reviewDetails.vue"
import Modal from "./modal.vue"
    export default{
        components: {
            Modal,
            reviewDetails,
        },
        props: {
            reviews: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return{
                reviewDetailId: 0,
                reviewDeleteId: 0,
                currentReview: null,
                error: null
            }
        },
        watch: {
            reviewDetailId(newId, oldId) {
                this.currentReview = this.reviews.find((item)=>item.reviewId ==newId);
                console.log(this.currentReview)
            },
            reviewDeleteId(newId, oldId) { 
                this.currentReview = this.reviews.find((item)=>item.reviewId ==newId);
                this.error = null
            }
        },
        methods: {
            deleteReview() {
                const api_url = import.meta.env.VITE_API_URL
                fetch(`${api_url}/reviews/${this.reviewDeleteId}`, {
                    method: "delete",
                    })
                    .then(async response => {
                        const isJson = response.headers.get("Content-type")?.includes("application/json")
                        const data = isJson && await response.json()
                        if(!response.ok) {
                            const error = (data && data.error) || responce.status
                            return Promise.reject(error)
                        }
                        this.$emit("deleted", this.reviewDeleteId)
                        this.reviewDeleteId = 0
                    })
                    .catch(error => {
                        console.log("Review Delete error: ", error)
                        this.error = error
                    })
            }
        },
    }
</script>

<style>
.text-danger {
    color: red;
}
</style>
<template>
    <table class="table">
        <tr class="table thead th">
            <th>Name</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="user in users" :key="user.UserId">
            <td class="table td">{{ user.UserName }}</td>           
            <td class="table td">
                <button id="show-details-modal" @click="userDetailId = user.UserId">Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="userDeleteId = user.UserId">Delete</button>
            </td>
        </tr>
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
        <modal :show="userDetailId !==0" @close="userDetailId = 0">
        <template #header>{{ currentUser.UserName }}</template>
        <template #body>
            <userDetails :user="currentUser"></userDetails>
        </template>
        <template #footer></template>
        </modal>
  </Teleport>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="userDeleteId !== 0">
      <template #header>Delete {{ currentUser.UserName }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
            <button class="modal-default-button button-danger" @click="deleteUser">
            Yes
            </button>
            <button class="modal-default-button button-safe" @click="userDeleteId = 0">
            No
            </button>
        </div>
        <div v-else>
            <span class="text-danger">{{  error }}</span>
            
            <button class="modal-default-button button-safe" @click="userDeleteId = 0">
            Ok
            </button>
        </div>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import userDetails from "./userDetails.vue"
import Modal from "./modal.vue"
    export default{
        components: {
            Modal,
            userDetails,
        },
        props: {
            users: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return{
                userDetailId: 0,
                userDeleteId: 0,
                currentUser: null,
                error: null
            }
        },
        watch: {
            userDetailId(newId, oldId) {
                this.currentUser = this.users.find((item)=>item.UserId ==newId);
                console.log(this.currentUser)
            },
            userDeleteId(newId, oldId) { 
                this.currentUser = this.users.find((item)=>item.UserId ==newId);
                this.error = null
            }
        },
        methods: {
            deleteUser() {
                const api_url = import.meta.env.VITE_API_URL
                fetch(`${api_url}/users/${this.userDeleteId}`, {
                    method: "delete",
                    })
                    .then(async response => {
                        const isJson = response.headers.get("Content-type")?.includes("application/json")
                        const data = isJson && await response.json()
                        if(!response.ok) {
                            const error = (data && data.error) || responce.status
                            return Promise.reject(error)
                        }
                        this.$emit("deleted", this.userDeleteId)
                        this.userDeleteId = 0
                    })
                    .catch(error => {
                        console.log("User Delete error: ", error)
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
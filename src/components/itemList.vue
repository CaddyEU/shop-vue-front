<template>
  <table>
    <tr>
      <th>Name</th>
      <th></th>
    </tr>
    <tr v-for="item in items" :key="item.id">
      <td>{{ item.name }}</td>
      <td>
        <button id="show-details-modal" @click="itemDetailId = item.id">Show Details</button>
        <button id="show-delete-modal" @click="itemDeleteId = item.id">Delete</button>
      </td>
    </tr>
  </table>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="itemDetailId !== 0" @close="itemDetailId = 0">
      <template #header>{{ currentItem.name }}
      </template>
      <template #body>
        <ItemDetails :item="currentItem"></ItemDetails>
      </template>
    </modal>
  </Teleport>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="itemDeleteId !== 0">
      <template #header>Delete {{ currentItem.name }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
          <button class="modal-default-button button-danger" @click="deleteItem">
            Yes
          </button>
          <button class="modal-default-button button-safe" @click="itemDeleteId = 0">
            No
          </button>
        </div>
        <div v-else>
          <span class="text-danger">{{ error }}</span>
          <button class="modal-default-button button-safe" @click="itemDeleteId = 0">
            OK
          </button>          
        </div>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import ItemDetails from "./itemDetails.vue"
import Modal from "./modal.vue"
export default {
  components: {
    Modal,
    ItemDetails
  },
  props: {
    items: Array,
    required: true
  },
  emits: ["deleted"],
  data() {
    return {
      itemDetailId: 0,
      itemDeleteId: 0,
      currentItem: null,
      error: null,
    }
  },
  watch: {
    itemDetailId(newId, oldId) {
      this.currentItem = this.items.find((item) => item.id == newId)
    },
    itemDeleteId(newId, oldId) {
      this.currentItem = this.items.find((item) => item.id == newId)
      this.error = null
    }
  },
  methods: {
    deleteItem() {
      const api_url = import.meta.env.VITE_API_URL
      fetch(`${api_url}/items/${this.itemDeleteId}`, {
          method: "delete",
      })      
      .then( async response => {
        const isJson = response.headers.get("content-type")?.includes("application/json")
        const data = isJson && await response.json()
        if (! response.ok){
          const error = (data && data.error) || response.status
          return Promise.reject(error)
        }
        this.$emit("deleted", this.itemDeleteId)
        this.itemDeleteId = 0

      })
      .catch(error => {
        console.log("Item Delete error: ", error)
        this.error = error
      })      
    }
  },
}
</script>
<style>
table,
th,
td {
  border: 1px solid black;
}
.text-danger {
  color:red;
}
.button-danger {
  background-color: red;
}
.button-safe {
  background-color: green;
}
</style>
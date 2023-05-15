<template>
    <form  @submit="checkForm" @submit.prevent="addReview" action="/something" method="post"> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
        <label>
            Review date:
            <input type="date" v-model="review.reviewDate">
        </label>
        <label>
            Review:
            <input type="text" v-model="review.reviewBody">
        </label>
        <label>
            User:
            <select v-model="review.UserId">
              <option disabled value="0">Choose user</option>
              <option v-for ="user in users" :value="user.UserId">{{ user.UserName }}</option>
            </select>
        </label>
        <label>
            Item:
            <select v-model="review.reviewId">
              <option disabled value="0">Choose item</option>
              <option v-for ="item in items" :value= "item.ItemId">{{ item.ItemName }}</option>
            </select>
        </label>
        <button type="submit">Add review</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {

  data() {
    return {
      review: {
        reviewId: "",
        UserId: 0,
        ItemId: 0,
    },
    users: [],
    items: [],
    errors: []
    }
  },
  async created() {
    this.users = await(await fetch("http://localhost:8080/users")).json(),
    this.items = await(await fetch("http://localhost:8080/items")).json()
  },
  computed: {
    canSubmit() {
      return this.reviewId.length > 0
    }
  },
  methods: {
    checkForm: function(e) {
      if (this.UserId!=0 && this.ItemId!=0) {
        return true;
      }
      this.errors = [];

      if (!this.UserId) {
        this.errors.push('Please input user name.');
      }
      if (!this.ItemId) {
        this.errors.push('Please input item name.');
      }

      e.preventDefault();
    },
    addReview() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      //ToDo проверка на 0 при заполнении выпадающего списка
      fetch(api_url + "/reviews", {
        method: "post",
        body: JSON.stringify(this.review),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      })
      .then((response) =>{return response.json()})
      .then((data)=>{console.log("AddReview ", data)
        if (data.error) {
            this.errors = data.error
            throw data.error
        } else {
            this.review ={reviewId: ""}
            this.$emit("submit")
        }
      })
        .catch(error => console.log("Error:", error)) 
      }
    } 
  }
</script>
<style>
    select,
input,
button {
  display: block;
  margin: 0.5em 0;
  font-size: 15px;
}

input[disabled] {
  color: #999;
}

p {
  color: red;
}
</style>
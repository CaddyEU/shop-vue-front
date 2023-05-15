<template>
    <form @submit.prevent="addUser">
        <label>
            User name:
            <input type="text" v-model="user.UserName">
        </label>
        <button type="submit">Add</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br>
        </span>
    </p>
</template>
<script>

export default {
  data() {
    return {
      user: {
        UserName: ""
    },
    errors: null
    }
  },
  emits: ["submit"],
  computed: {
    canSubmit() {
      return this.user.UserName.length > 0
    }
  },
  methods: {
    addUser() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      fetch(api_url + "/users", {
        method: "post",
        body: JSON.stringify(this.user),
        headers: {'Content-Type': 'application/json; charset=utf-8'
        },
      })
      .then((response) =>{return response.json()})
      .then((data)=>{console.log("AddUser ", data)
        if (data.error) {
            this.errors = data.error
            throw data.error
        } else {
            this.user ={UserName: ""}
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
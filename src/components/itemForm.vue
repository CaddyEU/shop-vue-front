<template>
    <form @submit.prevent="addItem">
        <label>
            Name:
            <input type="text" v-model="item.name">
        </label>
        <label>
            Category:
            <input type="text" v-model="item.category">
        </label>
        <label>
            Description:<br>
            <textarea v-model="item.description" /><br>
        </label>
        <label>
            Date Posted:
            <input type="date" v-model="item.posted">
        </label>
        <button type="submit">Add Item</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>


export default {
    data() {
        return {
            item: {
                name: "",
                category: "",
                description: "",
                posted: ""
            },
            errors: null
        }
    },
    computed: {
        canSubmit() {
            return this.name.length > 0 && this.category.length > 0
        }
    },
    methods: {
        addItem() {
            this.errors = null
            const api_url = import.meta.env.VITE_API_URL
            fetch(api_url + "/items", {
                method: "post",
                body: JSON.stringify(this.item),                
                headers: {'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => { return response.json() })
            .then((data) => {                
                if (data.error) {
                    this.errors = data.error
                    throw data.error                    
                } else {
                    this.item = {name: "",category: "",description: "",posted: ""}
                }
            })
            .catch(error => console.log("Error:",error))
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
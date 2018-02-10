<template>
    <div>
        <h2>Home Page</h2>
        <p>{{message}}</p>
    </div>
</template>

<script>
export default {
    data() {
        message: 'This is the home page'
    }
}

</script>

<style scoped>
    p {
        font-weight: bold;
        color: orange;
    }
</style>
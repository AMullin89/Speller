<template>
    <input type="text" maxlength="1" :value="letter"/>
</template>

<script>
export default {
    props: ['letter']
    
}
</script>

<style scoped>
input {
    border: none;
    border-bottom: 4px solid #FF6C22;
    margin: 0 1rem;
    width: 6rem;
    height: 6rem;
    text-align: center;
    font-size: 5rem;
    background-color: #2B3499;
    color: #FF6C22;
}

input:focus-visible {
    outline: none;
}

input:hover {
    cursor: pointer;
}
</style>
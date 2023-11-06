<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    button {
        border: none;
        padding: 0.5rem;
        font-family: 'Roboto', sans-serif;
        width: 5rem;
        background-color: #FF6C22;
        border-radius: 5px;
        box-shadow: 1px 1px 1px black;
    }

    button:hover {
        cursor: pointer;
        background-color: #FFD099 ;
    }
</style>
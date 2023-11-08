<template>
    <img :src="word.source"/>
</template>

<script>
export default {
    props: ['word'],

}
</script>

<style scoped>
img {
    width: 15rem;
    height: 15rem;
}


</style>
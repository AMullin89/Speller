<template>
    <div id="leaderboard">
        <h2>Leaderboard</h2>
        <p v-for="leader in leaders">{{ leader.name }}: {{ leader.score }}</p>
    </div>
</template>

<script>
export default {
    props: ['leaders']
}
</script>

<style scoped>
    #leaderboard {
        background-color: #FF0000;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 3px 3px 3px black;
    }

    h2 {
        margin-top: 0;
    }
</style>
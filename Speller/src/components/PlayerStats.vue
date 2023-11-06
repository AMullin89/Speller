<template>
    <div id="player-stats">    
        <h2>Player Stats</h2>
        <p>Player Score: {{ player.score }}</p>
        <p>Player Lives: {{ player.lives }}</p>
    </div>
</template>

<script>
export default {
    props: ['player']
}
</script>

<style scoped>
    #player-stats {
        background-color: #FF6C22;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 3px 3px 3px black;
    }

    h2 {
        margin-top: 0;
    }
</style>
<template>
  <the-header></the-header>
  <div id="gameboard-top">
    <the-scoreboard></the-scoreboard>
    <the-image :word="word"></the-image>
    <player-stats :player="player"></player-stats>
  </div>
  <div id="letter-input">
    <base-input @change="getFirstLetter"></base-input>
    <base-input @change="getSecondLetter"></base-input>
    <base-input @change="getThirdLetter"></base-input>
  </div>
  <div id="buttons">
    <base-button @click="checkFinalWord">Submit</base-button>
    <base-button>Clear</base-button>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheScoreboard from './components/TheScoreboard.vue'
import TheImage from './components/TheImage.vue'
import PlayerStats from './components/PlayerStats.vue'
import BaseInput from './components/BaseInput.vue'
import BaseButton from './components/BaseButton.vue'

export default {
  components: {
    TheHeader,
    TheScoreboard,
    TheImage,
    PlayerStats,
    BaseInput,
    BaseButton
  }, 
  data() {
    return {
      enteredWord: '',
      firstLetter: '',
      secondLetter: '',
      thirdLetter: '',
      correctAnswer: false,
      incorrectAnswer: false,
      word: {
        title: 'cat',
        source: 'src/assets/cat.png'
      },
      player: {
        score: 0,
        lives: 3
      }
    }
  },
  methods: {
    getFirstLetter(event){
      this.firstLetter = event.target.value;
    },
    getSecondLetter(event) {
      this.secondLetter = event.target.value;
    },
    getThirdLetter(event) {
      this.thirdLetter = event.target.value;
    },
    checkFinalWord(){
      this.enteredWord = this.firstLetter + this.secondLetter + this.thirdLetter;
      console.log(this.enteredWord)
      
      if (this.enteredWord === this.word.title){
        this.correctAnswer = true;
        console.log("Well done! That is the right answer")
        this.player.score++;
      } else {
        this.incorrectAnswer = true
        console.log("Sorry, that is incorrect, please try again!")
        this.player.lives--;
        if (this.player.lives === 0){
          console.log('You have run out of lives!')
        }
      }
    },
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body{
    width: 100%;
    margin: 0;
    background-color: #2B3499;
    font-family: 'Roboto', sans-serif;
}

#gameboard-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 2rem

}

#letter-input {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

#buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
</style>

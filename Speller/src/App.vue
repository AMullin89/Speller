<template>
  <base-dialog v-if="firstTime">
    <template #header>
      <h2>Welcome!</h2>
    </template>
    <template #message>
      <label>Please enter your name:</label>
      <input type="text" name="name" id="name" @change="getPlayerName"/>
    </template>
    <template #buttons>
      <button @click="confirmPlayerName">Confirm</button>
    </template>
  </base-dialog>
    <base-dialog v-if="correctAnswer">
      <template #header>
        <h2>Congratulations</h2>
      </template>
      <template #message>
        <p>Well done! That was the right answer.</p>
      </template>
      <template #buttons>
        <button @click="getNextWord">Next</button>
      </template>
    </base-dialog>
    <base-dialog v-if="incorrectAnswer">
        <template #header>
          <h2>Sorry!</h2>
        </template>
        <template #message>
          <p>That wasn't quite right, please try again.</p>
        </template>
        <template #buttons>
          <button @click="goBack">Back</button>
        </template>
      </base-dialog>
  <the-header></the-header>
  <div id="gameboard-top">
    <the-scoreboard></the-scoreboard>
    <the-image :word="word"></the-image>
    <player-stats :player="player"></player-stats>
  </div>
  <div id="letter-input">
    <base-input @change="getFirstLetter" :letter="firstLetter"></base-input>
    <base-input @change="getSecondLetter" :letter="secondLetter"></base-input>
    <base-input @change="getThirdLetter" :letter="thirdLetter"></base-input>
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
import BaseDialog from './components/BaseDialog.vue'

export default {
  components: {
    TheHeader,
    TheScoreboard,
    TheImage,
    PlayerStats,
    BaseInput,
    BaseButton,
    BaseDialog
  }, 
  data() {
    return {
      playerName: '',
      enteredWord: '',
      firstLetter: '',
      secondLetter: '',
      thirdLetter: '',
      correctAnswer: false,
      incorrectAnswer: false,
      firstTime: true,
      word: {
        title: 'man',
        source: 'src/assets/man.png'
      },
      words: [{
        title: 'cat',
        source: 'src/assets/cat.png'
      },
      {
        title: 'man',
        source: 'src/assets/man.png'
      },
      {
        title: 'bat',
        source: 'src/assets/bat.png'
      },
      {
        title: 'bag',
        source: 'src/assets/bag.jpg'
      },
      {
        title: 'cup',
        source: 'src/assets/cup.png'
      },
      {
        title: 'tap',
        source: 'src/assets/tap.avif'
      }],
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
    getPlayerName(event){
      this.playerName = event.target.value;
    },
    confirmPlayerName(){
      this.firstTime = false;
    },
    getNextWord(){

      let index = this.words.findIndex(word => word.title === this.word.title);
      console.log(index);

      this.words.splice(index, 1);
      console.log(this.words);

      const randomIndex = Math.floor(Math.random() * this.words.length);

      this.word = this.words[randomIndex];

      this.firstLetter = '';
      this.secondLetter = '';
      this.thirdLetter = '';


      this.correctAnswer = false;


    },
    goBack(){
      this.incorrectAnswer = false;
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

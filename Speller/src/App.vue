<template>
        <base-dialog v-if="firstTime">
          <template #header>
            <h2>Welcome!</h2>
          </template>
          <template #message>
            <label>Please enter your name:</label>
            <input type="text" name="name" id="name" @change="getPlayerName"/>
            <p class="dialog-message" v-if="invalidName">Please enter a name.</p>
          </template>
          <template #buttons>
            <base-button @click="confirmPlayerName">Confirm</base-button>
          </template>
        </base-dialog>
                <base-dialog v-if="!difficulty && !firstTime">
            <template #header>
              <h2>Welcome!</h2>
            </template>
            <template #message>
              <label>Please select your difficult:</label>
            </template>
            <template #buttons>
              <div id="difficulty-btns">
                <base-button  @click="setDifficultyEasy">Easy</base-button>
                <base-button @click="setDifficultyMedium">Medium</base-button>
                <base-button @click="setDifficultyHard">Hard</base-button>
              </div>
            </template>
          </base-dialog>
    <base-dialog v-if="correctAnswer">
      <template #header>
        <h2>Congratulations</h2>
      </template>
      <template #message>
        <p class="dialog-message">Well done! That was the right answer.</p>
      </template>
      <template #buttons>
        <base-button @click="getNextWord">Next</base-button>
      </template>
    </base-dialog>
    <base-dialog v-if="incorrectAnswer">
        <template #header>
          <h2>Sorry!</h2>
        </template>
        <template #message>
          <p class="dialog-message">That wasn't quite right, please try again.</p>
        </template>
        <template #buttons>
          <base-button @click="goBack">Back</base-button>
        </template>
      </base-dialog>
      <base-dialog v-if="noMoreWords">
          <template #header>
            <h2>Well done!</h2>
          </template>
          <template #message>
            <p class="dialog-message">You have completed all of the words and your score was {{ player.score }}</p>
          </template>
          <template #buttons>
            <base-button @click="resetGame">Play Again</base-button>
          </template>
        </base-dialog>
              <base-dialog v-if="outOfLives">
            <template #header>
              <h2>Oh No!</h2>
            </template>
            <template #message>
              <p class="dialog-message">You have run out of lives with a score of {{ player.score }}, please try again.</p>
            </template>
            <template #buttons>
              <base-button @click="resetGame">Play Again</base-button>
            </template>
          </base-dialog>
  <the-header></the-header>
  <div id="gameboard-top">
    <the-scoreboard :leaders="leaders"></the-scoreboard>
    <the-image :word="word"></the-image>
    <player-stats :player="player"></player-stats>
  </div>
  <div id="letter-input">
    <base-input @change="getFirstLetter" @keyup="focusSecondInput" :letter="firstLetter"></base-input>
    <base-input @change="getSecondLetter" @keyup="focusThirdInput" :letter="secondLetter"></base-input>
    <base-input @change="getThirdLetter" @keyup="focusFourthInput" :letter="thirdLetter"></base-input>
    <base-input @change="getFourthLetter" @keyup="focusFifthInput" :letter="fourthLetter" :class="{ inactive: isEasy}"></base-input>
    <base-input @change="getFifthLetter" :letter="fifthLetter" :class="{ inactive: !isHard }"></base-input>
  </div>
  <div id="buttons">
    <base-button @click="checkFinalWord">Submit</base-button>
    <base-button @click="clearInput">Clear</base-button>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheScoreboard from './components/TheScoreboard.vue'
import TheImage from './components/TheImage.vue'
import PlayerStats from './components/PlayerStats.vue'
import BaseInput from './components/UI/BaseInput.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseDialog from './components/UI/BaseDialog.vue'

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
      fourthLetter: '',
      fifthLetter: '',
      correctAnswer: false,
      incorrectAnswer: false,
      firstTime: true,
      noMoreWords: false,
      outOfLives: false,
      invalidName: false,
      difficulty: '',
      isEasy: false,
      isMedium: false,
      isHard: false,
      word: {
        title: '',
        source: ''
      },
      words: [ 
    ],
    stockWordsEasy: [{
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
      },
      {
        title: 'hat',
        source: 'src/assets/hat.png'
      },
      {
        title: 'dog',
        source: 'src/assets/dog.jpg'
      },
      {
        title: 'car',
        source: 'src/assets/car1.png'
      }
      ],
      stockWordsMedium: [{
        title: 'sand',
        source: 'src/assets/sand.png'
      },
      {
        title: 'lamp',
        source: 'src/assets/lamp.png'
      },
      {
        title: 'pink',
        source: 'src/assets/pink.png'
      },
      {
        title: 'tent',
        source: 'src/assets/tent.png'
      },
      {
        title: 'ramp',
        source: 'src/assets/ramp.png'
      },
      {
        title: 'disc',
        source: 'src/assets/disc.png'
      },
      {
        title: 'jump',
        source: 'src/assets/jump.png'
      },
      {
        title: 'tank',
        source: 'src/assets/tank.png'
      },
      {
        title: 'hand',
        source: 'src/assets/hand.png'
      },
      {
        title: 'bolt',
        source: 'src/assets/bolg.png'
      }
      ],
      stockWordsHard: [{
        title: 'stomp',
        source: 'src/assets/stomp.png'
      },
      {
        title: 'traps',
        source: 'src/assets/traps.png'
      },
      {
        title: 'stink',
        source: 'src/assets/stink.png'
      },
      {
        title: 'crabs',
        source: 'src/assets/crabs.png'
      },
      {
        title: 'stamp',
        source: 'src/assets/stamp.png'
      },
      {
        title: 'glass',
        source: 'src/assets/glass.png'
      },
      {
        title: 'cards',
        source: 'src/assets/cards.png'
      },
      {
        title: 'plant',
        source: 'src/assets/plants.png'
      },
      {
        title: 'block',
        source: 'src/assets/block.png'
      },
      {
        title: 'windy',
        source: 'src/assets/windy.png'
      }
      ],
    player: {
        name: '',
        score: 0,
        lives: 3
      },
    leaders: [

    ]
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
    getFourthLetter(event) {
      this.fourthLetter = event.target.value;
    },
    getFifthLetter(event){
      this.fifthLetter = event.target.value;
    },
    checkFinalWord(){
      this.enteredWord = this.firstLetter + this.secondLetter + this.thirdLetter;
      console.log(this.enteredWord)

      if (this.difficulty === 'medium'){
        this.enteredWord += this.fourthLetter;
      }

      if (this.difficulty == 'hard'){
        this.enteredWord += this.fourthLetter + this.fifthLetter;
      }

      const applauseAudio = new Audio('src/assets/applause.wav');
      const wrongAnswerAudio = new Audio ('src/assets/wronganswer.wav');
      const gameOver = new Audio('src/assets/gameover.wav');
      
      if (this.enteredWord === this.word.title){
        applauseAudio.play();
        setTimeout(() => {
          applauseAudio.pause()
      }, 3000);
        this.correctAnswer = true;
        if (this.difficulty === 'easy'){
          this.player.score++;
        } else if (this.difficulty === 'medium'){
          this.player.score += 2;
        } else if (this.difficulty === 'hard'){
          this.player.score += 3;
        }
        
      } else {
        wrongAnswerAudio.play();
        this.incorrectAnswer = true;
        this.player.lives--;
        if (this.player.lives === 0){
          gameOver.play();
          this.outOfLives = true;
        }
      }
    },
    getPlayerName(event){
      this.playerName = event.target.value;
    },
    confirmPlayerName(){
      if (this.playerName.trim() === ''){
        this.invalidName = true;
        return;
      } else {
        this.player.name = this.playerName;
        this.firstTime = false;
        this.invalidName = false;
      }

    },
    getNextWord(){

      let index = this.words.findIndex(word => word.title === this.word.title);
      console.log(index);

      this.words.splice(index, 1);
      console.log(this.words);

      const randomIndex = Math.floor(Math.random() * this.words.length);

      if(this.words.length === 0){
        this.correctAnswer = false;
        this.noMoreWords = true;
        return;
      } else {
        this.word = this.words[randomIndex];

        this.firstLetter = '';
        this.secondLetter = '';
        this.thirdLetter = '';
        this.fourthLetter = '';
        this.fifthLetter = '';
      }

      this.correctAnswer = false;


    },
    goBack(){
      this.incorrectAnswer = false;
    },
    clearInput(){
      this.firstLetter = '';
      this.secondLetter = '';
      this.thirdLetter = '';
    },
    resetGame(){

      this.leaders.push({name: this.player.name, score: this.player.score})
      console.log(this.leaders)
      this.leaders.sort((a, b) => {
        return b.score - a.score;
      })

      this.noMoreWords = false;
      this.incorrectAnswer = false
      this.player.score = 0;
      this.player.lives = 3;
      this.words = this.stockWords;
      this.firstTime = true;
      this.outOfLives = false;
      this.difficulty = '',
      this.isEasy = false;
      this.isMedium = false;
      this.isHard = false;
      this.firstLetter = '';
      this.secondLetter = '';
      this.thirdLetter = '';
      this.fourthLetter = '';
      this.fifthLetter = '';
    },
    focusSecondInput(event){
      event.target.parentElement.children[1].focus()
    },
    focusThirdInput(event) {
      event.target.parentElement.children[2].focus()
    },
    focusFourthInput(event){
      if (this.difficulty === 'medium' || this.difficulty === 'hard'){
        event.target.parentElement.children[3].focus();
      }
    },
    focusFifthInput(event){
      if (this.difficulty === 'hard'){
        event.target.parentElement.children[4].focus();
      }
    },
    setDifficultyEasy(){
      this.difficulty = 'easy';
      this.isEasy = true;

      this.words = this.stockWordsEasy;

      const randomIndex = Math.floor(Math.random() * this.words.length);

      this.word = this.words[randomIndex];
    },
    setDifficultyMedium() {

      this.difficulty = 'medium';
      this.isMedium = true;
      this.words = this.stockWordsMedium;

      const randomIndex = Math.floor(Math.random() * this.words.length);

      this.word = this.words[randomIndex];

  
    },
    setDifficultyHard() {
      this.difficulty = 'hard'
      this.isHard = true;

      this.words = this.stockWordsHard;

      const randomIndex = Math.floor(Math.random() * this.words.length);

      this.word = this.words[randomIndex];
    }
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
  margin: 4rem 2rem

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

#difficulty-btns {
  display: flex;
  gap: 2rem;
}

label {
  font-size: 2rem;
  display: block;
  text-align: center;
}

input {
  display: block;
  width: 70%;
  margin: 1rem auto;
  height: 2rem;
  font-size: 2rem;

}

.dialog-message {
  text-align: center;
}

.inactive {
  display: none;
}

</style>

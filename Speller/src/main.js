import { createApp } from 'vue'
import App from './App.vue'

import BaseInput from './components/BaseInput.vue'
import BaseButton from './components/BaseButton.vue'
import BaseDialog from './components/BaseDialog.vue'

const app = createApp(App)

app.component('base-input', BaseInput);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);

app.mount('#app')

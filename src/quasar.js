import Vue from 'vue';

import 'quasar/dist/quasar.css';
import lang from 'quasar/lang/ko-kr.js';
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar, Loading, QSpinnerPuff } from 'quasar';

Vue.use(Quasar, {
  config: {
    loading: {
      spinner: QSpinnerPuff,
      spinnerColor: 'lime-5',
      messageColor: 'white',
      message: '<p class="text-overline">Please Wait...</p>',
      delay: 200,
      spinnerSize: '5em',
    },
  },
  plugins: {
    Loading,
  },
  lang: lang,
});

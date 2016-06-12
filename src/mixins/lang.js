import dictionary from '../data/dictionary';

import {
  lang,
} from '../vuex/getters';

export default {
  data() {
    return {
      dictionary,
    };
  },
  methods: {
    say(key) {
      return this.dictionary[this.lang][key];
    },
  },
  vuex: {
    getters: {
      lang,
    },
  },
};

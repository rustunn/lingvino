import { mapState } from 'vuex';

import dictionary from '../data/dictionary';

export default {
  data() {
    return {
      dictionary,
    };
  },
  computed: mapState(['lang']),
  methods: {
    say(key) {
      return this.dictionary[this.lang][key];
    },
  },
};

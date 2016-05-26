<template>
  <div id="get-strated">
    <component :is="step" v-on:clicked="clicked" transition="step"></component>
  </div>
</template>

<script>
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

export default {
  data() {
    return {
      steps: {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
        step8: false,
      },
    };
  },
  computed: {
    step() {
      return `step${this.$route.params.step}`;
    },
  },
  methods: {
    clicked() {
      this.steps[this.step] = true;
      const nextStep = parseInt(this.$route.params.step, 10) + 1;
      this.$route.router.go({ name: 'get-started', params: { step: nextStep } });
    },
  },
  components: {
    Step1,
    Step2,
  },
};
</script>

<style lang="scss" scoped>
.step-transition {
  position: absolute;
  transition: 0.3s ease-in-out 0s;
  transform: translateX(0vw);
}
.step-leave {
  transform: translateX(-100vw);
}
.step-enter {
  transform: translateX(100vw);
}
</style>
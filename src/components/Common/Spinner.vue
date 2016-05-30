<template>
  <svg class="spinner" :width="svgSize" :height="svgSize" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" :class="{ 'colored': this.colored }" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 16,
    },
    colored: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    svgSize() {
      return `${this.size}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/colors';

$offset: 187;
$duration: 1.4s;

.spinner {
  margin-right: 6px;
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  stroke: $grey;
  animation: dash $duration ease-in-out infinite;
    
  &.colored {
    animation: 
      dash $duration ease-in-out infinite,
      colors $duration ease-in-out infinite;
  }
}

@keyframes colors {
	0% { stroke: #4285F4; }
	25% { stroke: #DE3E35; }
	50% { stroke: #F7C223; }
	75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: $offset/4;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(450deg);
 }
}
</style>
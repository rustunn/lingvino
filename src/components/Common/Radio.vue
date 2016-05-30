<template>
  <div class="radio-button">
    <input type="radio" :checked="checked" :value="value" @click="clicked">
    <span>{{label}}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: {},
  },
  methods: {
    clicked() {
      this.checked = !this.checked;
      if (this.value !== undefined && this.checked) this.$emit('radio-selected', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-button {
  
}
</style>
<template>
  <div class="selector">
    <div class="selected" @click="toggle">
      <span>{{ selectedId }}</span>
      <img src="/static/icons/ic_expand_more_white_24px.svg">
    </div>
    <transition name="list">
      <ul v-if="opened">
        <li v-for="option in options" @click="selected(option.id)">{{ option.name }}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    selectedId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      opened: null,
    };
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    selected(id) {
      this.$emit('selected', id);
      this.toggle();
    },
  },
};
</script>

<style lang="scss" scoped>
.selector {
  position: relative;
  padding-left: 16px;

  .selected {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    span {
      font-size: 16px;
      font-family: "Helvetica","Arial",sans-serif;
      color: white;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  ul {
    position: absolute;
    left: 16px;
    top: 25px;
    width: 150px;
    list-style-type: none;
    list-style: none;
    display: block;
    box-sizing: border-box;
    z-index: 100;
    background: #fafafa;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scale(1);
    transition: transform 0.2s ease-in-out 0s, opacity 0.1s ease-in-out 0s;

    &.list-enter, &.list-enter-active {
      transform: scale(0.3);
      opacity: 0;
    }

    &.list-leave-active {
      opacity: 0;
    }
    
    li {
      position: relative;
      box-sizing: border-box;
      min-height: 48px;
      padding: 16px;
      overflow: hidden;
      cursor: pointer;
      border-top: 1px rgba(0,0,0,0.12) solid;
      text-align: center;

      &:first-child {
        border: 0px;
      }
      
      &:hover, &.selected {
        background-color: #eee;
      }
    }
  }
}
</style>
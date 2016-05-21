<template>
  <header>
    <div class="title">
      <div class="menu"></div>
      <span class="name">Lingvino</span>
    </div>
    <button class="button">Sign In</button>
  </header>
</template>

<sctipt>
export default {

};
</sctipt>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  background-color: rgb(21, 101, 192);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  z-index: 2;
}

.button {
  background: 0 0;
  border: none;
  border-radius: 2px;
  color: white;
  position: relative;
  height: 36px;
  margin-right: 6px;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow;
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;
  
  &:hover {
    background-color: rgba(158,158,158,.2);
  }
  
  &:active {
    background-color: rgba(158,158,158,.4);
  }
  
  &:focus {
    background-color: rgba(0,0,0,.12);
  }
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  display: block;
  position: relative;
  font-size: 20px;
  color: white;
  left: 16px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
}

.menu {
  display: block;
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-image: url('/static/icons/ic_menu_white_24px.svg');
  background-size: 24px 24px;
  background-position: 12px 12px;
  background-repeat: no-repeat;
}
</style>
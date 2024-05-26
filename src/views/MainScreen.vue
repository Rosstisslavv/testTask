<script>
import NavigationOptions from '../components/NavigationOptions.vue'
import Body from '../components/Body.vue'

export default {
  data() {
    return {
      count: 0,
      isMenuClicked: false,
      isSearchClicked: false,
      isListIconClicked: false
    }
  },
  components: {
    NavigationOptions,
    Body
  },
  methods: {
    toggleNavigation() {
      this.isMenuClicked = !this.isMenuClicked
      this.isSearchClicked = false
      this.isListIconClicked = true
      this.isListIconClicked = false
    },
    handleSearchClick() {
      this.isSearchClicked = true
      this.isSearchClicked = false
    }
  }
}
</script>

<template>
  <div class="container">
    <header class="header">
      <img
        src="@/assets/icons/list.svg"
        @click="toggleNavigation"
        alt="List Icon"
        class="list-icon"
        :class="{ clicked: isListIconClicked }"
      />
      <img
        src="@/assets/icons/search.svg"
        @click="handleSearchClick"
        alt="List Icon"
        class="list-icon"
        :class="{ clicked: isSearchClicked }"
      />
    </header>
    <NavigationOptions :isMenuClicked="isMenuClicked" />
    <Body></Body>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.header {
  position: fixed;
  top: 0;
  box-sizing: border-box;
  display: flex;
  height: 7.5%;
  background-color: rgba(15, 76, 130, 1);
  width: 100%;
  align-items: center;
  padding-left: 1.5%;
  padding-right: 1.5%;
  justify-content: space-between;
  z-index: 100;
}

.list-icon {
  transition: transform 0.1s ease;
  transform: scale(1);
}

.list-icon:active {
  transform: scale(0.95);
}

.list-icon:hover {
  cursor: pointer;
}
</style>

<script>
import NavigationOptions from '../components/NavigationOptions.vue'
import Body from '../components/Body.vue'
import InputOptions from '../components/InputOptions.vue'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchText: '',
      count: 0,
      isMenuClicked: true,
      isSearchClicked: false,
      isListIconClicked: false,
      showInputField: false
    }
  },
  computed: {
    ...mapGetters(['search'])
  },
  components: {
    NavigationOptions,
    Body,
    InputOptions
  },
  methods: {
    ...mapMutations(['updateSearch']),
    toggleNavigation() {
      this.isMenuClicked = !this.isMenuClicked
      this.isSearchClicked = false
      this.isListIconClicked = true
      this.isListIconClicked = false
    },
    handleSearchClick() {
      this.showInputField = !this.showInputField
      this.updateSearch('')
      this.searchText = ''
      this.isSearchClicked = true
      this.isSearchClicked = false
    },
    updateSearchText(event) {
      this.searchText = event.target.value
      this.updateSearch(event.target.value)
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
      <div class="input-container" v-if="showInputField">
        <input
          type="text"
          class="input-field"
          placeholder="Введите текст"
          v-model="searchText"
          @input="updateSearchText"
        />
        <img
          src="@/assets/icons/ico_Close.svg"
          alt="Close Icon"
          class="close-icon"
          @click="handleSearchClick"
        />
      </div>
      <img
        v-else
        src="@/assets/icons/search.svg"
        @click="handleSearchClick"
        alt="List Icon"
        class="list-icon"
        :class="{ clicked: isSearchClicked }"
      />
    </header>
    <NavigationOptions :isMenuClicked="isMenuClicked" />
    <Body></Body>
    <InputOptions></InputOptions>
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

.input-field {
  width: 85%;
  height: 20px;
  padding: 5px;
  font-size: 16px;
  outline: none;
  border: none;
  box-shadow: none;
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  width: 250px;
}

.close-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 2%;
}
</style>

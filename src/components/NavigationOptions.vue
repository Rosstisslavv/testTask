<script>
export default {
  name: 'NavigationOptions',
  props: {
    isMenuClicked: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isPressed: false,
      selectedOption: 'Все',
      rowData: [
        { text: 'Все', isFinished: true },
        { text: 'Обработанные', isFinished: true },
        { text: 'Необработанные', isFinished: false }
      ]
    }
  },
  methods: {
    handleClick() {
      this.isPressed = !this.isPressed
    },
    handleSelectOption(option) {
      this.selectedOption = option
    }
  }
}
</script>

<template>
  <nav class="navigation" :class="{ show: isMenuClicked }">
    <div class="profiles-container">
      <div class="profiles" @click="handleClick">
        <p>Профили</p>
        <div class="arrow-container">
          <img :class="['arrow', { 'arrow-pressed': isPressed }]" src="@/assets/icons/arrow.svg" />
        </div>
      </div>
      <div
        class="row"
        v-show="isPressed"
        v-for="(item, index) in rowData"
        @click="handleSelectOption(item.text)"
        :key="index"
      >
        <div class="imgContainer" v-if="item.isFinished">
          <img src="@/assets/icons/finished.svg" class="finished" />
          <div class="checkmark-container">
            <img src="@/assets/icons/checkmark.svg" class="checkmark" />
          </div>
        </div>
        <img v-else src="@/assets/icons/notFinished.svg" />
        <p :class="{ selected: item.text === this.selectedOption }">{{ item.text }}</p>
      </div>
    </div>
  </nav>
</template>

<style scoped>
:root {
  --font-weight-normal: 300;
  --font-weight-bold: 800;
}

.profiles-container {
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
}

.navigation {
  position: fixed;
  top: 7.5%;
  left: 0;
  width: 20%;
  height: 92.5%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  padding-left: 1.5%;
  padding-right: 1.5%;
  padding-top: 2.5%;
}

.navigation.show {
  transform: translateX(0);
}

.profiles {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  cursor: pointer;
}

.arrow {
  transform: rotate(180deg);
}

.arrow-pressed {
  transform: rotate(0deg);
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5%;
  margin-bottom: 5%;
  cursor: pointer;
}

.row p {
  margin-left: 20px;
  font-size: 15px;
  line-height: 17.5px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
}

.imgContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -50%);
}

.finished {
  max-width: 100px;
}
.selected {
  color: rgba(16, 76, 129, 1);
  font-weight: bold;
  font-family: 'Roboto', 'Roboto Bold', sans-serif;}
</style>

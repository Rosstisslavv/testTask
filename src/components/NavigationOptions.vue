<script>
export default {
  name: 'ProfilesContainer',
  data() {
    return {
      isPressed: false,
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
    }
  }
}
</script>

<template>
  <div class="profiles-container">
    <div class="profiles" @click="handleClick">
      <p>Профили</p>
      <div class="arrow-container">
        <img :class="['arrow', { 'arrow-pressed': isPressed }]" src="@/assets/icons/arrow.svg" />
      </div>
    </div>
    <div class="row" v-show="isPressed" v-for="(item, index) in rowData" :key="index">
      <div class="imgContainer" v-if="item.isFinished">
        <img src="@/assets/icons/finished.svg" class="finished" />
        <div class="checkmark-container">
          <img src="@/assets/icons/checkmark.svg" class="checkmark" />
        </div>
      </div>
      <img v-else src="@/assets/icons/notFinished.svg" />
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<style scoped>
/* ProfilesContainer.css */
.profiles-container {
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
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
</style>

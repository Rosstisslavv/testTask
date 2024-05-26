<script>
import Dropdown from 'primevue/dropdown'
export default {
  name: 'Body',
  data() {
    return {
      selectedNumber: 10,
      numbers: [1, 2, 3, 4]
    }
  }
}
</script>

<template>
  <main class="main-content">
    <div class="wrapper">
      <footer class="footer">
        <p>Количество элементов на странице:</p>
        <select class="select" v-model="selectedNumber">
          <option v-for="number in 10" :key="number">{{ number }}</option>
        </select>
        <p>1-1 из 2</p>
        <img src="../assets/icons/leftArrow.svg" class="left-arrow" />
        <img src="../assets/icons/leftArrow.svg" class="right-arrow" />
      </footer>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  position: absolute;
  top: 8%;
  flex-grow: 1;
  display: flex;
  align-self: flex-end;
  width: 77%;
  height: 92%;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  height: 99%;
  width: 99%;
  align-self: flex-start;
  border-radius: 6px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  justify-content: center;
}

.footer {
  align-self: flex-end;
  border-top: 1px solid rgba(170, 170, 170, 1);
  width: 95%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  column-gap: 15px;
  flex-direction: row;
  align-items: center;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.select {
  width: 30px;
  appearance: none;
  background-image: url('../assets/icons/Vector.svg');
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-color: white;
  border-width: 0;
}

.right-arrow {
  transform: rotate(180deg);
}

p {
  font-size: 14px;
  line-height: 17.07px;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
}
</style>

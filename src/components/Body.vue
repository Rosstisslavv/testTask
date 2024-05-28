<script>
import Dropdown from 'primevue/dropdown'
import Table from './Table.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Body',
  data() {
    return {
      selectedNumber: 10,
      numbers: [1, 2, 3, 4],
      isMenuOpened: false
    }
  },
  computed: {
    ...mapGetters([
      'allProfiles',
      'filteredProfiles',
      'numOfElements',
      'profilesStatus',
      'pages',
      'currentPage'
    ])
  },
  components: { Table },
  methods: {
    ...mapActions(['fetchProfiles']),
    ...mapMutations(['updateNumOfElements', 'updateCurrentPage', 'updateActionType']),
    fetchData(limit) {
      this.fetchProfiles(limit)
    },
    handleLeftClick() {
      if (this.currentPage !== 1) {
        this.updateCurrentPage(this.currentPage - 1)
      }
    },
    handleRightClick() {
      if (this.currentPage !== this.pages) {
        this.updateCurrentPage(this.currentPage + 1)
      }
    },
    handleMenuClick() {
      this.isMenuOpened = !this.isMenuOpened
    },
    handleAddClick() {
      this.updateActionType('add')
      this.isMenuOpened = false
    },
    handleEditClick() {
      this.updateActionType('edit')
      this.isMenuOpened = false
    },
    handleDeleteClick() {
      this.updateActionType('delete')
      this.isMenuOpened = false
    }
  },
  async mounted() {
    this.fetchProfiles()
  },
  watch: {
    selectedNumber(newValue) {
      this.updateNumOfElements(newValue)
      this.updateCurrentPage(1)
    }
  }
}
</script>

<template>
  <main class="main-content">
    <div class="wrapper">
      <div class="table-wrapper">
        <header>
          <div class="row">
            <p>{{ profilesStatus }}</p>
            <img src="@/assets/icons/refresh.svg" class="list-icon" @click="fetchProfiles()" />
          </div>
          <div class="select-action">
            <div class="select-header" @click="handleMenuClick">
              <p class="actions">Действия</p>
              <img src="@/assets/icons/VectorWhite.svg" width="9px" height="5px" />
            </div>
            <div v-show="isMenuOpened === true" class="select-options-container">
              <p @click="handleAddClick">Добавить</p>
              <p @click="handleEditClick">Изменить</p>
              <p @click="handleDeleteClick">Удалить</p>
            </div>
          </div>
        </header>
        <Table></Table>
      </div>
      <footer class="footer">
        <p>Количество элементов на странице:</p>
        <select class="select" v-model="selectedNumber">
          <option v-for="number in 10" :key="number">{{ number }}</option>
        </select>
        <p>{{ currentPage }} из {{ pages }}</p>
        <img
          src="../assets/icons/leftArrow.svg"
          class="left-arrow list-icon"
          @click="handleLeftClick"
        />
        <img
          src="../assets/icons/leftArrow.svg"
          class="right-arrow list-icon"
          @click="handleRightClick"
        />
      </footer>
    </div>
  </main>
</template>

<style scoped>
/* this.$router.push({ query: { page: this.page, limit: this.limit } }); */
.main-content {
  position: absolute;
  top: 8%;
  flex-grow: 1;
  display: flex;
  align-self: flex-end;
  width: 77%;
  height: 84%;
  max-height: 84%;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  height: 99%;
  width: 99%;
  padding-top: 5%;
  align-self: flex-start;
  border-radius: 6px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

header {
  height: 10%;
  display: flex;
  align-self: center;
  align-items: center;
  width: 95%;
  justify-content: space-between;
  margin-bottom: 3%;
}

header p {
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
}

.select-action {
  width: 13.5%;
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: rgba(15, 76, 130, 1);
  position: relative;
}

.select-header {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
  /* padding-top: 10px;
  padding-bottom: 10px; */
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
}

.footer {
  align-self: center;
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

.table-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}
.actions {
  font-size: 14px;
  line-height: 16.41px;
  font-weight: 400;
  color: white;
  font-family: 'Roboto', sans-serif;
}

.select-header:hover {
  cursor: pointer;
}

.select-options-container p:hover {
  cursor: pointer;
  background-color: rgba(237, 237, 237, 1);
}

.select-options-container {
  position: absolute;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: flex-start;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 100%;
  height: auto;
  top: 85%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  padding-top: 10px;
  padding-bottom: 10px;
}

.select-options-container p {
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 14px;
  line-height: 16.41px;
  font-weight: 400;
  border-radius: 3px;
  padding: 10px 5px;
  color: black;
  font-family: 'Roboto', sans-serif;
}
</style>

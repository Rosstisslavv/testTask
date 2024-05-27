<script>
import Dropdown from 'primevue/dropdown'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Body',
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
  methods: {
    ...mapActions(['fetchProfiles']),
    ...mapMutations(['updateNumOfElements', 'updateCurrentPage']),
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
    }
  },
  async mounted() {
    this.fetchProfiles()
  },
  data() {
    return {
      selectedNumber: 10,
      numbers: [1, 2, 3, 4],
      tableHeaders: [
        'Статус',
        'Имя',
        'Фамилия',
        'Компания',
        'Специальность',
        'Телефон',
        'E-mail',
        'Интересы'
      ]
    }
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
          <select class="select-header" aria-label="Действия">
            <option>Добавить</option>
            <option>Изменить</option>
            <option>Удалить</option>
          </select>
        </header>
        <table>
          <thead>
            <tr>
              <th v-for="(item, index) in tableHeaders" :key="index">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredProfiles" :key="index">
              <td v-if="item.status === true"><img src="@/assets/icons/okStatus.svg" /></td>
              <td v-else><img src="@/assets/icons/notOkStatus.svg" /></td>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.jobTitle }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.interests }}</td>
            </tr>
          </tbody>
        </table>
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

.select-header {
  width: 13.5%;
  appearance: none;
  padding-left: 4%;
  background-image: url('../assets/icons/VectorWhite.svg');
  background-repeat: no-repeat;
  background-position: right 24% bottom 30%;
  background-color: rgba(15, 76, 130, 1);
  border-radius: 6px;
  border-width: 0;
  padding-top: 8px;
  padding-bottom: 8px;
}

.select-header option:first-child {
  content: 'Действия'; /* Устанавливаем текст для первой опции */
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

table {
  width: 95%;
  align-self: center;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  font-size: 16px;
  line-height: 18.75px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}
</style>

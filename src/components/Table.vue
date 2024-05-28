<script>
import profiles from '@/store/modules/profiles'
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
      'currentPage',
      'actionType',
      'selectedProfile'
    ])
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
      ],
      profiles: []
      // selectedProfile: null
    }
  },
  methods: {
    ...mapActions(['fetchProfiles']),
    ...mapMutations([
      'updateNumOfElements',
      'updateCurrentPage',
      'updateActionType',
      'updateSelectedProfile'
    ]),
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
    handleChooseProfile(item) {
      this.updateSelectedProfile(item)
    }
  },
  async mounted() {
    this.fetchProfiles()
  },
  watch: {
    selectedNumber(newValue) {
      this.updateNumOfElements(newValue)
      this.updateCurrentPage(1)
    },
    filteredProfiles(newValue) {
      this.profiles = newValue
    }
  }
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, index) in tableHeaders" :key="index">{{ item }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in profiles"
        :key="index"
        :class="{
          selectable:
            (actionType === 'edit' && selectedProfile === null) ||
            (actionType === 'delete' && selectedProfile === null),
          selected: item === selectedProfile
        }"
        @click="handleChooseProfile(item)"
      >
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
</template>

<style scoped>
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

.selectable:hover {
  cursor: pointer;
  background-color: rgba(237, 237, 237, 1);
}

.selected {
  background-color: rgba(237, 237, 237, 1);
}
</style>

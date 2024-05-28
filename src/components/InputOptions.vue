<script>
import axios from 'axios'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'InputOptions',
  computed: {
    ...mapGetters(['actionType', 'selectedProfile'])
  },
  data() {
    return {
      profile: {
        name: { for: 'name', text: 'Имя:', type: 'text', id: 'name', variable: '' },
        surname: { for: 'surname', text: 'Фамилия:', type: 'text', id: 'surname', variable: '' },
        company: { for: 'company', text: 'Компания:', type: 'text', id: 'company', variable: '' },
        position: {
          for: 'position',
          text: 'Специальность:',
          type: 'text',
          id: 'position',
          variable: ''
        },
        phone: { for: 'phone', text: 'Телефон:', type: 'tel', id: 'phone', variable: '' },
        email: { for: 'email', text: 'E-mail:', type: 'email', id: 'email', variable: '' },
        interests: {
          for: 'interests',
          text: 'Интересы:',
          type: 'text',
          id: 'interests',
          variable: ''
        }
      }
    }
  },
  methods: {
    ...mapActions(['fetchProfiles']),
    ...mapMutations(['updateActionType', 'updateSelectedProfile']),
    async submitAddForm() {
      if (this.validateForm()) {
        try {
          await axios.post('https://retoolapi.dev/q81Avj/data', {
            email: this.profile.email.variable,
            phone: this.profile.phone.variable,
            status: true,
            company: this.profile.company.variable,
            jobTitle: this.profile.position.variable,
            lastName: this.profile.surname.variable,
            firstName: this.profile.name.variable,
            interests: this.profile.interests.variable
          })

          console.log('успешно')
          this.updateActionType('')
          this.clearForm()
          this.fetchProfiles()
        } catch (error) {
          console.error(error, 'Ошибка при отправке формы')
        }
      }
    },
    async submitEditForm() {
      if (this.validateForm()) {
        try {
          await axios.put(`https://retoolapi.dev/q81Avj/data/${this.selectedProfile.id}`, {
            email: this.profile.email.variable,
            phone: this.profile.phone.variable,
            status: true,
            company: this.profile.company.variable,
            jobTitle: this.profile.position.variable,
            lastName: this.profile.surname.variable,
            firstName: this.profile.name.variable,
            interests: this.profile.interests.variable
          })
          console.log('успешно')
          this.updateActionType('')
          this.updateSelectedProfile(null)
          this.clearForm()
          this.fetchProfiles()
        } catch (error) {
          console.error(error, 'Ошибка при отправке формы')
        }
      }
    },
    clearForm() {
      this.profile.name.variable = ''
      this.profile.surname.variable = ''
      this.profile.company.variable = ''
      this.profile.position.variable = ''
      this.profile.phone.variable = ''
      this.profile.email.variable = ''
      this.profile.interests.variable = ''
    },
    validateForm() {
      let isValid = true
      for (const key in this.profile) {
        if (this.profile[key].variable === '') {
          isValid = false
          break
        }
      }

      if (isValid) {
        const phoneRegex = /^\+?\d{1,3}?[-. ]?\(?\d{1,3}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}$/
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!phoneRegex.test(this.profile.phone.variable)) {
          isValid = false
          alert('Неправильный формат телефона')
        } else if (!emailRegex.test(this.profile.email.variable)) {
          isValid = false
          alert('Неправильный формат email')
        }
      } else {
        alert('Пожалуйста, заполните все поля')
      }

      return isValid
    },
    handleClose() {
      this.updateActionType('')
      this.updateSelectedProfile(null)
      this.clearForm()
    }
  },
  watch: {
    selectedProfile(newValue) {
      console.log(newValue, 'asas')
      if (this.selectedProfile !== null) {
        this.profile.name.variable = newValue.firstName
        this.profile.surname.variable = newValue.lastName
        this.profile.company.variable = newValue.company
        this.profile.position.variable = newValue.jobTitle
        this.profile.phone.variable = newValue.phone
        this.profile.email.variable = newValue.email
        this.profile.interests.variable = newValue.interests
      }
    }
  }
}
</script>
<template>
  <div
    class="inputs-container"
    :class="{ show: actionType === 'add' || (actionType === 'edit' && selectedProfile !== null) }"
  >
    <form>
      <div v-for="(item, index) in profile" :key="index" class="form-group">
        <label :for="item.for">{{ item.text }}</label>
        <input :type="item.type" :id="item.id" v-model="item.variable" required />
      </div>
      <div class="form-actions">
        <img
          src="@/assets/icons/ico_Close.svg"
          alt="Close Icon"
          class="close-icon"
          @click="handleClose"
        />
        <button type="button" class="clear" @click="clearForm">Очистить</button>
        <button
          type="button"
          class="submit"
          @click="actionType === 'add' ? submitAddForm() : submitEditForm()"
        >
          Подтвердить
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
:root {
  --font-weight-normal: 300;
  --font-weight-bold: 800;
}

.profiles-container {
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
}

.inputs-container {
  position: fixed;
  top: 7.5%;
  right: 0;
  width: 20%;
  height: 92.5%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  padding-left: 1.5%;
  padding-right: 1.5%;
  padding-top: 2.5%;
}

.inputs-container.show {
  transform: translateX(0);
}

form {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: var(--font-weight-normal);
  margin-bottom: 0.5rem;
  font-size: 12px;
  line-height: 14.06px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 0px;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.form-actions {
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 90%;
}

.form-actions button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
}

.clear {
  background-color: white;
  color: black;
  border: 1px solid rgba(153, 153, 153, 1);
}

.clear:hover {
  background-color: rgba(153, 153, 153, 1);
}

.submit {
  background-color: rgba(15, 76, 130, 1);
  border: none;
  color: white;
}

.submit:hover {
  background-color: #0056b3;
}

.close-icon {
  cursor: pointer;
}
</style>

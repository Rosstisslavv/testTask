<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    onConfirm: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: true
    }
  },
  methods: {
    confirm() {
      this.onConfirm()
      this.$emit('close')
    },
    cancel() {
      this.onCancel()
      this.$emit('close')
    }
  }
}
</script>
<template>
  <div v-show="show" class="modal-overlay">
    <div class="modal">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="buttons">
        <button class="close" @click="cancel">Отмена</button>
        <button class="submit" @click="confirm">Подтвердить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 90%;
}

h3 {
  margin-bottom: 20px;
}
.buttons {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
}

.buttons button {
  margin-left: 10px;
}
</style>

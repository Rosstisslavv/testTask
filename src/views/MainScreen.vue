<script>
import NavigationOptions from '../components/NavigationOptions.vue'
import Body from '../components/Body.vue'
import InputOptions from '../components/InputOptions.vue'
import HeaderOptions from '../components/HeaderOptions.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isMenuClicked'])
  },
  components: {
    NavigationOptions,
    Body,
    InputOptions,
    HeaderOptions
  }
}
</script>

<template>
  <div class="container">
    <HeaderOptions></HeaderOptions>
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
</style>

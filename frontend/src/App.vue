<template>
  <v-app>
    <v-main>
      <menu-component />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MenuComponent from './components/common/TheMenu.vue';

export default {
  name: 'App',
  components: {
    MenuComponent
  },
  data: () => ({})
};
</script>

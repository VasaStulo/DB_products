<script src="../../../../backend/src/products/products.service.ts"></script>
<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Библиотека программных продуктов</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="$router.push('/findProduct')"
              >Найти местоположение</v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push('/addProgram')"
              >Добавить программу</v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push('/analogProduct')"
              >Подобрать аналог</v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push('/findByFeature')"
              >Найти по описанию</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$router.push('/compatibility')"
              >Проверить совместимость</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>

<script src="../../../backend/src/products/products.service.ts"></script>
<script src="../../../backend/src/products/products.controller.ts"></script>
<template>
  <div>
    <h2>Подобрать аналог</h2>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Название продукта, аналог которого будет найдет*"
              required
              v-model="product_name"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="blue darken-1" text @click="$router.push('/')">
          Назад
        </v-btn>
        <v-btn color="blue darken-1" text @click="getProductAnalog()">
          Найти
        </v-btn>
        <div class="cards-container">
          <v-card
            v-for="pr in product"
            :key="pr.id"
            class="mx-auto card"
            max-width="344"
          >
            <v-card-text>
              <div>{{ pr.category.name }}</div>
              <p class="text-h4 text--primary">
                {{ pr.name }}
              </p>
              <div class="text--primary">
                <p>Производитель: {{ pr.manufacturer.name }}</p>
                <p>Память: {{ pr.memory }}</p>
                <p>Объем оперативной памяти: {{ pr.min_ram }}</p>
                <p>Cтоимость: {{ pr.cost }} руб.</p>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product_name: '',
      error: false,
      status: false,
      product: [],
      valid: false,
      nameRules: [(v) => !!v || 'Поле не должно быть пустым!']
    };
  },
  watch: {
    status() {
      return this.error;
    }
  },
  methods: {
    async getProductAnalog() {
      try {
        const response = await fetch(
          'http://localhost:5000/products/analog_product',
          {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              product_name: this.product_name
            })
          }
        );
        this.product = await response.json();
        console.log(this.product);
        if (this.product.length === 0 || this.product.statusCode == 404) {
          this.status = false;
          this.error = true;
          return;
        }
        this.status = true;
        this.error = false;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
  margin-top: 30px;
}
.cards-container {
  margin-top: 20px;
  display: flex;
}
</style>

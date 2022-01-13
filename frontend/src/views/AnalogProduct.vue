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
        <div class="er" v-if="emptError">
          <p>К сожалению, аналога к данной программе не существует!</p>
        </div>
        <div v-if="error" class="er">
          <p>Такого продукта не существует!</p>
        </div>
        <div class="cards-container" v-if="!emptError && status">
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
      emptError: false,
      status: false,
      error: false,
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
      this.error = false;
      this.emptError = false;
      this.status = true;

      try {
        const response = await fetch(
          'http://localhost:5000/products/analog_product',
          {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              product_name:
                this.product_name.charAt(0).toUpperCase() +
                this.product_name.slice(1)
            })
          }
        );
        this.product = await response.json();
        console.log(this.product);
        if (this.product.length === 0 || this.product.statusCode == 404) {
          this.error = true;
          this.status = false;
          return;
        }
        if (this.product.length === 1) {
          this.emptError = true;
        }
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
.er {
  color: red;
}
</style>

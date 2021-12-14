<template>
  <div>
    <h2>Найти местоположение продукта</h2>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Название*"
              v-model="product_name"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Категория*"
              required
              v-model="category_name"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Производитель*"
              required
              v-model="manufacturer_name"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-alert v-if="error" dense outlined type="error">
          Программы с такими параметрами не существует!
        </v-alert>
        <v-btn color="blue darken-1" text @click.prevent="$router.push('/')">
          Назад
        </v-btn>
        <v-btn color="blue darken-1" text @click.prevent="getProductDisk">
          Найти
        </v-btn>
        <div v-if="status" class="prog">
          <p>
            Местоположение программы {{ product.name }} - диск
            {{ product.disk }}:/
          </p>
          <p>Дополнительная информация:</p>
          <p>Категория: {{ product.category.name }}</p>
          <p>Производитель: {{ product.manufacturer.name }}</p>
          <p>Память: {{ product.memory }}</p>
          <p>Объем оперативной памяти: {{ product.min_ram }}</p>
          <p>Cтоимость: {{ product.cost }} руб.</p>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'FindProduct',
  data() {
    return {
      error: false,
      status: false,
      product: [],
      valid: false,
      product_name: '',
      category_name: '',
      manufacturer_name: '',
      nameRules: [(v) => !!v || 'Поле не должно быть пустым!']
    };
  },
  watch: {
    status() {
      return this.error;
    }
  },
  methods: {
    async getProductDisk() {
      try {
        const response = await fetch(
          'http://localhost:5000/products/find_place',
          {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              product_name: this.product_name,
              category_name: this.category_name,
              manufacturer_name: this.manufacturer_name
            }) // body data type must match "Content-Type" header
          }
        );
        this.product = await response.json();
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
.prog {
  margin-top: 50px;
  padding: 10px;
  border: 4px double cornflowerblue;
}
h2 {
  text-align: center;
  margin-top: 30px;
}
</style>

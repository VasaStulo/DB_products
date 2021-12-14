<script src="../../../backend/src/products/products.service.ts"></script>
<script src="../../../backend/src/products/dto/create-product.dto.ts"></script>
<template>
  <div class="add_container">
    <h2>Найти продукт по описанию</h2>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            :placeholder="'Photoshop'"
            label="Название"
            required
            v-model="name"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :placeholder="'Фото'"
            label="Категория"
            required
            v-model="category_name"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :placeholder="'Adobe'"
            label="Производитель"
            required
            v-model="manufacturer_name"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :placeholder="'30'"
            label="Память,Мб"
            required
            v-model="memory"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :placeholder="'40'"
            label="Минимальный объем оперативной памяти,Мб"
            required
            v-model="min_ram"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :placeholder="'C'"
            label="Диск"
            required
            v-model="disk"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :placeholder="'25000'"
            label="Стоимость,руб"
            required
            v-model="cost"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="blue darken-1" text @click.prevent="$router.push('/')">
        Назад
      </v-btn>
      <v-btn color="blue darken-1" text @click.prevent="findByFeature()">
        Найти
      </v-btn>
      <p class="err">{{ errorMsg }}</p>
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
              <p>Местоположение: {{ pr.disk }}</p>
              <p>Cтоимость: {{ pr.cost }} руб.</p>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'findByFeature',
  data() {
    return {
      errorNumMsg: '',
      errorMsg: '',
      memory: '',
      cost: '',
      disk: '',
      min_ram: '',
      valid: false,
      name: '',
      category_name: '',
      manufacturer_name: '',
      product: []
    };
  },
  methods: {
    validateForm() {
      if (isNaN(this.cost) || isNaN(this.memory) || isNaN(this.min_ram))
        this.errorNumMsg =
          'Поля Стоимость,Память и Оперативная память должны состоять из цифр!';
      else this.errorNumMsg = '';
      if (
        this.name === '' &&
        this.category_name === '' &&
        this.manufacturer_name === '' &&
        this.memory === '' &&
        this.disk === '' &&
        this.min_ram === '' &&
        this.cost === ''
      )
        this.errorMsg = 'Хоть одно поле должно быть заполнено!';
      else this.errorMsg = '';
    },
    async findByFeature() {
      this.validateForm();
      if (this.errorMsg == '') {
        try {
          const response = await fetch(
            'http://localhost:5000/products/find_by_feature',
            {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
                category_name:
                  this.category_name.charAt(0).toUpperCase() +
                  this.category_name.slice(1),
                manufacturer_name:
                  this.manufacturer_name.charAt(0).toUpperCase() +
                  this.manufacturer_name.slice(1),
                memory: this.memory,
                cost: this.cost,
                disk: this.disk.charAt(0).toUpperCase() + this.disk.slice(1),
                min_ram: this.min_ram
              })
            }
          );
          this.product = await response.json();
          console.log(this.product);
          if (this.product.length === 0 || this.product.statusCode == 409) {
            this.error = true;
            return;
          }
          this.error = false;
        } catch (e) {
          console.log(e);
        }
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
.err {
  margin-top: 20px;
  color: red;
}
</style>

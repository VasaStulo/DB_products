<template>
  <div>
    <h2>Проверка совместимости продукста с вашим компьютером</h2>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Название продукта*"
              v-model="product_name"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :placeholder="'30'"
              label="Память*,Мб"
              required
              v-model="memory"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :placeholder="'40'"
              label="Минимальный объем оперативной памяти*,Мб"
              required
              v-model="min_ram"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="blue darken-1" text @click.prevent="$router.push('/')">
          Назад
        </v-btn>
        <v-btn color="blue darken-1" text @click.prevent="getProductDisk">
          Найти
        </v-btn>
        <p class="err">{{ errorNumMsg }}</p>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'createNewProduct',
  data() {
    return {
      errorNumMsg: '',
      succesMsg: '',
      memory: '',
      cost: '',
      disk: '',
      min_ram: '',
      newProduct: [],
      valid: false,
      product_name: '',
      category_name: '',
      manufacturer_name: '',
      nameRules: [(v) => !!v || 'Поле не должно быть пустым!']
    };
  },
  methods: {
    validateForm() {
      if (isNaN(this.memory) || isNaN(this.min_ram))
        this.errorNumMsg =
          'Поля Память и Оперативная память должны состоять из цифр!';
      else this.errorNumMsg = '';
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
.ok {
  color: #42b983;
}
</style>

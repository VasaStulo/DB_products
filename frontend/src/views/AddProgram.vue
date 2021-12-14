<script src="../../../backend/src/products/products.module.ts"></script>
<template>
  <div class="add_container">
    <h2>Добавление нового продукта</h2>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :placeholder="'Photoshop'"
              label="Название*"
              required
              v-model="product_name"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :placeholder="'Фото'"
              label="Категория*"
              required
              v-model="category_name"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :placeholder="'Adobe'"
              label="Производитель*"
              required
              v-model="manufacturer_name"
              :rules="nameRules"
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
          <v-col cols="6">
            <v-text-field
              :placeholder="'C'"
              label="Диск*"
              required
              v-model="disk"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :placeholder="'25000'"
              label="Стоимость*,руб"
              required
              v-model="cost"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="blue darken-1" text @click.prevent="$router.push('/')">
          Назад
        </v-btn>
        <v-btn color="blue darken-1" text @click.prevent="createNewProduct">
          Добавить
        </v-btn>
        <p class="err">{{ errorNumMsg }}</p>
        <p class="ok">{{ succesMsg }}</p>
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
      if (isNaN(this.cost) || isNaN(this.memory) || isNaN(this.min_ram))
        this.errorNumMsg =
          'Поля Стоимость,Память и Оперативная память должны состоять из цифр!';
      else this.errorNumMsg = '';
    },

    async createNewProduct() {
      this.validateForm();
      if (this.errorMsg == '' && this.errorNumMsg == '') {
        this.succesMsg = 'Продукт успешно добавлен!';
        try {
          const response = await fetch(
            'http://localhost:5000/products/add_program',
            {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                product_name:
                  this.product_name.charAt(0).toUpperCase() +
                  this.product_name.slice(1),
                category_name:
                  this.category_name.charAt(0).toUpperCase() +
                  this.category_name.slice(1),
                manufacturer_name:
                  this.manufacturer_name.charAt(0).toUpperCase() +
                  this.manufacturer_name.slice(1),
                memory: this.memory,
                cost: this.cost,
                disk: this.disk.charAt(0).toUpperCase() + this.disk.slice(1),
                min_ram: this.min_ram,
                error: false,
                status: false
              })
            }
          );
          this.newProduct = await response.json();
          console.log(this.newProduct);
          if (
            this.newProduct.length === 0 ||
            this.newProduct.statusCode == 409
          ) {
            this.status = false;
            this.error = true;
            return;
          }
          this.status = true;
          this.error = false;
        } catch (e) {
          console.log(e);
        }
      } else this.succesMsg = '';
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

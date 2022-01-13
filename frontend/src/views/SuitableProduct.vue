<script src="../../../backend/src/products/products.controller.ts"></script>
<script src="../../../backend/src/products/dto/compatibility-dto.ts"></script>
<template>
  <div>
    <h2>Поиск наиболее подходящего продукта</h2>
    <v-form v-model="valid">
      <v-container>
        <h3>Введите параментры вашего компьютера</h3>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :placeholder="'30'"
              label="Объем свободной памяти вашего компьютера*,Мб"
              required
              v-model="memory"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :placeholder="'40'"
              label="Объем оперативной памяти вашего компьютера*,Мб"
              required
              v-model="min_ram"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <h3>Введите желаемую цену за продукт</h3>
        <v-col cols="6">
          <v-text-field
            :placeholder="'30'"
            label="Стоимость*,руб."
            required
            v-model="cost"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-btn color="blue darken-1" text @click.prevent="$router.push('/')">
          Назад
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click.prevent="FindSuitableProduct()"
        >
          Найти
        </v-btn>
        <v-alert v-if="error" dense outlined type="error">
          Для заданных параментров не удалось найти подходящего продукта!
        </v-alert>
        <div class="cards-container" v-if="status">
          <v-card
            v-for="pr in suiProduct"
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
  name: 'FindSuitableProduct',
  data() {
    return {
      errorNumMsg: '',
      memory: '',
      min_ram: '',
      cost: '',
      valid: false,
      error: false,
      status: false,
      name: '',
      suiProduct: [],
      nameRules: [(v) => !!v || 'Поле не должно быть пустым!']
    };
  },
  watch: {
    status() {
      return this.error;
    }
  },
  methods: {
    validateForm() {
      if (isNaN(this.memory) || isNaN(this.min_ram) || isNaN(this.cost))
        this.errorNumMsg =
          'Поля Стоимость, Память и Оперативная память должны состоять из цифр!';
      else this.errorNumMsg = '';
    },
    async FindSuitableProduct() {
      this.validateForm();
      if (this.errorNumMsg == '') {
        this.error = false;
        this.status = true;
        try {
          const response = await fetch(
            'http://localhost:5000/products/suitable_product',
            {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                memory: this.memory,
                min_ram: this.min_ram,
                cost: this.cost
              })
            }
          );
          this.suiProduct = await response.json();
          console.log(this.suiProduct);
          if (
            this.suiProduct.length === 0 ||
            this.suiProduct.statusCode == 404
          ) {
            this.error = true;
            this.status = false;
            console.log('мда');
            return;
          }
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
.prog {
  margin-top: 50px;
  padding: 10px;
  border: 4px double cornflowerblue;
}
</style>

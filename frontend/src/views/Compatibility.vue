<script src="../../../backend/src/products/dto/compatibility-dto.ts"></script>
<template>
  <div>
    <h2>Проверка совместимости продукста с вашим компьютером</h2>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Название продукта*"
              v-model="name"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
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
        <v-btn color="blue darken-1" text @click.prevent="$router.push('/')">
          Назад
        </v-btn>
        <v-btn color="blue darken-1" text @click.prevent="CheckCompatibility()">
          Проверить
        </v-btn>
        <v-alert v-if="error" dense outlined type="error">
          Программы с такими параметрами не существует!
        </v-alert>
        <p class="err">{{ errorNumMsg }}</p>
        <p class="ok">{{ msgs[0] }}</p>
        <p class="err_bold">{{ msgs[1] }}</p>
        <p class="err">{{ msgs[2] }}</p>
        <p class="err">{{ msgs[3] }}</p>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'CheckCompatibility',
  data() {
    return {
      errorNumMsg: '',
      memory: '',
      min_ram: '',
      msgs: [],
      valid: false,
      name: '',
      nameRules: [(v) => !!v || 'Поле не должно быть пустым!']
    };
  },
  methods: {
    validateForm() {
      if (isNaN(this.memory) || isNaN(this.min_ram))
        this.errorNumMsg =
          'Поля Память и Оперативная память должны состоять из цифр!';
      else this.errorNumMsg = '';
    },
    async CheckCompatibility() {
      this.validateForm();
      if (this.errorNumMsg == '') {
        try {
          console.log('jjjj');
          const response = await fetch(
            'http://localhost:5000/products/compatibility',
            {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
                memory: this.memory,
                min_ram: this.min_ram
              })
            }
          );
          this.msgs = await response.json();
          console.log(this.msgs);
          if (this.msgs.length === 0 || this.msgs.statusCode == 404) {
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
.err_bold {
  margin-top: 25px;
  font-weight: bold;
  color: red;
}
.ok {
  margin-top: 25px;
  font-weight: bold;
  color: #42b983;
}
</style>

<template>
  <h1>Библиотека программных продуктов</h1>
  <div>
    <Table v-bind:products="products" />
  </div>
</template>

<script>
import Table from "@/components/Table";

export default {
  //для передачи данных
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:5000/products");
      this.products = await res.json();
    } catch (e) {
      console.log(e``);
    }
  },
  components: {
    Table,
  },
};
</script>

<script src="../../../backend/src/products/products.controller.ts"></script>
<template>
  <div>
    <table-component :products="products" />
  </div>
</template>

<script>
import TableComponent from '../components/common/TheTable.vue';
import MenuComponent from '../components/common/TheMenu.vue';
export default {
  name: 'Home',

  components: {
    TableComponent,
    MenuComponent
  },
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    try {
      const res = await fetch('http://localhost:5000/products');
      this.products = await res.json();
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

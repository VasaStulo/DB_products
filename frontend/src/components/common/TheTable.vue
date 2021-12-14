<script src="../../../../backend/src/products/products.service.ts"></script>
<script src="../../../../backend/src/manufacturer/manufacturer.controller.ts"></script>
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="10"
      class="elevation-1"
    />
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
  props: ['products'],
  data() {
    return {
      headers: [
        { value: 'name', text: 'Название' },
        { value: 'category.name', text: 'Категория' },
        { value: 'manufacturer.name', text: 'Производитель' },
        { value: 'memory', text: 'Объем памяти' },
        { value: 'min_ram', text: 'Объем оперативной памяти' },
        { value: 'disk', text: 'Местоположение' },
        { value: 'cost', text: 'Стоимость' }
      ]
    };
  }
};
</script>

<style scoped></style>

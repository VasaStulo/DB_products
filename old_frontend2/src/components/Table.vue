<template>
  <TableLite :columns="table.columns" :rows="products" />
</template>

<script>
import TableLite from "vue3-table-lite";
export default {
  // чтобы объект знал что мы сюда передаем
  props: ["products"],
  data() {
    return {
      table: {
        columns: [
          { field: "product_id", label: "#" },
          { field: "name", label: "Название" },
          // { field: "category.label", label: "Категория" },
          // { field: "manufacturer.label", label: "Производитель" },
          { field: "memory", label: "Объем памяти" },
          { field: "min_ram", label: "Объем оперативной памяти" },
          { field: "disk", label: "Местоположение" },
          { field: "cost", label: "Стоимость" },
        ],
      },
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

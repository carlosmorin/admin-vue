<template>
    <div>
      <base-header type="gradient-success" class="pt-5 pt-md-8"></base-header>
      <div class="container-fluid mt--5">
          <div class="row">
              <div class="col">
                  <categories-table title="Light Table"></categories-table>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
  import CategoriesTable from './Categories/CategoriesTable'
  export default {
    name: 'categories',
    components: {
      CategoriesTable
    }
  };
</script>
<style></style>

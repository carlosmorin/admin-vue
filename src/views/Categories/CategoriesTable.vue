<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            Listado de categorías
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">Neva categoría</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="categories">
        <template slot="columns">
          <th>#</th>
          <th>Nombre</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <td class="budget">
            {{row.id}}
          </td>
          <td>
            {{row.name}}
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>

                <router-link :to="{ name: 'categories', params: { id: row.id } }" class="dropdown-item">
                  <span>Detalle</span>
                </router-link>
                <a class="dropdown-item" href="#">Editar</a>
                <a class="dropdown-item" href="#">Eliminar</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>


  </div>
</template>
<script>
  export default {
    name: 'categories-table',
    props: {
      type: {
        type: String
      },
      name: String
    },
    data() {
      return {
        categories: []
      }
    },
    mounted(){
      this.fetchCategories()
    },
    methods: {
      fetchCategories(){
        this.$http
          .get('http://localhost:3000/api/categories')
          .then(response => {
            console.log("response", response.data)
            this.categories = response.data
          })
          .catch(error => {
            console.log("Error", error)
          })
      }
    }
  }
</script>
<style>
  .table-responsive{
    overflow-x: hidden !important; 
  }
</style>

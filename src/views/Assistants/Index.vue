<template>
  <div>
    <base-header type="gradient-success" class="pt-5 pt-md-8"></base-header>
    <div class="container-fluid mt--5">
      <div class="row">
        <div class="col">

          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col-lg-7">
                  <h3 class="mb-0">
                    Listado de asistentes
                  </h3>
                </div>
              </div>
              <form @submit.prevent="search">
                <div class="row">
                  <div class="col-lg-5 ml-4">
                    <div class="input-group-alternative mb-3 mt-4">
                      <input type="text" name="" placeholder="Buscar por Nombre, Telefono o direcciòn" class="form-control"  v-model="filterParams.search">
                    </div>  
                  </div>
                  <div class="col-lg-2 text-center">
                    <input type="submit" value="Buscar" class="btn mr-4 btn-primary mt-4">
                  </div>
                </div>
              </form>
            </div>
            <div class="car-body">
               <div class="table-responsive">
                  <base-table class="table align-items-center table-flush"
                              tbody-classes="list"
                              :data="assistants">
                    <template slot="columns">
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Grupo</th>
                      <th>Dirección</th>
                      <th>Telefono</th>
                      <th></th>
                    </template>

                    <template slot-scope="{row}">
                      <td class="budget">
                        {{row.id}}
                      </td>
                      <td>
                        {{row.name}}
                      </td>
                      <td>
                        {{row.group}}
                      </td>
                      <td>
                        {{row.address}}
                      </td>
                      <td>
                        {{ row.phone}}
                      </td>
       
                      <td class="text-center">
                        <base-dropdown class="dropdown"
                                       position="right">
                          <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                          </a>

                          <template>
                            <router-link :to="{ path: 'assistants/show/' + row.id }" class="dropdown-item">
                              <span>Detalle</span>
                            </router-link>
                            <router-link :to="{ path: 'assistants/edit/' + row.id }" class="dropdown-item">
                              <span>Editar</span>
                            </router-link>
                            <a href="#" @click.prevent="deleteRow(row.id)" class="dropdown-item">
                              Eliminar
                            </a>
                          </template>
                        </base-dropdown>

                      </td>

                    </template>

                  </base-table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
              <nav>
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link bold"
                      :class="{disabled: currentPage === minPage}"
                      @click.prevent="changePage( currentPage - 1 )">
                        <i class="ni ni-bold-left"></i>
                      </a></li>

                  <li class="page-item" 
                      :class="{active: currentPage === item}"
                      :key="item"
                      v-for="item in range(1, totalPages)">
                    <a class="page-link" @click.prevent="changePage(item)">{{item}}</a>
                  </li>

                  <li class="page-item">
                    <a class="page-link" 
                      :class="{disabled: currentPage === Number(totalPages)}"
                      @click.prevent="changePage( currentPage + 1 )">
                      <i class="ni ni-bold-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activity-logs-table',
    data() {
      return {
        assistants:[],
        minPage: 1,
        currentPage: 1,
        totalPages: 1,
        filterParams:{
          search: ''
        }
      }
    },
    mounted(){
      this.fetchAssistants()
    },
    methods: {
      fetchAssistants(){

        const params = {
          page: this.currentPage
        }
        this.$http
          .get('http://localhost:3000/api/assistants/', { params })
          .then(response => {
            this.assistants = response.data
            this.totalPages = response.headers["x-total-pages"]

          })
          .catch(error => {
            console.log("Error: ", error)
          })
      },
      deleteRow(id){
        this.$swal({
          title: 'Esta seguro?',
          text: "Los cambios no podrán ser revertidos!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) { 
            this.$http
              .delete('http://localhost:3000/api/assistants/' + id)
              .then(response => {
                 this.$swal(
                  'Eliminado!',
                  'Los cambios no podran ser revertidos.',
                  'success'
                )
                this.fetchAssistants()
                })
                .catch(error => {
                  console.log("Error: ", error)
                })

           
          }
        })
      },
      search(){
        this.$http
        .get('http://localhost:3000/api/assistants/', {
          params:{
            search: this.filterParams.search
          }
        })
        .then(response => {
          this.assistants = response.data
          this.totalPages = response.headers["x-total-pages"]
        })
        .catch(error => {
          console.log("Error: ", error)
        })

      },
      changePage(page){
        this.currentPage = page 
        this.fetchAssistants()
      },
      range(min, max) {
        let arr = [];
        for (let i = min; i <= max; i++) {
          arr.push(i);
        }
        return arr;
      }
    }
  }

</script>
<style>
  .table-responsive{
    overflow-x: hidden !important; 
  }
  a.page-link{
    cursor: pointer;
  }
  a.disabled{
    pointer-events: none;
    background: #e5e4e4;
    color: #b4b4b4;
  }
</style>

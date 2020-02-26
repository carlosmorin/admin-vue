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
                        <router-link :to="{ path: 'assistants/show/' + row.id }" >
                          <span>Detalle</span>
                        </router-link>
                      </td>

                    </template>

                  </base-table>
                </div>
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
        assistants:[]
      }
    },
    mounted(){
      this.fetchAssistants()
    },
    methods: {
      fetchAssistants(){
        this.$http
          .get('http://localhost:3000/api/assistants/')
          .then(response => {
            this.assistants = response.data
          })
          .catch(error => {
            console.log("Error: ", error)
          })
      }
    }
  }

</script>
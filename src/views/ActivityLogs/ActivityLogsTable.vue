<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            Log de actividades
          </h3>
        </div>
       
      </div>
    </div>
    <div>
       <form role="form">
          <div class="row">
              <div class="col-lg-10 ">
                <base-input class="input-group-alternative mb-3"
                    placeholder="Email">
                </base-input>
              </div>
              <div class="col-lg-2 text-center">
                <base-button type="primary" size="md">Filtrar</base-button>
              </div>
            </div>
        </form>
    </div>
    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="activity_logs">
        <template slot="columns">
          <th>#</th>
          <th>Bebe</th>
          <th>Asistente</th>
          <th>Actividad</th>
          <th>Inicio</th>
          <th>Estatus</th>
          <th>Duraciòn</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <td class="budget">
            {{row.id}}
          </td>
          <td>
            {{row.baby_name}}
          </td>
          <td>
            {{row.assistant_name}}
          </td>
          <td>
            {{row.activity_name}}
          </td>
          <td>
            {{ format_date(row.start_time)}}
          </td>
          <td>
            <span class="btn mr-4 btn-info btn-sm" v-if="row.stop_time === null">En progreso</span>
            <span class="btn mr-4 btn-success btn-sm" v-if="row.stop_time !== null">Terminada</span>
          </td>
          <td>
            <span class="" v-if="row.stop_time === null"> - </span>
            
            <span class="" v-if="row.stop_time !== null">{{row.duration }} <small>Min</small></span>
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

  </div>
</template>
<script>
  import moment from 'moment'

  export default {
    name: 'activity-logs-table',
    props: {
      type: {
        type: String
      },
      name: String
    },
    data() {
      return {
        activity_logs: []
      }
    },
    mounted(){
      this.fetchCategories()
    },
    methods: {
      fetchCategories(){
        this.$http
          .get('http://localhost:3000/api/activity_logs')
          .then(response => {
            console.log("response", response.data)
            this.activity_logs = response.data
          })
          .catch(error => {
            console.log("Error", error)
          })
     
      },
      format_date(value){
        if (value) {
          return moment(String(value)).format('YYYY-MM-DD HH:MM')
        }
      }
    }
  }
</script>
<style>
  .table-responsive{
    overflow-x: hidden !important; 
  }
</style>

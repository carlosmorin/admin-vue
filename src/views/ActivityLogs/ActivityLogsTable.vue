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
      <form @submit.prevent="filter">
        <div class="row">
          <div class="col-lg-3 ml-4">
            <small class="text-muted ">Bebés: </small>
            <div class="input-group-alternative mb-3">
              <select name="" id="" class="form-control" v-model="form.baby_id">
                <option value="">Todos</option>
                <option v-for="(baby, index) in babies" v-bind:value="baby.id">
                  {{ baby.name }}
                </option>
              </select>
            </div>  
          </div>
          <div class="col-lg-3 ml-4">
            <small class="text-muted ">Asistentes: </small>
            <div class="input-group-alternative mb-3">
              <select name="" id="" class="form-control" v-model="form.assistant_id">
                <option value="">Todos</option>
                <option v-for="(assistant, index) in assistants" v-bind:value="assistant.id">
                  {{ assistant.name }}
                </option>
              </select>
            </div>  
          </div>
          <div class="col-lg-3 ">
            <small class="text-muted ">Status: </small>
            <div class="input-group-alternative mb-3">
              <select name="" id="" class="form-control" v-model="form.status">
                <option value="">Todos</option>
                <option  v-for="(status, index) in statuses" v-bind:value="status.key">
                  {{ status.name }}
                </option>
              </select>
            </div>  
          </div>
          <div class="col-lg-2 text-center">
            <input type="submit" value="Filtrar" class="btn mr-4 btn-primary mt-4">
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
                <router-link :to="{ path: 'activity_logs/show/' + row.id }" class="dropdown-item">
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
        form: {
          baby_is: null,
          assistant_id: null,
          status: null
        },
        activity_logs: [],
        babies: [],
        assistants: [],
        statuses: [
          {key: 'in_progress', name: "En progreso"},
          {key: 'finished', name: "Terminadas"}
        ]

      }
    },
    mounted(){
      this.fetchActivityLogs()
      this.fetchBabies()
      this.fetchAssistants()
    },
    methods: {
      fetchActivityLogs(){
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
      fetchBabies(){
        this.$http
          .get('http://localhost:3000/api/babies')
          .then(response => {
            console.log("babies_list:", response.data)
            this.babies = response.data
          })
          .catch(error => {
            console.log("Error", error)
          })
      },
      fetchAssistants(){
        this.$http
          .get('http://localhost:3000/api/assistants')
          .then(response => {
            this.assistants = response.data
          })
          .catch(error => {
            console.log("Error", error)
          })
      },
      format_date(value){
        if (value) {
          return moment(String(value)).format('YYYY-MM-DD HH:MM')
        }
      },
      filter(){
        this.$http
          .get('http://localhost:3000/api/activity_logs', {
            params:{
              baby_id: this.form.baby_id,
              assistant_id: this.form.assistant_id,
              status: this.form.status
            }
          })
          .then(response => {
            console.log("response", response.data)
            this.activity_logs = response.data
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

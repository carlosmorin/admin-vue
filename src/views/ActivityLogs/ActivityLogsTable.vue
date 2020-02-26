<template>
  <div class="card shadow">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <h3 class="mb-0">
            Log de actividades
          </h3>
        </div>
      </div>
    </div>
    <form @submit.prevent="applyFilters">
      <div class="row">
        <div class="col-lg-3 ml-4">
          <small class="text-muted ">Bebés: </small>
          <div class="input-group-alternative mb-3">
            <select name="" id="" class="form-control" v-model="filterParams.babdyId">
              <option value="">Todos</option>
              <option v-for="baby in babies" v-bind:value="baby.id">
                {{ baby.name }}
              </option>
            </select>
          </div>  
        </div>
        <div class="col-lg-3 ml-4">
          <small class="text-muted ">Asistentes: </small>
          <div class="input-group-alternative mb-3">
            <select name="" id="" class="form-control" v-model="filterParams.assistantId">
              <option value="">Todos</option>
              <option v-for="assistant in assistants" v-bind:value="filterParams.id">
                {{ assistant.name }}
              </option>
            </select>
          </div>  
        </div>
        <div class="col-lg-3 ">
          <small class="text-muted ">Status: </small>
          <div class="input-group-alternative mb-3">
            <select name="" id="" class="form-control" v-model="filterParams.status">
              <option value="">Todos</option>
              <option  v-for="status in statuses" v-bind:value="status.key">
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
    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  tbody-classes="list"
                  :data="activityLogs">
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
            {{ formatDate(row.start_time)}}
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
    <div class="card-footer d-flex justify-content-end">
      <nav >
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
</template>
<script>
  import moment from 'moment'

  export default {
    name: 'activity-logs-table',
    data() {
      return {
        filterParams: {
          babdyId: null,
          assistantId: null,
          status: null
        },
        activityLogs: [],
        babies: [],
        assistants: [],
        statuses: [
          {key: 'in_progress', name: "En progreso"},
          {key: 'finished', name: "Terminadas"}
        ],
        minPage: 1,
        currentPage: 1,
        totalPages: 1
      }
    },
    mounted(){
      this.fetchActivityLogs()
      this.fetchBabies()
      this.fetchAssistants()
    },
    methods: {
      fetchActivityLogs(){
        const params = {
          page: this.currentPage
        }
        this.$http
          .get('http://localhost:3000/api/activity_logs/', { params })
          .then(response => {
            this.activityLogs = response.data
            this.totalPages = response.headers["x-total-pages"]
          })
          .catch(error => {
            console.log("Error: ", error)
          })
      },
      fetchBabies(){
        this.$http
          .get('http://localhost:3000/api/babies')
          .then(response => {
            this.babies = response.data
          })
          .catch(error => {
            console.log("Error: ", error)
          })
      },
      fetchAssistants(){
        this.$http
          .get('http://localhost:3000/api/assistants')
          .then(response => {
            this.assistants = response.data
          })
          .catch(error => {
            console.log("Error: ", error)
          })
      },
      applyFilters(){
        this.$http
          .get('http://localhost:3000/api/activity_logs', {
            params:{
              baby_id: this.filterParams.babdyId,
              assistant_id: this.filterParams.assistantId,
              status: this.filterParams.status
            }
          })
          .then(response => {
            this.activityLogs = response.data
            this.totalPages = response.headers["x-total-pages"]
          })
          .catch(error => {
            console.log("Error: ", error)
          })
      },
      setTotalPages(totalPages){
        console.log(totalPages)
        this.totalPages = totalPages
      },
      changePage(page){
        this.currentPage = page 
        this.fetchActivityLogs()
      },
      formatDate(value){
        if (value) {
          return moment(String(value)).format('YYYY-MM-DD HH:MM')
        }
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

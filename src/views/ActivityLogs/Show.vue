<template>
    <div>
      <base-header class="header pb-8 pt-lg-8 d-flex align-items-center"
                   style=" background-size: cover; background-position: center top;">
      </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-6 order-xl-2 mb-5 mb-xl-0">
                    <div class="card card-profile shadow">

                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <span class="btn mr-4 btn-info btn-sm" v-if="object.stop_time === null">En progreso</span>
                                <span class="btn mr-4 btn-success btn-sm" v-if="object.stop_time !== null">Terminada</span>
                            </div>
                        </div>
                     
                        <div class="card-body pt-0 pt-md-4">
                          <div class="text-center">
                              <small>Bebe:</small>
                              <h3>
                                {{ object.baby_name }}
                              </h3>
                              <div class="h5 font-weight-300">
                                  <i class="ni location_pin mr-2"></i>
                                  <small>Asistente:</small> <br>
                                  <h4>{{ object.assistant_name }}</h4>
                              </div>

                               <div class="h5 font-weight-300">
                                  <i class="ni location_pin mr-2"></i>
                                  <small>Actividad:</small> <br>
                                  <h4>{{ object.activity_name }}</h4>
                              </div>

                              <div class="h5 ">
                                  <i class="ni location_pin mr-2"></i>
                                  <small>Inicio:  -  Fin:</small> <br>
                                  <i class="ni business_briefcase-24 mr-2"></i>{{ object.start_time }} - {{ object.stop_time }}
                              </div>
                              <div>
                                <small>Duracion: </small> <br>
                                  <b> {{ object.duration }} <small>Min</small> </b>
                              </div>
                              <small>Comentarios:</small>
                              <p>{{ object.comments }} </p>
                              <hr />
                              <div class="text-center border-0 ">
                                <div class="d-flex justify-content-left">
                                  <router-link :to="{ path: '/activity_logs' }" class="btn mr-4 btn-secondary btn-md">Atras</router-link>
                                </div>
                              </div>

                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import moment from 'moment'

  export default {
    name: 'activity-logs-show',
    data() {
      return {
        object: {},
        id: this.$route.params.id
      }
    },
    mounted(){
      this.fetchActivityLog()
    },
    methods: {
      fetchActivityLog(){
        console.log(this.id)
        this.$http
          .get('http://localhost:3000/api/activity_logs/' + this.id)
          .then(response => {
            this.object = response.data
          })
          .catch(error => {
            console.log("Error:", error)
          })
      }
    }
  };
</script>
<style></style>

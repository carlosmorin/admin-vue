<template>
    <div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <div class="container-fluid mt--7 pt-10">
          <div class="row">
              <div class="col-xl-6 order-xl-2 mb-5 mb-xl-0">
                  <div class="card card-profile shadow">
                    <div class="card-header text-left border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                      <div class="d-flex justify-content-between">
                        <h3 class="mb-0">
                          Detalle de asistente
                        </h3>
                        <span class="btn mr-4 btn-info btn-sm" v-if="object.stop_time === null">En progreso</span>
                        <span class="btn mr-4 btn-success btn-sm" v-if="object.stop_time !== null">Terminada</span>
                      </div>
                    </div>
                    <div class="card-body pt-0 pt-md-4">
                      <div class="text-left">
                        <small>Nombre:</small>
                        <p>
                          {{ object.name }}
                        </p>
                        <small>Grupo:</small>
                        <p>
                          {{ object.group }}
                        </p>
                        <small>Dirección:</small>
                        <p>
                          {{ object.address }}
                        </p>
                        <small>Telefono:</small>
                        <p>
                          {{ object.phone }}
                        </p>
                        <small>Fecha de creaciòn:</small>
                        <p>
                          {{ object.created_at }}
                        </p>
                        <hr />
                        <div class="text-center border-0 ">
                          <div class="d-flex justify-content-left">
                            <router-link :to="{ path: '/assistants' }" class="btn mr-4 btn-secondary btn-md">Atras</router-link>
                            <router-link :to="{ path: '/assistants/edit/' + object.id }" class="btn mr-4 btn-success btn-md">Editar</router-link>
                          </div>
                        </div>

                      </div>
                    </div>
                       <div class="card-footer d-flex justify-content-end">
  
                  </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>
<script>

  export default {
    name: 'assistants-show',
    data() {
      return {
        object: {},
        id: this.$route.params.id,
        minPage: 1,
        currentPage: 1,
        totalPages: 1
      }
    },
    mounted(){
      this.fetchAssistants()
    },
    methods: {
      fetchAssistants(){
        this.$http
          .get('http://localhost:3000/api/assistants/' + this.id)
          .then(response => {
            this.object = response.data
            this.totalPages = response.headers["x-total-pages"]
          })
          .catch(error => {
            console.log("Error:", error)
          })
      },
      changePage(page){
        this.currentPage = page 
        this.fetchActivityLogs()
      },
      range(min, max) {
        let arr = [];
        for (let i = min; i <= max; i++) {
          arr.push(i);
        }
        return arr;
      }
    }
  };
</script>
<style></style>

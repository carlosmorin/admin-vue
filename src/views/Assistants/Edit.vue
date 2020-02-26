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
                    <div class="card-header text-left border-0 pt-8 pt-md-4 pb-0">
                      <div class="d-flex justify-content-between">
                        <h3 class="mb-0">
                          Editar de asistente
                        </h3>
                      </div>
                    </div>
                    <form role="form"  @submit.prevent="updateAssistants">

                      <div class="card-body px-lg-5">
                        <small class="text-muted">Nombre:</small>
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Name"
                                    v-model="object.name">
                        </base-input>
                        
                        <small class="text-muted">Direcciòn:</small>
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Direccion"
                                    v-model="object.address">
                        </base-input>
                        
                        <small class="text-muted">Telefono:</small>
                        <base-input class="input-group-alternative"
                                    placeholder="Telefono"
                                    v-model="object.phone">
                        </base-input>
                        <small class="text-muted">Grupo:</small>
                        <base-input class="input-group-alternative"
                                    placeholder="Grupo"
                                    type="number"
                                    v-model="object.group">
                        </base-input>
                      </div>
                      <div class="card-footer d-flex justify-content-end pt-0 pb-0">
                        <div class="text-left">
                          <router-link :to="{ path: '/assistants' }" class="btn mr-4 btn-secondary btn-md">Atras</router-link>
                          <input type="submit" class="btn my-4 btn-primary" value="Actualizar">
                        </div>
                    </div>
                  </form>
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
        object: {
          id: this.$route.params.id,
          name: "",
          group: "",
          address: "",
          phone: ""
        },
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
      updateAssistants(){
        // alert();
        // data = {
        //   id: this.object.id,
        //   name: this.object.name,
        //   group: "3",
        //   address: "7081 Velit Rd.",
        //   phone: "1-553-822-3077",
        // }

        this.$http
          .patch('http://localhost:3000/api/assistants/' + this.id, this.object)
          .then(response => {
            console.log("response-----", response);
            alert("Sucess");
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

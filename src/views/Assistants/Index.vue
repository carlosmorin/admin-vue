<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
              <h2>Login</h2>
          </div>
          <div class="alert alert-danger" role="alert">
            {{ }}
          </div>
          <form role="form" @submit.prevent="login">
            <base-input class="input-group-alternative mb-3"
                        placeholder="Email"
                        addon-left-icon="ni ni-email-83"
                        v-model="user.email"
                        requiere="true">
            </base-input>

            <base-input class="input-group-alternative"
                        placeholder="Password"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        v-model="user.password"
                        requiere="true">
            </base-input>

            <div class="text-center">
              <input type="submit" class="btn my-4 btn-primary" value="Entrar"> 
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueSweetalert2 from 'vue-sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  
  export default {
    name: 'login',
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      login(){
        this.$http
          .post('http://localhost:3000/api/authenticate', {
            email: this.user.email,
            password: this.user.password
          })
          .then( function (response)  {
            localStorage.setItem('token', response.data.auth_token)
            this.$route.push('/dashboard')
          })
          .catch(function (error) {
            var self = this;
            console.log(error.response.status)
            if (error.response.status) {
              self.error = "Correo y/o contraseña incorrectos"
            }
          });
      }
    }
  }
</script>
<style>
  .main-content{
    height: 100vh;
  }
</style>

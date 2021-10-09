<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
          <input
            type="text"
            id="image"
            class="form-control mb-5"
            v-model="register.image"
            hidden
            required
          />
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="register.email"
            required
          />
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="register.password"
          />
          <p>
            Already have an account??<router-link to="/login"
              >click here</router-link
            >
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Sign in
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert'

export default {
  data() {
    return {
      register: {
        image: "https://res.cloudinary.com/favalcodes/image/upload/v1633803145/naruto-5927441_1920_mysi2h.png",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/user/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          swal("Success", "Registration Was successful", "success");
        } else {
          swal("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>
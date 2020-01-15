<template>
  <div class="design-w3l">
    <form v-on:submit.prevent="addSuperUser">
      <p class="h5 text-center mb-4">Add Super User</p>
      <div class="grey-text">
        <mdb-input
          label="Full Name"
          icon="user"
          type="text"
          v-model="user.fullname"
          required
        />
        <mdb-input
          label="Email"
          icon="envelope"
          type="email"
          v-model="user.email"
          required
        />
      </div>
      <div class="text-center">
        <mdb-btn outline="info"
          ><i class="fas fa-paper-plane"></i> Send
        </mdb-btn>
      </div>
    </form>
  </div>
</template>
<script>
import { mdbInput, mdbBtn } from "mdbvue";
import axios from "axios";
import routes from "../routes/routes";
export default {
  name: "addSuperUser",
  components: {
    mdbInput,
    mdbBtn
  },
  data() {
    return {
      user: {
        email: "",
        fullname: ""
      }
    };
  },

  methods: {
    addSuperUser() {
      
      axios
        .post("http://localhost:1000/api/superUser", this.user, {withCredentials: true})
        .then(res => {
          if (res.data === "success") {
            alert("Super User successfully added");
            routes.push("/dashboard");
          }
          if (res.data === "failed") {
            alert("Super User failed to be added ");
            routes.push("/dashboard");
          }
          if (res.data === "exist") {
            alert("Super User already exists");
          }
        });
    }
  },

};
</script>

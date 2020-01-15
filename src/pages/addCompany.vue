<template>
  <div class="design-w3l">
    <div class="mail-form-agile" style="background:white; margin-top:50px">
      <form
        v-on:submit.prevent="addCompany"
        style="padding:5% !important"
      >
        <div class="form-group">
          <center>
            <div class="semipolar-spinner" v-if="load">
              <div class="ring"></div>
              <div class="ring"></div>
              <div class="ring"></div>
              <div class="ring"></div>
              <div class="ring"></div>
            </div>
            <!-- <h4 v-if="success" class="red-number" style="font-family:sans-serif">Success, Redirecting...</h4> -->
            <h4 v-if="success" class="red-text" style="font-family:sans-serif">
              Successfully Created, Redirecting...
            </h4>
          </center>
        </div>

        <div class="form-group">
          Company Name :
          <input
            type="text"
            placeholder="Name..."
            name="fullname"
            class="form-contr"
            v-model="user.fullname"
            required
          />
        </div>
        <div class="form-group">
          Company Email :
          <input
            type="email"
            placeholder="Email..."
            name="plate"
            class="form-contr"
            v-model="user.email"
            required
          />
        </div>

        <div class="form-group">
          Phone Number :
          <input
            type="number"
            placeholder="Number..."
            class="form-contr"
            v-model="user.phonenumber"
            required
          />
        </div>

        <div class="form-group">
          <center>
            <mdb-btn outline="info"
              ><i class="fas fa-paper-plane"></i> Add Company
            </mdb-btn>
          </center>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
require("../css/style.css");
require("../fonts/material-icon/css/material-design-iconic-font.min.css");
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
        fullname: "",
        phonenumber: ""
      },
      load: "",
      success: ""
    };
  },

  methods: {
    addCompany() {
      this.load = true;
      
      axios
        .post("/api/company", this.user, 
          {withCredentials: true})
        .then(res => {
          if (res.data === "success") {
              this.success = true;           
              this.load=false             
              if(this.success){
            setTimeout(wait=>{
                routes.push("/company")            
              },1000)

            }
          }
          if (res.data === "internet error") {
            this.load = false;
            alert("Company failed to be added, Internet error ");
            routes.push("/company");
          }
          if (res.data === "exist") {
            this.load = false;
            alert("Company already exists");
          }
        });
    }
  },

};
</script>
<style scoped>
.mail-form-agile {
  width: 100% !important;
  /* float: left !important; */
}
.mail-form-agile input {
  padding: 13px 5px 10px !important;
}
.form-contr {
  border: none;
  outline: none;
  border-bottom: 1px solid lightgray;
  margin-top: 10px;
  border-radius: 0;
  width: 100%;

  padding: 1em 0 12px;
  padding-left: 0;
  background: none;
  font-weight: 400;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.form-contr:focus {
  border: 0 !important;
  outline: none !important;
  box-sizing: all;
  border-bottom: 2px solid #68b3ff !important;
}
button.submit {
  color: white;
  background: rgb(122, 163, 238);
  padding: 1em 1.4em;
  font-size: 1.2em;
  border: none;
  border-radius: 10px;
}
/* .form-contr:placeholder{
  opacity: 0.1;
  color: red !important;
}   */
.semipolar-spinner,
.semipolar-spinner * {
  box-sizing: border-box;
}

.semipolar-spinner {
  height: 65px;
  width: 65px;
  position: relative;
}

.semipolar-spinner .ring {
  border-radius: 50%;
  position: absolute;
  border: calc(65px * 0.05) solid transparent;
  border-top-color: rgb(17, 120, 218);
  border-left-color: rgb(17, 120, 218);
  animation: semipolar-spinner-animation 2s infinite;
}

.semipolar-spinner .ring:nth-child(1) {
  height: calc(65px - 65px * 0.2 * 0);
  width: calc(65px - 65px * 0.2 * 0);
  top: calc(65px * 0.1 * 0);
  left: calc(65px * 0.1 * 0);
  animation-delay: calc(2000ms * 0.1 * 4);
  z-index: 5;
}

.semipolar-spinner .ring:nth-child(2) {
  height: calc(65px - 65px * 0.2 * 1);
  width: calc(65px - 65px * 0.2 * 1);
  top: calc(65px * 0.1 * 1);
  left: calc(65px * 0.1 * 1);
  animation-delay: calc(2000ms * 0.1 * 3);
  z-index: 4;
}

.semipolar-spinner .ring:nth-child(3) {
  height: calc(65px - 65px * 0.2 * 2);
  width: calc(65px - 65px * 0.2 * 2);
  top: calc(65px * 0.1 * 2);
  left: calc(65px * 0.1 * 2);
  animation-delay: calc(2000ms * 0.1 * 2);
  z-index: 3;
}

.semipolar-spinner .ring:nth-child(4) {
  height: calc(65px - 65px * 0.2 * 3);
  width: calc(65px - 65px * 0.2 * 3);
  top: calc(65px * 0.1 * 3);
  left: calc(65px * 0.1 * 3);
  animation-delay: calc(2000ms * 0.1 * 1);
  z-index: 2;
}

.semipolar-spinner .ring:nth-child(5) {
  height: calc(65px - 65px * 0.2 * 4);
  width: calc(65px - 65px * 0.2 * 4);
  top: calc(65px * 0.1 * 4);
  left: calc(65px * 0.1 * 4);
  animation-delay: calc(2000ms * 0.1 * 0);
  z-index: 1;
}

@keyframes semipolar-spinner-animation {
  50% {
    transform: rotate(360deg) scale(0.7);
  }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

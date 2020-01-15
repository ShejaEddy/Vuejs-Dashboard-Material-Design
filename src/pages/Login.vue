<template>
  <body>
    <div class="padding-all" style="margin-top:-1%">
      <h3 class="black-text font-weight-bold" style="font-size:60px !important">
        <strong>Sheja</strong>
        <a class="blue-text font-weight-bold"><strong>Eddy</strong></a>
      </h3>
      <div class="design-w3l">
        <div class="mail-form-agile">
          <form v-on:submit.prevent="login()">
            <div class="form-group">
              <center>
                <h2 class="text-uppercase">
                  <a class="font-weight-bold black-text">SIGN</a>
                  <a class="blue-text font-weight-bold"><strong>IN</strong></a>
                </h2>
                <div class="semipolar-spinner" v-if="load" style="z-index:100">
                  <div class="ring"></div>
                  <div class="ring"></div>
                  <div class="ring"></div>
                  <div class="ring"></div>
                  <div class="ring"></div>
                </div>
                <h4
                  v-if="success"
                  class="red-text"
                  style="font-family:sans-serif"
                >
                  Success, Redirecting...
                </h4>
                <h4
                  v-if="failure"
                  class="red-text"
                  style="font-family:sans-serif"
                >
                  Authentication Failed...
                </h4>
              </center>
            </div>
            <div class="form-group">
              <label for="email"
                ><i
                  class="zmdi zmdi-email zmdi-hc-3x"
                  style="padding-bottom:2px !important"
                ></i
              ></label>
              <input
                type="email"
                v-model="user.email"
                name="email"
                class="padding"
                placeholder="Email..."
                required=""
              />
            </div>
            <div class="form-group">
              <label for="password"
                ><i class="zmdi zmdi-lock zmdi-hc-3x"></i
              ></label>
              <input
                type="password"
                v-model="user.password"
                name="password"
                class="padding"
                placeholder="Password..."
                required=""
              />
            </div>
            <div class="form-group">
              <input type="submit" value="login" />
            </div>
          </form>
          <div class="form-group">
            <center>
              <mdb-btn
                color="transparent"
                style="color:black !important; box-shadow:none;"
                @click.native="modal = true"
                ><u>Forgot Password</u> ?</mdb-btn
              >
            </center>
            <mdb-modal :show="modal" @close="modal = false">
              <mdb-modal-header>
                <mdb-modal-title>Forgot Password</mdb-modal-title>
              </mdb-modal-header>
              <mdb-modal-body>
                <p style="color:black !important">
                  Enter your email for you to be sent a reset password link in
                  your email account
                </p>
                <form v-on:submit.prevent="forgotPassword()">
                  <div class="form-group">
                    <label for="forgotPassword"
                      ><i
                        class="zmdi zmdi-email zmdi-hc-3x"
                        style="padding-bottom:5px !important"
                      ></i
                    ></label>
                    <input
                      type="email"
                      style="color:black !important"
                      v-model="user.email"
                      name="forgotPassword"
                      class="padding"
                      placeholder="Email..."
                      required=""
                    />
                  </div>
                  <div class="form-group">
                    <mdb-btn color="primary"
                      ><i
                        class="zmdi zmdi-mail-send"
                        style="color:white !important"
                      >
                        Send Link</i
                      >
                    </mdb-btn>
                  </div>
                </form>
              </mdb-modal-body>
              <mdb-modal-footer>
                <mdb-btn color="danger" @click.native="modal = false"
                  >Cancel</mdb-btn
                >
              </mdb-modal-footer>
            </mdb-modal>
          </div>
          <div class="form-group">
            <mdb-modal :show="modal2" @close="modal2 = false">
              <mdb-modal-header>
                <mdb-modal-title>Reset Password</mdb-modal-title>
              </mdb-modal-header>
              <mdb-modal-body>
                <p style="color:black !important">
                  Enter a valid Password to Change your old one
                </p>
                <form v-on:submit.prevent="resetPassword()">
                  <div class="form-group">
                    <label for="newPassword"
                      ><i class="zmdi zmdi-lock zmdi-hc-3x"></i
                    ></label>
                    <input
                      type="password"
                      v-model="resetOpt.newPassword"
                      name="newPassword"
                      class="padding"
                      placeholder="Password..."
                      required=""
                    />
                  </div>
                  <div class="form-group">
                    <label for="confirm_password"
                      ><i class="zmdi zmdi-lock zmdi-hc-3x"></i
                    ></label>
                    <input
                      type="password"
                      v-model="resetOpt.confirm_password"
                      name="confirm_password"
                      class="padding"
                      placeholder="Confirm Password..."
                      required=""
                    />
                  </div>
                  <div class="form-group">
                    <mdb-btn color="primary"
                      ><i
                        class="zmdi zmdi-mail-send"
                        style="color:white !important"
                      >
                        Update Password</i
                      >
                    </mdb-btn>
                  </div>
                </form>
              </mdb-modal-body>
              <mdb-modal-footer>
                <mdb-btn color="danger" @click.native="modal2 = false"
                  >Cancel</mdb-btn
                >
              </mdb-modal-footer>
            </mdb-modal>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn
} from "mdbvue";
require("../css/style.css");
require("../fonts/material-icon/css/material-design-iconic-font.min.css");
import router from "../routes/routes";
import axios from "axios";
export default {
  name: "login",
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn
  },
  data() {
    return {     
      modal: false,
      modal2: false,
      user: {
        email: "",
        password: ""
      },
      resetOpt: {
        newPassword: "",
        confirm_password: ""
      },
      reset_token: document.location.href.split("reset_token=")[1],
      load: false,
      success: false,
      failure: false
    };
  },
  methods: {
    login() {
      this.load = true;
   axios.post("/user/auth/login",this.user)
   .then(res=>{
    
    if(res.data==="success"){
      this.load=false     
            this.failure = false;
            this.success = true;
            if (this.success) {
              this.failure = false;
              setTimeout(wait=>{
               router.push({ path: "/" });
              },1000)
    }
   }
      if (res.data === "error") {
            this.failure = true;
            if (this.failure) {
              this.load = false;
            }            
            
          }
        })
        .catch(err => {
          alert(err.message);
        })
 },
    forgotPassword() {
      axios.post("/user/auth/forgot_password", this.user).then(res => {
        if (res.data === "forgot sent") {
          alert("Email successfully sent");
        }
        if (res.data === "internet error") {
          alert("Email not sent, Internet error");
        }
        if (res.data === "not found") {
          alert("Credentials not found");
        }
      });
    },
    resetPassword() {
      //console.log(this.reset_token)
      if (this.resetOpt.newPassword === this.resetOpt.confirm_password) {
        axios
          .post("/user/auth/reset_password", {
            resetOpt: this.resetOpt,
            reset_token: this.reset_token
          })
          .then(res => {
            
            if (res.data === "reset sent") {
              alert("password successfully updated");
              this.modal2 = false;
              router.push("/login");
            }
            if (res.data === "internet error") {
              alert("Password failed to be updated, Internet error");
            }
            //  if(res.data==='internet error'){
            //   alert('Password failed to be updated, Internet error')
            // }
            if (res.data === "reset_token_expired") {
              alert(
                "Password failed to be updated, Invalid token. Restart the forgot password process"
              );
            }
            else{
              alert("Password failed to be updated, Internet error");
            }
          })
          .catch(err => {
            alert(err);
          });
      } else {
        alert("password must match");
      }
    }
  },
// created(){
//   axios.post("/user/protected",{withCredentials: true} )
// .then(res=>{
  
//   if (res.data === "go") {
//          this.$router.push('/') 
//           return
//         }
//         next()
        
// })
// .catch(err=>{
//  this.$router.push('/login')
// })
        
      
// }
};
</script>
<style scoped>
.div {
  align-items: center;
  flex-direction: column;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 800;
  margin-bottom: 30;
  text-align: center;
  color: #d51a1a;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input-field .input {
  font-size: 54;
}

.btn-primary {
  height: 50;
  margin: 30 5 15 5;
  background-color: #d51a1a;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}

.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}

.zmdi {
  color: rgb(17, 120, 218) !important;
  padding-bottom: 5px !important;
}

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
</style>

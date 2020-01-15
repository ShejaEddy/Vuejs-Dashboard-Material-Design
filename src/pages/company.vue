<template>  

    <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Shuri Company
              <mdb-btn outline="white" @click="modal=true"
              style="float:right !important"><i class="fa fa-plus"></i> Add Company
            </mdb-btn>
            </h4>
            <p class="category">List of all companies of Shuri</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
    
        
        
            <mdb-modal :show="modal" @close="modal = false,user.email='',user.fullname='',user.phonenumber=''"">
              <mdb-modal-header>
                <mdb-modal-title>Create Company</mdb-modal-title>
              </mdb-modal-header>
              <mdb-modal-body>
                   <form
        v-on:submit.prevent="addShuriBusCompany"
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
              </mdb-modal-body>
              <mdb-modal-footer>
                <mdb-btn color="danger" @click.native="modal = false,user.email='',user.fullname='',user.phonenumber=''"
                  >Cancel</mdb-btn
                >
              </mdb-modal-footer>
            </mdb-modal>
      </div> 
</template>

<script>
import { mdbInput, mdbBtn, mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter, } from "mdbvue";
import axios from "axios";
import {OrderedTable} from '@/components'
import router from "../routes/routes"
export default {
  components:{

    OrderedTable,
    mdbInput, mdbBtn,
     mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    
  },
  name: "shuriBusCompany",
  data() {
    return {
      modal:false,
      items: {
        fullname: "",
        email: "",
        phoneNumber: "",
        acceptInvitation: "",
        Nid: 0
      },
       user: {
        email: "",
        fullname: "",
        phonenumber: ""
      },
      load: "",
      success: ""
    }
  },
  mounted() {

  },
  methods: {

        addShuriBusCompany() {
      this.load = true;
      
      axios
        .post("/api/create/shuriBusCompany", this.user, 
          {withCredentials: true})
        .then(res => {

          console.log(res.data)
          if (res.data === "success") {
              this.success = true;           
              this.load=false 
              this.user.email=""
            this.user.fullname=""
            this.user.phonenumber=""    
              if(this.success){
            setTimeout(wait=>{
               this.modal=false
               this.success=false            
              },1000)

            }
          }
          if (res.data === "internet error") {
            this.load = false;
            alert("Shuri Bus Company failed to be added, Internet Error ! ");            
            this.user.email=""
            this.user.fullname=""
            this.user.phonenumber=""
            this.modal=false
          }
          if (res.data === "exist") {
            this.load = false;
            alert("Shuri Bus Company already exists");
          }
        });
    }
  }
};
</script>

<style>
.tableau {
  margin-left: 2% !important;
  /* margin-right: 1% !important; */
  width: 96% !important;
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

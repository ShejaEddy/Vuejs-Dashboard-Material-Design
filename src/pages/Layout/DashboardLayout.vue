<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <i class="zmdi zmdi-view-dashboard"></i>
        <p style="color:white !important;font-weight:300px !important">Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <i class="zmdi zmdi-account"></i>
        <p style="color:white !important;font-weight:300px !important">User Profile</p>
      </sidebar-link>

      <sidebar-link to="/company">
        <i class="zmdi zmdi-bus"></i>
        <p style="color:white !important;font-weight:300px !important">Bus Company</p>
      </sidebar-link>
      <sidebar-link to="/school">
        <i class="zmdi zmdi-assignment-account"></i>
        <p style="color:white !important;font-weight:300px !important">School</p>
      </sidebar-link>

    <!--   <sidebar-link to="/maps">
        <i class="zmdi zmdi-pin-drop"></i>
        <p style="color:white !important;font-weight:300px !important">Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <i class="zmdi zmdi-notifications-active"></i>
        <p style="color:white !important;font-weight:300px !important">Notifications</p>
      </sidebar-link> -->
      <center>
      <button @click="logout" class="btn" style="background:#FCB402;height:48px !important;box-shadow:none !important;width:88.1% !important;"><i class="fas fa-power-off" style="font-size:20px !important;width:100%;color:white !important">&nbsp;&nbsp;&nbsp;<span style="font-size:15px !important">logout</span></i>   </button>
        </center>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>
</script>

<style lang="css" scoped>
.zmdi {
    color:#fff !important;
    
  };
  p{
    color:rgb(255, 255, 255) !important;
  }
  .btn:hover{
   -webkit-box-shadow: 0 5px 11px 0 #495057, 0 4px 15px 0 #495057 !important;
   box-shadow: 0 5px 11px 0 #495057, 0 4px 15px 0 #495057 !important; 
   outline: 0 !important; 
  
  background-color:#5a5e5e !important
}
.btn{
font-family: 'Cormorant SC', serif;
color:white;
padding:0px 90px 0px 15px
}
  </style>

<script>
import TopNavbar from "./TopNavbar.vue";

import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import router from "../../routes/routes";
import axios from "axios"
export default {
  components: {
    TopNavbar,
    DashboardContent,

    MobileMenu
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    closeSidebar() {
      this.$sidebar.displaySidebar((this.$sidebar.showSidebar = false));
    },
      logout() {
      axios.post("/user/logout",{withCredentials: true} )
      .then(res=>{
      
      if (res.data === "logout") {
               this.$router.push("/login");
        }
       
})
    }
  }
};
</script>

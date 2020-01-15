<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
          v-click-outside="closeSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
         <!--  <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
            >
              <label>Search...</label>
            </md-autocomplete>
          </div> -->
          <md-list>
            <md-list-item href="#/">
              <i
                class="zmdi zmdi-view-dashboard zmdi-hc-2x"
                style="color:black !important"
              ></i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <md-list-item class="dropdown" href="#/notifications">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i
                    class="zmdi zmdi-notifications zmdi-hc-2x"
                    style="color:black !important"
                  ></i>
                  <span class="notification">5</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Mike John responded to your email</a></li>
                  <li><a href="#">You have 5 new tasks</a></li>
                  <li><a href="#">You're now friend with Andrew</a></li>
                  <li><a href="#">Another Notification</a></li>
                  <li><a href="#">Another One</a></li>
                </ul>
              </drop-down>
            </md-list-item>
            <md-list-item class="dropdown" href="#">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i
                    class="zmdi zmdi-account zmdi-hc-2x"
                    style="color:black !important"
                  ></i>
                  <p class="hidden-lg hidden-md">User</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <a href="#/user"><i class="fas fa-user"></i> Profile </a>
                  </li>
                  <li>
                    <a href="#/addSuperUser"
                      style="s"><i class="fas fa-user-plus"></i> Add SuperUser</a
                    >
                  </li>
                  <hr />
                  <li>
                    <a href="#" @click="logout"
                      ><i class="fas fa-power-off"></i> Log out</a
                    >
                  </li>
                </ul>
              </drop-down>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import router from "../../routes/routes";
import axios from "axios"
export default {
  data() {
    return {
      selectedEmployee: null,
      reload:'',
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
created: function() {

    this.load();
    this.reload = setInterval(this.load, 1000)

} ,
     
  methods: {
    load(){
      axios.post("/user/protected",{withCredentials: true} )
.then(res=>{
 
  if (res.data === "go") {
          
          return
        }
        this.$router.push("/login");
})
.catch(err=>{
  this.$router.push("/login");
})  
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    closeSidebar() {
      this.$sidebar.displaySidebar((this.$sidebar.showSidebar = false));
    },
    logout() {
      axios.post("/user/logout",{withCredentials: true} )
  .then(res=>{
 
  if (res.data == "logout") {
           this.$router.push("/login");
           // clearInterval(this.reload)
        }
       
})
    }
}  ,    
  beforeDestroy () {

       clearInterval(this.reload)
    
}     
   
   
  
}

</script>

<style lang="css">
.md-toolbar .dropdown-menu li > a:hover, .md-toolbar .dropdown-menu li > a:focus {

background-color:black !important;
}

</style>

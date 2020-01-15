<template>
  <ul class="nav nav-mobile-menu">
    <!-- <li>
      <md-field>
        <label>Search</label>
        <md-input v-model="search" type="text"></md-input>
      </md-field>
    </li>
     <li>
     <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <i class="zmdi zmdi-view-dashboard"></i>
        <p>Dashboard</p></a
      >
    </li>
		<li>
		<drop-down>
			<a slot="title" class="dropdown-toggle" data-toggle="dropdown">
			<i class="zmdi zmdi-notifications-active"></i>
			<span class="notification">5</span>
			<p>Notifications</p>
			</a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">Mike John responded to your email</a></li>
          <li><a href="#">You have 5 new tasks</a></li>
          <li><a href="#">You're now friend with Andrew</a></li>
          <li><a href="#">Another Notification</a></li>
          <li><a href="#">Another One</a></li>
        </ul>
      </drop-down>
    </li>
    <li>
      <md-list-item class="dropdown" href="#">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="zmdi zmdi-account zmdi-hc-2x" style="color:black !important"></i>                  
                  <p class="hidden-lg hidden-md">User</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#/user"><i class="fas fa-user"></i> Profile </a></li>
                  <li><a href="#/addSuperUser"><i class="fas fa-user-plus"></i> Add SuperUser</a></li>
                 <hr>
                  <li><a href="#" @click="logout"><i class="fas fa-power-off"></i> Log out</a></li>
                </ul>
              </drop-down>
            </md-list-item>
      
    </li>-->
  </ul>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      employees: [
        "Sheja eddy",
        "Muhoza yves",
        "Niyobuhungiro yves",
        "Shema fred",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  }
};
</script>

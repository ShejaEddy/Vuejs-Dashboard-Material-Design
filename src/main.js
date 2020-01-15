// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/build/css/mdb.css";
// import VueRouter from "vue-router";
import App from "./App";

// router setup
import router from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";


import Axios from 'axios'


Vue.prototype.$Chartist = Chartist;
// import store from './store'
Vue.use(require("vue-cookies"))
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  // store,
  data: {
    Chartist: Chartist
  }
});

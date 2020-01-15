import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import School from "@/pages/School.vue";
import Company from "@/pages/Company.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/pages/Login.vue";
import addSuperUser from "@/pages/addSuperUser.vue";
import addSchool from "@/pages/addSchool.vue";
import addCompany from "@/pages/addCompany.vue";
import axios from "axios"

Vue.use(Router);
let router = new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      redirect: "/dashboard",
      mode: "history",
      children: [
        {
          path: "/dashboard",
          name: "Dashboard",
          component: Dashboard,
          meta: {    requiresAuth: true   }
        },
        {
          path: "user",
          name: "User Profile",
          component: UserProfile,
          meta: {    requiresAuth: true   }
        },
        {
          path: "addCompany",
          name: " Add  Bus Company",
          component: addCompany,
          meta: {    requiresAuth: true   }
        },
        {
          path: "addSchool",
          name: " Add  School",
          component: addSchool,
          meta: {    requiresAuth: true   }
        },
        {
          path: "addSuperUser",
          name: "addSuperUser",
          component: addSuperUser,
          meta: {    requiresAuth: true   }
        },
        {
          path: "School",
          name: " School",
          component: School,
          meta: {    requiresAuth: true   }
        },
        ,
        {
          path: "company",
          name: " Company",
          component: Company,
          meta: {    requiresAuth: true   }
        },
        {
          path: "typography",
          name: "Typography",
          component: Typography,
          meta: {    requiresAuth: true   }
        },
        {
          path: "icons",
          name: "Icons",
          component: Icons,
          meta: {    requiresAuth: true   }
        },
        {
          path: "maps",
          name: "Maps",
          meta: {
            hideFooter: true
          },
          component: Maps,
          meta: {    requiresAuth: true   }
        },
        {
          path: "notifications",
          name: "Notifications",
          component: Notifications,
          meta: {    requiresAuth: true   }
        }
      ]
    },

    {
      path: "/login",
      name: "Login",
      component: Login, 
      beforeEnter (to, from, next) {
    axios.post("/user/protected",{withCredentials: true} )
.then(res=>{
  
  if (res.data === "go") {
          next('/')
          return
        }
        next()
})
.catch(err=>{
  next()
})
  }
    }
  ]
});

router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
axios.post("/user/protected",{withCredentials: true} )
.then(res=>{
  
  if (res.data === "go") {
          next()
          return
        }
        next('/login')
})
.catch(err=>{
  next('/login')
})
        
      } else {
        next()
      }
    })

export default router 
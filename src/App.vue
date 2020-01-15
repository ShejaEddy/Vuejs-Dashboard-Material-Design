<template>
  <router-view></router-view>
</template>

<script>
import routes from "./routes/routes";
export default {
  name: "App",
  mounted(){
  // window.onpopstate = event =>{
  //   if(this.$cookies.get("Dashboard")!==null){
  //       this.$router.push("/")
  //   }else{

  //       this.$router.push("/login")
  // }
  //   }
}
//  && this.$route.path == "/login"
};
</script>

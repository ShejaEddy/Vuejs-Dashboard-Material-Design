<template>
  <div>
    <md-content class="md-scrollbar">
    <md-table v-model="items" :table-header-color="tableHeaderColor" style="width:100% !important">
      <md-table-row slot="md-table-row" slot-scope="{ item }" style="width:100% !important">
        <!-- <md-table-cell md-label="ID">{{ item.Nid }}</md-table-cell> -->
        <md-table-cell md-label="Company Name">{{ item.fullname }}</md-table-cell>
        <md-table-cell md-label="Company Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Company Number">{{ item.phonenumber }}</md-table-cell>
        <md-table-cell md-label="Invitation Status">{{ item.acceptInvitation }}</md-table-cell>

      </md-table-row>
        <!-- <md-bottom-bar md-sync-route>
        <md-bottom-bar-item to="/components/bottom-bar" exact md-label="Home" md-icon="home"></md-bottom-bar-item>
        <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Posts" md-icon="/assets/icon-whatshot.svg"></md-bottom-bar-item>
        <md-bottom-bar-item to="/components/bottom-bar/favorites" md-label="Favorites" md-icon="favorite"></md-bottom-bar-item>
      </md-bottom-bar> -->
    </md-table>
     </md-content>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      reload:'',
     selected: [],
     items:[]
    };
  },

    mounted() {
   
    this.pull();
    // this.reload = setInterval(this.pull, 1000)
   },
 updated(){
   this.pull();
 },
  methods: {
    newUser() {
      router.push("/addCompany")
    },
    pull(){
      axios
      .get("/api/get/company", {withCredentials: true})
      .then(result => {
        this.items = result.data;
        for (var a = 0; a < result.data.length; a++) { 
        // this.items[a].Nid = a + 1;         
          if (result.data[a].acceptInvitation === 1) {
            this.items[a].acceptInvitation = "approved";
          }
          if (result.data[a].acceptInvitation === 0) {
            this.items[a].acceptInvitation = "pending...";
          }
        }
      });
    }
},
  beforeDestroy () {

       clearInterval(this.reload)
    
}
}
</script>

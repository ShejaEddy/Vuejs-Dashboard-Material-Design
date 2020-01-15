<template>
  <div>
    <md-table v-model="items" :table-header-color="tableHeaderColor" class="w-100">
      <md-table-row slot="md-table-row" slot-scope="{ item }" class="w-100">
        <!-- <md-table-cell md-label="ID">{{ item.Nid }}</md-table-cell> -->
        <md-table-cell md-label="Company Name">{{ item.fullname }}</md-table-cell>
        <md-table-cell md-label="Company Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Company Number">{{ item.phonenumber }}</md-table-cell>
        <md-table-cell md-label="Invitation Status">{{ item.acceptInvitation }}</md-table-cell>

      </md-table-row>
      
    </md-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "schools",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
     selected: [],
     items: {
        fullname: "",
        email: "",
        Nid:'',
        acceptInvitation: ""        
      },
      reload:''
    }
  },

  mounted() {
    this.pull()
    
  },
  updated(){
    this.pull()
  },
  methods: {
    newUser() {
      router.push("/addSchool")
    },
    pull(){
      axios
      .get("/api/school", {withCredentials: true})
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
      })
      // .catch(err => alert(err));
    }
   
  }
}
</script>

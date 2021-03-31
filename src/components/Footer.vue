<template>
  <v-footer
    dark
    padless
    app
    absolute
  >
  
    <v-card
      class="flex"
      flat
      tile
    >
    
      <v-card-title color="#242424">
           <v-btn
              @click.stop = "infoDialog = true"
              color="#979797"
              fab
              x-small
              dark
            >
              <v-icon class="mdi mdi-exclamation-thick" color="secondary"></v-icon>
            </v-btn>
            
        <v-speed-dial
          class = "ma-auto"
          v-model="fab"
          >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="primary"
              dark
              fab>
                
              <v-icon  class="mdi mdi-close" color="black" v-if="fab"></v-icon>

              <v-icon class="mdi mdi-plus" color="black" v-else></v-icon>

            </v-btn>
          </template>
        

<!--ADD CATEGORY BUTTON IN SPEED DIAL -->

          <v-btn
            small
            dark
            rounded
            color="primary"
            class="black--text"
            @click.stop="categoryDialog = true"
            > <span color="black"> Add Category </span>
          </v-btn>

<!--ADD MEETING BUTTON IN SPEED DIAL -->

          <v-btn
            dark
            small
            rounded
            color="primary"
            class="black--text"
            @click.stop="meetingDialog = true"
          >Add Meeting
          </v-btn>
        </v-speed-dial>

<!--DIALOG FOR ADD CATEGORY-->
<v-dialog
    v-model="categoryDialog"
    max-width="290"
    persistent
    >
     <v-card
     dark>
     <form
         @submit.prevent="submitCategory"
         autocomplete="off">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                
                  v-model = "addCategory"
                  label="Category Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn
            color="primary"
            text
            @click="categoryDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            type = "submit"
            color="primary"
            :disabled = "!addCategory"
            @click="categoryDialog = false"
            text
          >
            Enter
          </v-btn>
        </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
<!--DIALOG FOR ADD MEETING -->
    <v-dialog
    v-model="meetingDialog"
    max-width="290"
    max-height = "400"
    persistent
    >
     <v-card
     dark>
     
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Meeting Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Meeting Link or ID"
                  required
                ></v-text-field>
              </v-col>
              
              <v-col
                v-if = "enabled"
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Meeting Passcode"
                  required
                ></v-text-field>
              </v-col>
               <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-switch
                  v-model="enabled"
                  color= "primary"
                  label = "Enable Passcode"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn
            color="primary"
            text
            @click="meetingDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            text
          >
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-dialog
        v-model = "infoDialog"
        max-width="290"
        dark
      >
      <v-card>
        <v-card-title class="headline">
         Information
        </v-card-title>

        <v-card-text>
This application was developed by Relixr! To contact us, please email relixrteam@gmail.com. Thank you!

              <v-switch
                  v-model="enabled"
                  color= "primary"
                  label = "Enable Dark Mode"
                ></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            text
            @click="infoDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
import InfoModal from "./InfoModal"

export default {
  components: {
    InfoModal
  },
  data() {
    return {
     infoDialog: false,
      categoryDialog: false,
      meetingDialog: false,
      addCategory:null,
      enabled: false,
      submitCategory(e){
        e.preventDefault()   
        const newCategory = {
            name: this.addCategory,
            meetings: []
        }
        this.$emit('add-category', newCategory)
        
        this.addCategory = ""
      }
    }
  }
}
</script>
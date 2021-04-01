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
    max-width="320"
    persistent
    >
     <v-card
     dark>
     <form
         @submit.prevent  = "submitCategory"
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
               <v-col
               class = "pt-1 mt-1"
                cols="12"
                sm="6"
                md="4"
              >
               <v-alert
                v-if = "categoryExistsError"
                dense
                outlined
                type="error"
              >
                Category exists
              </v-alert>
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
      max-width="320"
      persistent
    >
   <form
         @submit.prevent  = "submitMeeting"
         autocomplete="off">
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
                  class="pt-1 mt-1"
                  v-model = "addMeetingName"
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
                  v-model = "addMeetingID"
                  class="pt-1 mt-1"
                  label="Meeting Link or ID"
                  required
                ></v-text-field>
              </v-col>
              
              <v-col
                v-if = "passwordEnabled"
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model = "addMeetingPasscode"
                  class="pt-1 mt-1"
                  label="Meeting Passcode"
                  required
                ></v-text-field>
              </v-col>
              
               <v-col
                cols="12"
                sm="6"
                md="4"
              >

            <v-select
              v-model = "categorySelect"
              class="pt-1 mt-1"
              :items = "categories"
              item-text = "name"
              item-value = categoryID++ 
              label="Category"
              dense
              dark
              ></v-select>
               </v-col>
               <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-switch
                  class="pt-1 mt-1"
                  v-model="passwordEnabled"
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
            type = "submit"
            text
          >
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
   </form>
    </v-dialog>
      <v-dialog
        v-model = "infoDialog"
        max-width="320"
        dark
      >
      <v-card>
        <v-card-title class="headline">
         Information
        </v-card-title>

        <v-card-text>
        This application was developed by Relixr! Contact email: relixrteam@gmail.com
              <v-switch
                  v-model="passwordEnabled"
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
  props:{
    categories: Array 
  },
  data() {
    return {
      categoryExistsError: false, 
      categoryID: 0, 
      infoDialog: false,
      categoryDialog: null,
      meetingDialog: false,
      addMeetingName: null, 
      addMeetingID: null,
      addMeetingPasscode: null, 
      addCategory:null,
      categorySelect: null, 
      passwordEnabled: false,

      submitCategory(e){
        const newCategory = {
            name: this.addCategory,
            meetings: []
        }

        for(let i = 0; i<this.categories.length; i++) {
            if(this.categories[i].name == this.addCategory) {
              console.log("Category exists")
              this.categoryExistsError = true 
              break
            }else{
              this.categoryExistsError = false
            }
          }

        if (!this.categoryExistsError) {
            this.$emit('add-category', newCategory)
            this.addCategory = ""
            this.categoryExistsError = false 
            this.categoryDialog = false
        }
        else{
            this.addCategory = ""
        }
      },

      submitMeeting(e) {
        e.preventDefault()
        let indexName =  this.categorySelect; 
        
        const newMeeting = {
            zoomName: this.addMeetingName, 
            zoomLink: this.addMeetingID,
            zoomPass: this.addMeetingPasscode
        }

        this.$emit('add-meeting', {indexName: indexName, meeting: newMeeting})
        this.addMeetingName = ""
        this.addMeetingID = ""
        this.addMeetingPasscode = ""
        this.meetingDialog = false
      }
        
    }
  }
}
</script>
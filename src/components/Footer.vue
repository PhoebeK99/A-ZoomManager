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
              color="#979797"
              fab
              x-small
              dark
            >
              <v-icon color="secondary">mdi-exclamation-thick</v-icon>
            </v-btn>
            
        <v-speed-dial
          class = "ma-auto"
          v-model="fab"
          :direction="direction"
          >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="primary"
              dark
              fab>
                
              <v-icon color="black" v-if="fab">
                mdi-close
              </v-icon>

              <v-icon color="black" v-else>
                mdi-plus
              </v-icon>

            </v-btn>
          </template>
        

<!--ADD CATEGORY BUTTON IN SPEED DIAL -->

          <v-btn
            dark
            small
            rounded
            color="primary"
            @click.stop="categoryDialog = true"
            >Add Category
          </v-btn>

<!--ADD MEETING BUTTON IN SPEED DIAL -->

          <v-btn
            dark
            small
            rounded
            color="primary"
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
        <v-card-title>
          <span class="headline">Add Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Category Name"
                  rules="required"
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
            color="primary"
            text
            @click="categoryDialog = false"
          >
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--DIALOG FOR ADD MEETING -->
    <v-dialog
    v-model="meetingDialog"
    max-width="290"
    persistent
    >
     <v-card
     dark>
        <v-card-title>
          <span class="headline">Add Meeting</span>
        </v-card-title>
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
                  rules="required"
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
                  rules="required"
                  required
                ></v-text-field>
              </v-col>

              
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Meeting Passcode"
                  rules="required"
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
            @click="meetingDialog = false"
          >
            Cancel
          </v-btn>
          
          <v-btn
            color="primary"
            text
            @click="meetingDialog = false"
          >
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
import Modal from "./Modal"
  export default {
    data() {
      return{
        categoryDialog: false,
        meetingDialog: false
      }
    }
  }
</script>
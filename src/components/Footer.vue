<template>
  <v-footer dark padless app absolute>
    <v-card class="flex" flat tile>
      <v-card-title color="#242424">
        <InfoModal />

        <v-speed-dial class="mx-auto" v-model="fab">
          <template v-slot:activator>
            <v-btn v-model="fab" color="primary" dark fab>
              <v-icon class="mdi mdi-close" color="black" v-if="fab"></v-icon>
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
          >
            <span color="black"> Add Category </span>
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
        <AddCategoryModal
          :categoryDialog="categoryDialog"
          :addCategory="addCategory"
          :categories="categories"
          @close-add-cat-modal="categoryDialog = false"
          @add-category="submitCategory"
        />

        <!--DIALOG FOR ADD MEETING -->
        <v-dialog v-model="meetingDialog" max-width="320" persistent>
          <form @submit.prevent="submitMeeting" autocomplete="off">
            <v-card dark>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="pt-1 mt-1"
                        v-model="addMeetingName"
                        label="Meeting Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="addMeetingID"
                        class="pt-1 mt-1"
                        label="Meeting Link or ID"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col v-if="passwordEnabled" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="addMeetingPasscode"
                        class="pt-1 mt-1"
                        label="Meeting Passcode"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="categorySelect"
                        class="pt-1 mt-1"
                        :items="categories"
                        item-text="name"
                        item-value="categoryID++"
                        label="Category"
                        dense
                        dark
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-switch
                        class="pt-1 mt-1"
                        v-model="passwordEnabled"
                        color="primary"
                        label="Enable Passcode"
                      ></v-switch>
                    </v-col>
                    <v-col  v-if="meetingIDError" cols="12" sm="6" md="4">
                      <v-alert
                        dense
                        outlined
                        type="error"
                      >
                        Invalid Meeting ID
                      </v-alert>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="meetingDialog = false">
                  Cancel
                </v-btn>

                <v-btn color="primary" type="submit" text>
                  Enter
                </v-btn>
              </v-card-actions>
              
            </v-card>
          </form>
        </v-dialog>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
import InfoModal from './InfoModal';
import AddCategoryModal from './AddCategoryModal';

export default {
  components: {
    InfoModal,
    AddCategoryModal,
  },
  props: {
    categories: Array,
  },
  data() {
    return {
      categoryID: 0,
      categoryDialog: null,
      meetingDialog: false,
      addMeetingName: null,
      addMeetingID: null,
      addMeetingPasscode: null,
      addCategory: null,
      categorySelect: null,
      passwordEnabled: false,

      submitMeeting() {
        let indexName = this.categorySelect;
        console.log(this.addMeetingID.length);
        this.meetingIDError = false;
        if (this.addMeetingID.length === 11) {
          const newMeeting = {
            zoomName: this.addMeetingName,
            zoomLink: this.addMeetingID,
            zoomPass: this.addMeetingPasscode,
          };
          this.$emit('add-meeting', {
            indexName: indexName,
            meeting: newMeeting,
          });
          this.addMeetingName = '';
          this.addMeetingID = '';
          this.addMeetingPasscode = '';
          this.meetingDialog = false;
          this.meetingIDError = false;
        } else {
          this.meetingIDError = true;
          console.log('This is not a valid ID');
        }
      },
    };
  },
  methods: {
    submitCategory(categoryObj) {
      this.$emit('add-category', categoryObj);
    },
  },
};
</script>

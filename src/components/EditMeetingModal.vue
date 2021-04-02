<template>
  <v-dialog v-model="editMeetingDialog" max-width="320" persistent>
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
              <v-col v-if="meetingIDError" cols="12" sm="6" md="4">
                <v-alert dense outlined type="error">
                  Invalid Meeting ID
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeModal">
            Cancel
          </v-btn>

          <v-btn color="primary" type="submit" text>
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditMeetingDialog',
  props: {
    editMeetingDialog: Boolean,
    categories: Array,
  },
  data() {
    return {
      addMeetingName: null,
      addMeetingID: null,
      addMeetingPasscode: null,
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
          this.meetingIDError = false;
          this.$emit('close-edit-meeting-modal');
        } else {
          this.meetingIDError = true;
          console.log('This is not a valid ID');
        }
      },
    };
  },
  methods: {
    closeModal: function() {
      this.$emit('close-edit-meeting-modal');
    },
  },
};
</script>

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
        <!--:addCategory="addCategory"-->
        <AddCategoryModal
          :categoryDialog="categoryDialog"
          :categories="categories"
          @close-add-cat-modal="categoryDialog = false"
          @add-category="submitCategory"
        />

        <!--DIALOG FOR ADD MEETING -->
        <AddMeetingModal
          :meetingDialog="meetingDialog"
          :categories="categories"
          @close-add-meeting-modal="meetingDialog = false"
          @add-meeting="submitMeeting"
        />
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
import InfoModal from './InfoModal';
import AddCategoryModal from './AddCategoryModal';
import AddMeetingModal from './AddMeetingModal';

export default {
  components: {
    InfoModal,
    AddCategoryModal,
    AddMeetingModal,
  },
  props: {
    categories: Array,
  },
  data() {
    return {
      //categoryID: 0, // not used?
      categoryDialog: null, // addCatModal
      meetingDialog: false,
      //addMeetingName: null,
      //addMeetingID: null,
      //addMeetingPasscode: null,
      //addCategory: null, // addCatModal
      //categorySelect: null,
      //passwordEnabled: false,
    };
  },
  methods: {
    submitCategory(categoryObj) {
      this.$emit('add-category', categoryObj);
    },
    submitMeeting({ indexName, newMeeting }) {
      this.$emit('add-meeting', {
        indexName,
        newMeeting,
      });
    },
  },
};
</script>

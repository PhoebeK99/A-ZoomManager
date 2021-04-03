<template>
  <v-app app>
    <v-main style="max-height: 575px">
      <v-card :height="575" :width="400" app color="#121212" dark>
        <v-list
          style="max-height: 500px"
          class="overflow-y-auto"
          color="#121212"
          app
        >
          <v-list-group
            color="white"
            v-for="category in categories"
            :key="category.name"
            v-model="category.active"
            :prepend-icon="category.action"
            absolute
          >
            <template v-slot:activator>
              <v-list-item-title
                class="ma-2 font-weight-medium title"
                color="primary"
                v-text="category.name"
              ></v-list-item-title>
              <v-spacer></v-spacer>
                <v-btn icon>
                <v-icon @click.stop="editMeetingDialog = true" light
                  >mdi-pencil</v-icon
                >
                <EditMeetingModal
                :categories="categories"
                :editMeetingDialog="editMeetingDialog"
                @close-edit-meeting-modal="editMeetingDialog = false"
                />
              </v-btn>
            </template>

            <v-list-item
              v-for="meeting in category.meetings"
              :key="meeting.zoomName"
              class="ma-3"
              app
            >
         <v-btn outlined color="primary" @click = "openLink(meeting.zoomLink)"  v-text="meeting.zoomName">
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon @click.stop="editMeetingDialog = true" light
                  >mdi-pencil</v-icon
                >
                <EditMeetingModal
                :categories="categories"
                :editMeetingDialog="editMeetingDialog"
                @close-edit-meeting-modal="editMeetingDialog = false"
                />
              </v-btn>
            </v-list-item>
          </v-list-group>
        </v-list>
        <Footer
          :categories="categories"
          @add-category="pushCategory"
          @add-meeting="pushMeeting"
        />
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Footer from '../components/Footer';
import EditMeetingModal from "../components/EditMeetingModal";

export default {
  name: 'App',
  components: {
    Footer,
    EditMeetingModal
  },
  data() {
    return {
      categories: [],
      editMeetingDialog: false,
    };
  },
  methods: {
    editMeeting({ meeting, index }) {
      console.log('Needs functionality');
      // let i = this.categories[index].meetings.indexOf(meeting)
      // this.categories[index].meetings.splice(i, 1)
    },
    deleteCategory(obj) {
      let i = this.categories.indexOf(obj);
      this.categories.splice(i, 1);
    },
    pushMeeting({ indexName, meeting }) {
      let index;
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name == indexName) {
          index = i;
          break;
        }
      }
      this.categories[index].meetings = [...this.categories[index].meetings,meeting];
    },
    pushCategory(categoryObj) {
      this.categories = [...this.categories, categoryObj];
    },
    openLink(zoomLink){
      window.open(zoomLink);
    },
  },
  // This is the array for all the links.
  created() {
    this.categories = [
      {
        name: "Name's Meetings",
        meetings: [
          {
            zoomName: 'Zoom',
            zoomLink: 'https://google.com',
            zoomPass: '183923',
          },
        ],
      },
      {
        name: 'School Meetings',
        meetings: [
          {
            zoomName: 'Math Class',
            zoomLink: 'https://google.com',
            zoomPass: '183923',
          },
        ],
      },
    ];
  },
  emits: ['delete-meeting', 'delete-category', 'add-meeting', 'add-category'],
};
</script>

<style scoped>
v-list {
  height: 500px;
  overflow-y: auto;
}
</style>

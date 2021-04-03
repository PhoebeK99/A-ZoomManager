<template>
  <v-app app>
    <v-main style="max-height: 575px">
      <v-card :height="575" :width="400" app color="#121212" dark shaped>
        <v-list
          subheader
          tile
          style="max-height: 500px"
          color="#121212"
          app
        >
          <v-list-group
            color="white"
            no-action
            sub-group
            :value = "true"
            v-for="category in categories"
            :key="category.name"
            v-model="category.active"
            absolute
          >
            <template v-slot:activator expand>
              <v-list-item-title
                class="font-weight-medium title"
                color="primary"
                v-text="category.name"
              ></v-list-item-title>
              <v-spacer></v-spacer>
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
              class="ma-1 pl-10"
              app
            >
         <v-btn outlined color="primary" @click = "openLink(meeting.zoomLink)"  v-text="meeting.zoomName">
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon @click.stop="editMeetingDialog = true" light color="primary"
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
        name: "My Meetings",
        meetings: [
          {
            zoomName: 'Zoom',
            zoomLink: 'https://google.com',
            zoomPass: '183923',
          },
            {
            zoomName: 'Zoom meeting ',
            zoomLink: 'https://google.com',
            zoomPass: '183923',
          },
            {
            zoomName: 'Zoom Meeting 3',
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

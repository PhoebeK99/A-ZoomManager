<template>
  <v-app app>
    <v-main style="max-height: 550px">
      <v-card :height="550" :width="400" app color="#121212" dark>
        <v-list
          style="max-height: 450px"
          class="overflow-y-auto"
          color="#121212"
          app
        >
          <v-list-group
            color="white"
            v-for="(category, index) in categories"
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
            </template>

            <v-list-item
              v-for="meeting in category.meetings"
              :key="meeting.zoomName"
              class="ma-3"
              app
            >
              <v-btn outlined color="primary" v-text="meeting.zoomName">
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon @click.stop="edit({ meeting, index })" light
                  >mdi-pencil</v-icon
                >
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
export default {
  name: 'App',
  components: {
    Footer,
  },
  data() {
    return {
      categories: [],
    };
  },
  //Thes methods will be used by the h
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
      //console.log(meeting)
      //console.log(indexName)
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name == indexName) {
          // __FOUND is set to the index of the element
          index = i;
          break;
        }
      }
      this.categories[index].meetings = [
        ...this.categories[index].meetings,
        meeting,
      ];
    },
    //was called through navbar.vue, and pushed in x, x was an object with two elements. Name, and meetings[]
    pushCategory(categoryObj) {
      this.categories = [...this.categories, categoryObj];
    },
  },
  // This is the array for all the links.
  created() {
    this.categories = [
      {
        name: "Name's Meetings",
        meetings: [
          {
            zoomName: 'asdf Class',
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
          {
            zoomName: 'Enlgihs Class',
            zoomLink: 'https://google.com',
            zoomPass: '183923',
          },
          {
            zoomName: 'Class',
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

<template>
  <v-btn icon>
    <v-icon @click.stop="openDialog(catIndex, meetIndex)" light color="primary"
      >mdi-pencil</v-icon
    >
  </v-btn>
</template>

<script>
export default {
  name: 'EditMeetingButton',
  props: {
    catIndex: Number,
    meetIndex: Number,
  },
  methods: {
    openDialog(catIndex, meetIndex) {
      this.$emit('open-edit-meeting-dialog', {
        catIndex: catIndex,
        meetIndex: meetIndex,
      });
    },
  },
};
</script>

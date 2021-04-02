<template>
  <div>
    <v-btn @click.stop="infoDialog = true" color="#979797" fab x-small dark>
      <v-icon class="mdi mdi-exclamation-thick" color="secondary"></v-icon>
    </v-btn>
    <v-dialog v-model="infoDialog" max-width="320" dark>
      <v-card>
        <v-card-title class="headline">
          Information
        </v-card-title>

        <v-card-text>
          This application was developed by Relixr! Contact email:
          relixrteam@gmail.com
          <v-switch
            v-model="passwordEnabled"
            color="primary"
            label="Enable Dark Mode"
          ></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="infoDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'infoModal',
  data() {
    return {
      infoDialog: false,
    };
  },
};
</script>

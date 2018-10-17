<template>
  <v-app
    id="inspire"
    dark
  >
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="">
          <v-list-tile-action>
            <img :src="getLogo(item.icon)" alt="caavo.js" title="Caavo">
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="grey darken-3" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img src="@/assets/icons/logo.svg" alt="caavo.js" title="Caavo">
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn
                slot="activator"
                :href="source"
                icon
                large
                target="_blank"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/YeRKwQ" target="_blank">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      items: [
        { icon: 'dish', text: 'Most Popular' },
        { icon: 'amazon', text: 'Subscriptions' },
        { icon: 'hbogo', text: 'History' },
        { icon: 'netflix', text: 'Playlists' },
        { icon: 'showtime', text: 'Watch Later' }
      ]
    }),
    methods: {
      getLogo(strIcon){
        return '@/assets/icons/' +strIcon +'.svg';
      }
    },
    props: {
      source: String
    }
  }
</script>
<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile v-for="item in items" :class="item.id == intSelectedServieId ? 'selected': ''"  :color="displayColor" :key="item.service" @click="validateAccess(item.service, item.text, item.id)">
          <v-list-tile-action>
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="grey darken-3" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img src="/img/icons/caavo/logo_grey.svg" alt="caavo.js" title="Caavo">
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field :append-icon-cb="() => {}" placeholder="Search..." single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <invalidAccount :serviceName="strServiceName" v-if="blnShowInvalidAccountAlert"/>
        <showSeriesEpisodes v-else-if="intSelectedSeries" :title="post"/>
          <v-flex v-else-if="strSelectedService == 'netflixusa' && strSelectedNetflixProfile == ''">
            <netflixProfile @update-netflix-profile="updateNetflixProfile" :arrProfiles="strNetflixProfiles" />
          </v-flex>
          <showListing @show-series="showSeriesEpisodes" v-else-if="strSelectedService" :strProfile="strProfile" :strService="strSelectedService"></showListing>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  //accounts data
  import objServices from './feeds/accounts.json'
  // Invalid Account Error Component
  import invalidAccount from './views/ConnectionAlert.vue'
  // Listing Component
  import showListing from './views/Listing.vue'
  // Netflix Profile Component
  import netflixProfile from './views/NetflixProfile.vue'
  // Series's episode Listing component
  import showSeriesEpisodes from './views/Series.vue'

  // import MugenScroll from 'vue-mugen-scroll'

  export default {
    components: { invalidAccount, showListing, netflixProfile, showSeriesEpisodes},
    data: () => ({
      drawer: true,
      // Available servies
      items: [
        { id: 1, icon: '', text: 'Dish', service: 'dishmexico'},
        { id: 2, icon: '', text: 'Amazon', service: 'amazon' },
        { id: 3, icon: '', text: 'HBO GO', service: 'hbogo' },
        { id: 4, icon: '', text: 'NETFLIX', service: 'netflixusa' },
        { id: 5, icon: '', text: 'Showtime Anytime', service: 'showtime' },
        { id: 6, icon: '', text: 'HULU', service: 'hulu' }
      ],
      objAccounts: objServices,
      strServiceName: '',
      intSelectedServieId: '',
      strSelectedService: '',
      hoverColor: 'white',
      displayColor: 'grey lighten-1',
      blnShowInvalidAccountAlert: false,
      strProfile:'',
      // Netflix's profiles
      strNetflixProfiles: [
        {
          name: "Dad",
          service: "netflix_dad"
        },
        {
          name: "Mom",
          service: "netflix_mom"
        },
        {
          name: "Stephen",
          service: "netflix_stephen"
        }
      ],
      strSelectedNetflixProfile: '',
      intSelectedSeries: '',
    }),

    methods: {
      /**
       * This function will validate a user credential using accounts api.
       * Show Invalid User Alert if user don't have access else show render show's listing componet for that service.
       * @strService    string    
       * @strServiceName  string
       * @intId         integer
       * @return  void
       */
      validateAccess(strService, strServiceName, intId){
        this.intSelectedServieId = intId;
        this.strServiceName = '';
        this.intSelectedSeries = '';
        this.strSelectedService = strService;
        for(let objAccount in this.objAccounts){
          if(this.objAccounts[objAccount].service == strService){
            this.blnShowInvalidAccountAlert = false;
            break;
          }
          else{
            this.blnShowInvalidAccountAlert = true;
          }
        }
        this.strServiceName = strServiceName;
        this.strProfile = this.strSelectedService;
        if(this.strSelectedService == 'netflixusa' && this.strSelectedNetflixProfile != ''){
          this.strProfile = this.strSelectedNetflixProfile;
        }
      },

      /**
       * To update selected profile of for netflix.
       */
      updateNetflixProfile(strService){
        this.strSelectedNetflixProfile = strService;
        this.validateAccess('netflixusa', 'NETFLIX');
      },

      /**
       * It will update intSelecteSeries to render  Serie's episodes listing if a series id is being valid.
       * @intSeriesId     integer
       */
      showSeriesEpisodes(intSeriesId){
        this.intSelectedSeries = intSeriesId;
        console.log(this.intSelectedSeries);
      }
    }
  }
</script>

<style scoped>
  .selected{
    background-color: #545454;
  }
</style>

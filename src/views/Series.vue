<template>
    <div>
        <label style="color: #BDBDBD;"><h1>{{detail.title}}</h1></label>
        <v-tabs centered dark icons-and-text>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="season in detail.seasons" :key="season.season_number" :href="'#season-' +season.season_number">
            Season {{ season.season_number }}
            </v-tab>

            <v-tab-item v-for="season in detail.seasons" :id="'season-' + season.season_number" :key="'season-' +season.season_number">
            <v-card flat>
                <showListing :strService="season.episodes"></showListing>
            </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
// Listing Component to show listing of episodes
import showListing from './Listing.vue'
export default {
    components: { showListing },
    data(){
        return {
            detail: {},
            series_id: '',
        }
    },
    created(){
        // Series Id for which episodes will be litsed
        this.series_id = this.$route.params.id;
        // Fetch Series Detail
        this.detail = {
            'title': "Dexter",
            'seasons': [
                {
                    season_number: 3,
                    episodes: "dexter_se3"
                },
                {
                    season_number: 2,
                    episodes: "dexter_se2"
                },
                {
                    season_number: 1,
                    episodes: "dexter_se1"
                }
            ]
        }
    }
}
</script>

<style scoped>
    #season-3 div{
        background-color: #303030;
    }
    #season-2 div{
        background-color: #303030;
    }
    #season-1 div{
        background-color: #303030;
    }
</style>

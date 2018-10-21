<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 v-if="intDetailComponentId !== post.id" :key="index" v-for="(post, index) in posts">
            <v-list dense three-line style="background-color: #303030;">
                <v-list-tile @click="" @mouseover="setDetailComponent(post.id)">
                <v-list-tile-content>
                    <v-list-tile-title>
                    <h2>{{ getTitle(post) }}</h2>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        <span > {{getFirstAttribute(post)}} </span> 
                        <span v-if="post.show_type != 'OT'"> {{getSecondAttribute(post)}} </span>
                        <span> {{strTime(post.run_time)}} </span>
                        <span> Rating: {{post.id%5}} </span>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-flex>
        <v-flex v-else xs12 sm10 offset-sm1>
            <v-card :color="strCardColor" :class="strTextColor">
                <v-layout row>
                    <v-flex xs7>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{getTitle(post)}}</div>
                                <div class="detail">
                                    <span> {{getFirstAttribute(post)}} </span> 
                                    <span v-if="post.show_type != 'OT'"> {{getSecondAttribute(post)}} </span>
                                    <span> {{strTime(post.run_time)}} </span>
                                </div>
                                <div style="height: 80px;">{{post.description[0].program_description.length > 235? post.description[0].program_description.substr(0,234) + '.....' : post.description[0].program_description}}</div>
                                <div>
                                    <v-btn @click="post.show_type == 'SN'?showSeasons(post.series_id):startVideoPlayer(post.id)" depressed small color="grey lighten-4" class="grey--text text--darken-2">
                                        {{post.show_type == 'SN'? 'Viwe Episodes': 'Watch'}}
                                    </v-btn>
                                </div>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs5>
                        <v-img :src="getImageUrl(post)" height="175px" aspect-ratio="1.778" contain></v-img>
                        <div class="text-xs-center">
                            <v-rating color="lime lighten-1" background-color="grey lighten-3" readonly :value="(post.id%5)"></v-rating>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <mugen-scroll :handler="getPosts" :should-handle="!loading"></mugen-scroll>
    </v-layout>
</template>

<script>
    // MugenScroll: Tp update listing on scrolling
    import MugenScroll from 'vue-mugen-scroll'
    // Iport Service's Data
    import jsonAmazon from './../feeds/amazon.json'
    import jsonHulu from './../feeds/hulu.json'
    import jsonNetflixDad from './../feeds/netflix_dad.json'
    import jsonNetflixMom from './../feeds/netflix_mom.json'
    import jsonNetflixStephen from './../feeds/netflix_stephen.json'
    import objSE3 from './../feeds/dexter_season_3_episodes.json'
    import objSE2 from './../feeds/dexter_season_2_episodes.json'
    import objSE1 from './../feeds/dexter_season_1_episodes.json'

    export default {
        // strService will have name of service for which listing will be shown
        props: ['strService', 'strProfile', 'blnSeriesListing'],
        components: { MugenScroll },
        data() {
            return {
                objData:{
                    amazon: jsonAmazon,
                    hulu: jsonHulu,
                    netflix_dad: jsonNetflixDad,
                    netflix_mom: jsonNetflixMom,
                    netflix_stephen: jsonNetflixStephen,
                    dexter_se3: objSE3,
                    dexter_se2: objSE2,
                    dexter_se1: objSE1
                },
                objPassedData: [],
                posts: [],
                intCurrent: 0,
                intDetailComponentId: '',
                loading: false,
                intTotal: 0,
                intRecordsPerPage: 10,
                intPageNumber: 0,
                objSeasonData: [],
                strTextColor: 'lime--text text--accent-2',
                strCardColor: "light-green accent-4",
            }
        },

        created(){
            this.setCardColor();
            this.objSeasonData = this.objData[this.strProfile];
            this.intTotal = this.objSeasonData.length;
            this.getPosts();
        },

        watch: {
            strProfile: function(val){
                this.setCardColor();
                this.objSeasonData = this.objData[val];
                this.posts = [];
                this.getPosts();
            }
        },

        methods: {
            // Get Listing Data
            getPosts() {
                if(this.posts.length == 0){
                    this.intPageNumber = 0;
                }
                if(this.objSeasonData.length > 0){
                    if(this.intRecordsPerPage * this.intPageNumber < this.intTotal){
                        this.loading = true;
                        let intStart = this.intPageNumber * this.intRecordsPerPage;
                        let intEnd = ((this.intPageNumber+1) * this.intRecordsPerPage);
                        intEnd = intEnd > this.intTotal? this.intTotal: intEnd;
                        for (let intCount = intStart; intCount < intEnd; intCount++) {
                            if(typeof this.objSeasonData[intCount] != 'undefined'){
                                this.posts[intCount] = this.objSeasonData[intCount];
                            }
                        }
                        this.intPageNumber++;
                        this.loading = false
                    }
                }
            },
            // To set a card color based on services
            setCardColor(){
                switch(this.strService){
                    case 'hulu':
                        this.strCardColor = 'teal accent-1';
                        this.strTextColor = 'purple--text text--lighten-2';
                        break;
                    case 'netflixusa':
                        this.strCardColor = 'deep-orange accent-3';
                        this.strTextColor = 'amber--text text--accent-1';
                        break;
                    default: 
                        this.strCardColor = 'light-green accent-4';
                        this.strTextColor = 'lime--text text--accent-2';
                        break;

                }
            },
            // Conver post time to hh:mm:ss format
            strTime(intTime){
                let intSeconds = ('0' + (intTime%60)).slice(-2);
                let intMinutes = Math.floor(intTime/60);
                let intHours = Math.floor(intMinutes/60);
                intMinutes = ('0' + (intMinutes%60)).slice(-2);
                return intHours +':' +intMinutes +':' +intSeconds;
            },
            // Get Button Text based on Show Type
            getViewButton(){
                let strWatchButton = 'Watch';
                if(this.strShowType == 'SN'){
                    strWatchButton = 'Show Episodes';
                }
                return strWatchButton
            },
            // On hover show more detail of a show
            setDetailComponent(intId){
                this.intDetailComponentId = intId;
            },
            // Returns Image Url of a show
            getImageUrl(objPost){
                return objPost.images.length? objPost.images[0].url: '/img/icons/caavo/no-image.jpg';
            },
            // Start video player
            startVideoPlayer(intPostId){
                console.log('Playing show id: ' +intPostId);
            },
            // To show listing of series's episodes update selected series id to parent.
            showSeasons(intSeriesId){
                if(intSeriesId == 2040884){
                    this.$emit('show-series', intSeriesId);
                }
                else{
                    console.log('Series detail not available.');
                }
            },
            // Return First attribute of line 2
            getFirstAttribute(post){
                if(post.show_type == 'SE'){
                    return 'S' +post.episode_season_number +'/E' + post.episode_number;
                }
                return post.release_year
            },

            getSecondAttribute(post){
                if(post.show_type == 'SE' && this.blnSeriesListing == 1){
                    if(post && post.air_date && post.air_date[0].date){
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        return post.air_date[0].date.substr(6,2) +' ' +months[post.air_date[0].date.substr(4,2)] +' ' + post.air_date[0].date.substr(0,4);
                    }
                }
                else if(post.show_type == 'SE'){
                    return '"' +post.original_episode_title +'"';
                }
                
                return post.movie_type
            },
            // Returns title of a show.
            getTitle(post){
                if(post.show_type == 'SN'){
                    return post.long_title +': SEASON ' +post.season_number;
                }
                else if(post.show_type == 'SE' && this.blnSeriesListing==1){
                    return post.original_episode_title
                }
                return post.long_title;
            }
        }
    }
</script>

<style>
    .v-list__tile__sub-title span{
        margin-right: 25px;
    }

    .detail span{
        margin-right: 25px;
    }
</style>

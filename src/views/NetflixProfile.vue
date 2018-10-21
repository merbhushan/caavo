<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
            <v-card>
                <v-card-title primary-title>
                <div style="width: 100%">
                    <div class="headline">Select Profile</div>
                    <div >
                        <v-layout row>
                            <v-flex :key="profile.service" xs4 sm2 style="text-align: center;" v-for="profile in arrProfiles">
                                <a @click="updateNetflixProfile(profile.service)">
                                    <v-avatar color="teal">
                                        <span class="white--text headline">{{getFirstCharcter(profile.name)}}</span>
                                    </v-avatar>
                                    <div style="color: white;">{{profile.name}}</div>
                                </a>
                            </v-flex>
                        </v-layout>
                    </div>
                </div>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['arrProfiles'],
    methods:{
        getFirstCharcter(strName){
            return strName.substr(0,1).toUpperCase();
        },
        updateNetflixProfile(strService){
            this.$emit('update-netflix-profile', strService);
        }
    }
}
</script>

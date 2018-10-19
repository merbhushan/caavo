<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
            <v-card color="light-green accent-4" class="lime--text text--accent-2">
                <v-layout row>
                    <v-flex xs7>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{strTitle}}</div>
                                <div class="detail">
                                    <span> {{intReleasedYear}} </span> 
                                    <span> {{strNetwork}} </span>
                                    <span> {{strTime}} </span>
                                </div>
                                <div>{{strDescription}}</div>
                                <div>
                                    <v-btn depressed small color="grey lighten-4" class="grey--text text--darken-2">
                                        View Episode <v-icon right dark></v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs5>
                        <v-img :src="strImgUrl" height="175px" aspect-ratio="1.778" contain></v-img>
                        <div class="text-xs-center">
                            <v-rating color="lime lighten-1" background-color="grey lighten-3" readonly v-model="intRating"></v-rating>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            strTitle: "Women Behind Bars",
            intReleasedYear: 2011,
            strDescription:  "Testing Description",
            intTime: 1800,
            intRating:3,
            strNetwork: "Amazon",
            strImgUrl: 'http://cps-static.rovicorp.com/2/Open/Comedy_Central_8/Program/19155491/_3by4/_derived_jpg_q90_444x444_m0/19155491_SC_2-3Workaholics.jpg'
        }
    },

    computed: {
        strTime(){
            let intSeconds = ('0' + (this.intTime%60)).slice(-2);
            let intMinutes = Math.floor(this.intTime/60);
            let intHours = Math.floor(intMinutes/60);
            intMinutes = ('0' + (intMinutes%60)).slice(-2);
            return intHours +':' +intMinutes +':' +intSeconds;
        }
    }

}
</script>

<style scoped>
    .detail span{
        margin: 15px;
    }
</style>

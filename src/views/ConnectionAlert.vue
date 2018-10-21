<template>
    <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm8 offset-sm-1>
            <v-card>
                <v-card-title primary-title>
                    <div style="width: 100%">
                        <v-layout>
                            <v-flex xs11>
                                <h3 class="headline mb-0">Authentication Error</h3>
                            </v-flex>
                            <v-flex xs1 justify-end>
                                <img src="/img/icons/caavo/logo.svg" style="width: 45px;" alt="caavo" title="Caavo">
                            </v-flex>
                        </v-layout>
                        <div>
                            Failed to fetch your <b>{{ serviceName }}</b> list due to wrong credentials. <br> Do you want to modify it now?
                        </div>
                    </div>
                </v-card-title>

                <v-card-actions>
                    <v-layout xs12 justify-end="">
                        <v-btn flat color="">Later</v-btn>
                        <v-btn flat color="">Modify</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['serviceName']
}
</script>

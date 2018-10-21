import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VTooltip,
  VTextField,
  VCard,
  VImg,
  VDivider,
  VRating,
  VAvatar,
  VTabs,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

const MY_ICONS = {
  'view_show': 'fas fa-eye'
}

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTooltip,
    VTextField,
    VCard,
    VImg,
    VDivider,
    VRating,
    VAvatar,
    VTabs,
    transitions
  },
  customProperties: true,
  icons: MY_ICONS,
  iconfont: 'md',
})

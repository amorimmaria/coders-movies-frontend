<template>
  <v-navigation-drawer :value="drawer" app clipped>
    <v-list dense>
      <v-list-item @click="activeLogin()">
        <v-list-item-avatar>
          <img
            :src="
              `https://d1bvpoagx8hqbg.cloudfront.net/259/eb0a9acaa2c314784949cc8772ca01b3.jpg`
            "
            alt=""
          />
        </v-list-item-avatar>
        <v-list-item-title
          v-text="
            credentials && credentials.user && credentials.user.username
              ? credentials.user.username
              : 'Entre ou cadastre-se'
          "
        />
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in itemsMenu"
        :key="item.text"
        link
        :to="item.to"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout()">Sair</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    itemsMenu: [
      { icon: 'mdi-trending-up', text: 'Most Popular', to: '/config' },
      {
        icon: 'mdi-youtube-subscription',
        text: 'Subscriptions',
        to: '/config',
      },
      { icon: 'mdi-history', text: 'History', to: '/config' },
      { icon: 'mdi-playlist-play', text: 'Playlists', to: '/config' },
      { icon: 'mdi-clock', text: 'Watch Later', to: '/config' },
    ],
  }),
  computed: mapState(['drawer', 'credentials']),
  methods: {
    activeLogin() {
      this.$store.commit('setLoginDialog', true)
    },
    logout() {
      this.$store.commit('setCredentials', null)
      localStorage.removeItem('credentials')
    },
  },
}
</script>

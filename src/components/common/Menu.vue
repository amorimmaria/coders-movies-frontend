<template>
  <v-navigation-drawer :value="drawer" app clipped color="#232323">
    <v-list dense>
      <v-list-item @click="accessLoginOrDetails()">
        <v-list-item-avatar>
          <img
            :src="
              `https://d1bvpoagx8hqbg.cloudfront.net/259/eb0a9acaa2c314784949cc8772ca01b3.jpg`
            "
            alt
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

      <v-divider />

      <v-list-item v-for="item in itemsMenu" :key="item.text" link :to="item.to">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="$store.getters.getPermissionAdm" link to="/users/list">
        <v-list-item-action>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Usuários</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-if="credentials" v-slot:append>
      <div class="pa-2">
        <v-btn block color="#55aedf" @click="logout()">Sair</v-btn>
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
    accessLoginOrDetails() {
      if (
        this.credentials &&
        this.credentials.user &&
        this.credentials.user.username
      ) {
        this.$router.push({ name: 'user' }).catch(() => {})
      } else {
        this.$store.commit('setAuthDialog', true)
      }
    },
    logout() {
      this.$store.commit('setCredentials', null)
      localStorage.removeItem('credentials')
    },
  },
}
</script>

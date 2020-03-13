<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <v-list-item
        v-for="item in itemsAvatar"
        :key="item.text"
        link
        @click="navToLogin()"
      >
        <v-list-item-avatar>
          <img
            :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
            alt=""
          />
        </v-list-item-avatar>
        <v-list-item-title v-text="item.text" />
      </v-list-item>
      <v-list-item v-for="item in itemsMenu" :key="item.text" link>
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
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    itemsMenu: [
      { icon: 'mdi-trending-up', text: 'Most Popular' },
      { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
      { icon: 'mdi-history', text: 'History' },
      { icon: 'mdi-playlist-play', text: 'Playlists' },
      { icon: 'mdi-clock', text: 'Watch Later' },
    ],
    itemsAvatar: [{ picture: 28, text: 'Joseph' }],
  }),
  methods: {
    navToLogin() {},
  },
}
</script>

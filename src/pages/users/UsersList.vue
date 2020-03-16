<template>
  <div>
    <Permission
      v-if="
        !credentials ||
          !credentials.user ||
          credentials.user.user_type !== 'admin'
      "
    />
    <div v-else>
      <PageTitle image="usuarios" main="Usuários" sub="" />

      <b-row>
        <Search />
        <TopButton />
      </b-row>

      <Table />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Permission from '../../components/common/Permission'
import PageTitle from '../../components/common/PageTitle'
import Table from '../../components/users/users-list/Table'
import Search from '../../components/users/users-list/Search'
import TopButton from '../../components/users/users-list/TopButton'

export default {
  components: { PageTitle, Table, TopButton, Search, Permission },
  data() {
    return {}
  },
  computed: mapState(['credentials']),
}
</script>

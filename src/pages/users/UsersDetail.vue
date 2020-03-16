<template>
  <div>
    <b-table-simple hover small caption-top stacked dark>
      <b-tbody>
        <b-tr>
          <b-th rowspan="3" class="text-center">Dados de {{ user.name }}</b-th>
          <b-th stacked-heading="City" class="text-left">Antwerp</b-th>
          <b-td stacked-heading="Clothes: Trousers">56</b-td>
          <b-td stacked-heading="Clothes: Skirts">22</b-td>
          <b-td stacked-heading="Clothes: Dresses">43</b-td>
          <b-td stacked-heading="Accessories: Bracelets" variant="success"
            >72</b-td
          >
          <b-td stacked-heading="Accessories: Rings">23</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  props: { id: { type: Number, default: 0 } },
  data: () => ({
    user: {},
  }),
  created() {
    this.getUser()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getUser() {
      const auth = this.$store.getters.getAuth

      try {
        const response = await axios(
          `http://localhost:3000/admusers/${this.$route.params.id}`,
          auth
        )

        this.user = response.data

        this.user.user_type === 'admin'
          ? (this.isAdmin = true)
          : (this.isAdmin = false)
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }
    },
  },
}
</script>

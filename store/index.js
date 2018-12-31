export const state = () => ({

  data: null,

})

export const actions = {

  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('getServerData')
  },

  // axios...
  async getServerData({ commit }) {
    const { data } = await this.$axios.get(`${process.env.API}/get/all`)
    commit('setServerData', data)
  },

}

export const mutations = {

  increment (state) {
    state.counter++
  },

  setServerData(state, data) {
    state.data = data
  }

}

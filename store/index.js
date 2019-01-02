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
    const { data } = await this.$axios.get(`${process.env.API}/get/all/installed`)
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


export const getters = {

  mapFiltered: state => {

    const colors = {
      community: '#823B93',
      culture: '#F89F34',
      moving: '#FDD729',
      music: '#89C54C',
      school: '#00A09B',
      nostalgia: '#DA519C',
      water: '#009EE0',
      uninstalled: '#CCC'
    };

    let data = state.data.codes.data;
    let filtered = {};

    for (let i in data){
      if (data[i][0].artist_name){
        let theme = data[i][0].theme
        let color = data[i][0].installed > 0 ? colors[theme] : colors.uninstalled;

        data[i][0].original_theme = theme;
        data[i][0].theme_color = color ;
        data[i][0].theme_class = `theme-${theme}`;

        filtered[i] = data[i];
      }
    }

    return filtered;
  }
}

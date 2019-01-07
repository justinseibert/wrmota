export const state = () => ({

  data: null,
  index: -1,

})

export const actions = {

  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('getServerData')
  },

  // axios...
  async getServerData({ commit }) {
    const { data } = await this.$axios.get(`${process.env.API}/get/readable`)
    commit('setServerData', data.data)
  },

}

export const mutations = {

  index (state, index) {
    state.index = index;
  },

  setServerData(state, data) {
    state.data = data;
  }

}

export const getters = {

  filtered: state => {
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

    let data = state.data;

    let filtered = data.map(d => {

      return {
        ...d,
        ...{
          theme_color: d.installed > 0 ? colors[d.theme] : colors.uninstalled,
          theme_class: `theme-${d.installed > 0 ? d.theme : 'uninstalled'}`,
          audio: process.env.MEDIA + '/' + d.audio_directory + d.audio,
          image: {
            large: [
              process.env.MEDIA + '/' + d.image1_directory + d.image1 + '-large.' + d.image1_extension,
              process.env.MEDIA + '/' + d.image2_directory + d.image2 + '-large.' + d.image2_extension,
              process.env.MEDIA + '/' + d.image3_directory + d.image3 + '-large.' + d.image3_extension,
            ],
            medium: [
              process.env.MEDIA + '/' + d.image1_directory + d.image1 + '-medium.' + d.image1_extension,
              process.env.MEDIA + '/' + d.image2_directory + d.image2 + '-medium.' + d.image2_extension,
              process.env.MEDIA + '/' + d.image3_directory + d.image3 + '-medium.' + d.image3_extension,
            ],
            small: [
              process.env.MEDIA + '/' + d.image1_directory + d.image1 + '-small.' + d.image1_extension,
              process.env.MEDIA + '/' + d.image2_directory + d.image2 + '-small.' + d.image2_extension,
              process.env.MEDIA + '/' + d.image3_directory + d.image3 + '-small.' + d.image3_extension,
            ],
          },
          website: d.website ? 'http://' + d.website : false,
        }
      }
    });

    return filtered;
  },

  artistAlphaList: (state, getters) => {
    let original = getters.filtered;
    let combined = {};
    let list = [];

    original.forEach(d => {
      let address = {
        id: d.id,
        address: d.address,
        audio: d.audio,
        code: d.code,
        image: d.image,
        installed: d.installed,
        lat: d.lat,
        lng: d.lng,
        story: d.story,
        theme: d.theme,
        theme_color: d.theme_color,
        theme_class: d.theme_class
      }
      if (!combined[d.artist]){
        combined[d.artist] = {
          id: d.artist_id,
          name: d.artist,
          website: d.website,
          location: d.location,
          visitor: d.visitor,
          visible: false,
          addresses: [address]
        }
      } else {
        combined[d.artist].addresses.push(address);
      }
    });

    for (let artist in combined){
      list.push(combined[artist]);
    }

    list.sort((a,b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    return list;
  }
}

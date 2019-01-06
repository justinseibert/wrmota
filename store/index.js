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
    const { data } = await this.$axios.get(`${process.env.API}/get/readable`)
    commit('setServerData', data.data)
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
  },

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
          theme_class: `theme-${d.theme}`,
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

  codeFiltered: (state,getters) => {
    let original = getters.filtered;
    let filtered = {};

    original.forEach(data => {
      filtered[data.code] = data;
    });

    return filtered;
  },

  artistSort: (state, getters) => {
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

import * as types from '../constants/home';

const state = {
    commonDetail:{
        title:``,
        toLine:null
    }
}

const actions = {
    changeDetail({ commit }, type){
        commit(types.COMMON_DETAIL,type);
    }
}

const mutations = {
    [types.COMMON_DETAIL](state, type) {
        state.commonDetail = Object.assign(state.commonDetail,type);
    }
}

const getters = {
    commonDetail: state => state.commonDetail
}

export default  {
    state,
    actions,
    mutations,
    getters
}

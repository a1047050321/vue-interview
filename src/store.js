import Vue from 'vue'
import Vuex from 'vuex'
import mockGenerator from './mock'
import { _uuid, compare, getAverageNum } from './util'
Vue.use(Vuex)
const ADD_PAGE = 'ADD_PAGE'
// const GET_DATALIST = 'GET_DATALIST'
const GET_DATALIST_SUCCESS = 'GET_DATALIST_SUCCESS'
const LOADING = 'LOADING'
const SORT_DATA = 'SORT_DATA'
export default new Vuex.Store({
  state: {
    dataList: [],
    Page: 0,
    PageCount: 20,
    action: '',
    _uuid: _uuid(),
    TotalCount: 300
  },
  mutations: {
    [ADD_PAGE] (state) {
      state._uuid = _uuid()
      state.action = 'ADD_PAGE'
      state.stateIndex += 1
    },
    [GET_DATALIST_SUCCESS] (state, response) {
      state._uuid = _uuid()
      const { res, payload } = response
      state.action = 'GET_DATALIST_SUCCESS'
      if (payload) {
        const { Page, PageCount } = payload
        state.Page = Page
        state.PageCount = PageCount
        console.log(state.Page)
      }
      state.dataList = res
    },
    [LOADING] (state) {
      state._uuid = _uuid()
      state.action = 'LOADING'
    },
    [SORT_DATA] (state, payload) {
      state._uuid = _uuid()
      state.action = 'SORT_DATA'
      state.dataList = state.dataList.sort(compare(payload))
    }
  },
  getters: {
    getAverage: state => {
      let dataList = state.dataList
      return getAverageNum(dataList)
    },
    getData: state => state.dataList
  },
  actions: {
    getDataCall ({ commit, state }, payload) {
      commit(LOADING)
      // TODO
      let { Page, PageCount } = state
      if (payload) {
        Page = payload.Page
        PageCount = payload.PageCount
      }
      mockGenerator(Page * PageCount, (Page + 1) * PageCount).then(res => {
        commit(GET_DATALIST_SUCCESS, { res, payload })
      })
    },
    sortData ({ commit, state }, payload) {
      commit(LOADING)
      setTimeout(() => commit(SORT_DATA, payload), 1000)
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import mockGenerator from './mock'
import { _uuid, compare, getAverageNum } from './util'
Vue.use(Vuex)
const ADD_PAGE = 'ADD_PAGE'
const GET_DATALIST = 'GET_DATALIST'
const LOADING = 'LOADING'
const SORT_DATA = 'SORT_DATA'
export default new Vuex.Store({
  state: {
    dataList: [],
    stateIndex: 0,
    pageCount: 20,
    action: '',
    _uuid: _uuid()
  },
  mutations: {
    [ADD_PAGE] (state) {
      state._uuid = _uuid()
      state.action = 'ADD_PAGE'
      state.stateIndex += 1
    },
    [GET_DATALIST] (state, payload) {
      state._uuid = _uuid()
      state.action = 'GET_DATALIST'
      state.dataList = payload
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
    getDataCall ({ commit, state }) {
      commit(LOADING)
      // TODO
      console.log(state.stateIndex * state.pageCount)
      let num = state.stateIndex * state.pageCount
      if (num === 0) {
        mockGenerator(num).then(res => {
          commit(GET_DATALIST, res)
        })
      } else {
        mockGenerator(num, num + 20).then(res => {
          commit(GET_DATALIST, res)
        })
      }
    }
  }
})

<template>
  <div class="test">
    <div class='container' v-if='showMask'>
      <div class='mask'>
        <div class='loading'>loading...</div>
      </div>
    </div>
    <div class='button-wrapper'>
          <div class='button' @click="update">加载更多</div>
          <div class='button'  @click='showSortButton'>排序
          <div class='button-list' v-if='buttonShow'>
            <div @click='sort("id")'>序号</div>
            <div @click='sort("data")'>值</div>
            <div @click='sort("time")'>时间</div>
          </div>
          </div>
    </div>
    <div class='showAverage'>
      平均值: {{average}}
    </div>
    <div class='list'>
      <div>序号</div>
      <div>值</div>
      <div>时间</div>
    </div>
    <div class="list" v-for="item in dataList" :key="item.id">
      <div>{{item.id}}</div>
      <div>{{item.data}}</div>
      <div>{{item.time}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'test',
  data () {
    return {
      showMask: false,
      buttonShow: false,
      uuid: 0
    }
  },
  computed: {
    ...mapState({
      stateIndex: state => state.stateIndex,
      action: state => state.action
    }),
    ...mapGetters({
      average: 'getAverage',
      dataList: 'getData'
    })
  },
  watch: {
    action (val) {
      if (val === 'LOADING') {
        this.showMask = true
      } else {
        this.showMask = false
      }
    }
  },
  methods: {
    ...mapMutations([
      'ADD_PAGE',
      'SORT_DATA',
      'LOADING'
    ]),
    ...mapActions([
      'getDataCall'
    ]),
    update () {
      this.ADD_PAGE()
      this.getDataCall()
      this.buttonShow = false
    },
    sort (type) {
      this.LOADING()
      setTimeout(() => {
        this.SORT_DATA(type)
      }, 1000)
    },
    showSortButton () {
      this.buttonShow = !this.buttonShow
    }
  },
  mounted () {
    this.getDataCall()
  }
}
</script>

<style scoped lang="less">
.test{
  margin: 0 10px;
  border-bottom:1px solid #e3e3e3;
  .container{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,0.3);
  }
  .mask{
    position:absolute;
    left:50%;
    top:50%;
    .loading{
      position:absolute;
      width:100px;
      height:100px;
      line-height: 100px;
      left:-50px;
      top:-50px;
      color:#fff;
      // background-color: blue;
    }
  }
  .showAverage{
    padding:10px;
    text-align: right;
  }
  .list{
    display: flex;
    flex-direction: row;
      div{
        flex:1;
        padding:10px 0;
        border-right:1px solid #e3e3e3;
        border-top:1px solid #e3e3e3;
      }
      div:first-child{
        border-left:1px solid #e3e3e3;
      }
      div:last-child{
        flex:3;
      }
  }
  .button-wrapper {
    width:300px;
    display: flex;
    text-align:right;
    .button-list {
      position:absolute;
      color:#000;
      background-color: #fff;
      top:40px;
      border:1px solid #e3e3e3;
      left:0;
      div{
        width:130px;
        padding:5px;
        border-bottom:1px solid #e3e3e3;
        cursor: pointer;
      }
    }
    .button{
      flex:1;
      margin: 10px 10px 10px 0;
      background-color: #42b983;
      padding: 10px;
      text-align:center;
      font-size: 15px;
      color: white;
      width: 100%;
    }
    .button:last-child{
      position:relative;
      background-color: blue;
    }
  }
}

</style>

<template>
  <div class="test">
    <div class='container' v-if='showMask'>
      <div class='mask'>
        <div class='loading'>loading...</div>
      </div>
    </div>
    <div class='button-wrapper'>
          <div class='button' @click="update">加载更多</div>
    </div>
    <!-- <div class='showAverage'>

    </div> -->
    <div class='head'>
      <div v-for='(head, index) in headArr' :key='index' @click='sort(head.name,head["_selected"])'>
        <span>{{head.value}}</span>
        <span class='showSort'>
          <div class='notSelected' v-if='head["_selected"] == 0'></div>
          <div class='notSelected' v-if='head["_selected"] == 0'></div>
          <div class='sszSelected' v-if='head["_selected"] == 1'></div>
          <div class='nszSelected' v-if='head["_selected"] == -1'></div>
        </span>
      </div>
    </div>
    <div class="wrapper">
      <div class="list" v-for="item in dataList" :key="item.id">
        <div>{{item.id}}</div>
        <div>{{item.data}}</div>
        <div>{{changeDate(item.time)}}</div>
      </div>
    </div>
    <div class='pagenation'>
        <span>平均值: {{average}}</span>
        <span>当前页码：</span>
        <span>
          <img @click='updatePage("down")' src="https://s2.ax1x.com/2019/04/27/EuRikR.png" alt="EuRikR.png" border="0" />
          <span class='page'>{{Page + 1}}</span>
          <img @click='updatePage("up")' class src="https://s2.ax1x.com/2019/04/27/EuRnne.png" alt="EuRnne.png" border="0" />
        </span>
        <span>当前数据量：</span>
        <span>
          <select class='select' :value='PageCount' @change='updatePageCount'>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { changeDate } from './../util'
export default {
  name: 'test',
  data () {
    return {
      showMask: false,
      uuid: 0,
      headArr: [{
        name: 'id',
        value: '序号',
        '_selected': 0
      }, {
        name: 'data',
        value: '数据',
        '_selected': 0
      }, {
        name: 'time',
        value: '创建时间',
        '_selected': 0
      }]
    }
  },
  computed: {
    ...mapState({
      Page: state => state.Page,
      PageCount: state => state.PageCount,
      action: state => state.action,
      TotalCount: state => state.TotalCount
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
    },
    Page (val) {

    }
  },
  methods: {
    ...mapActions([
      'getDataCall',
      'sortData'
    ]),
    changeDate: (date) => {
      return changeDate(date)
    },
    refreshData (Page, PageCount) {
      this.getDataCall({
        Page,
        PageCount
      })
    },
    update () {
      let Page = this.Page + 1
      this.refreshData(Page, this.PageCount)
    },
    sort (name, type) {
      this.headArr.forEach(v => {
        if (v.name === name) {
          switch (type) {
            case 0:
            case -1:
              v['_selected'] = 1
              break
            case 1:
              v['_selected'] = -1
              break
          }
        } else {
          v['_selected'] = 0
        }
      })
      this.sortData({ name, type })
    },
    updatePageCount (e) {
      this.refreshData(this.Page, e.target.value)
    },
    updatePage (v) {
      if (typeof v === 'string') {
        let pageNum = v === 'down' ? this.Page - 1 : this.Page + 1
        if (pageNum >= 0) {
          this.refreshData(pageNum, this.PageCount)
        }
      }
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
  .container{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,0.3);
    z-index:99;
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
      transition: all 0.5s ease-in-out 1s;
    }
  }
  .showAverage{
    // padding: 10px;
    text-align: right;
    span {
      margin-left:20px;
    }
    .select {
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #fff;
      border: none;
      color: #42b983;
      padding-left: 10px;
    }
    img {
      vertical-align: middle;
    }
    input {
      width:40px;
      height:25px;
      padding-left: 10px;
      border-radius: 5px;
    }
  }
  .head {
    display: flex;
    background: #42b983;
    padding: 10px 0 ;
    color:#fff;
    div {
      flex:1;
    }
    div:last-child{
      flex: 3;
    }
    .showSort {
      position: relative;
      margin-left:10px;
      div {
        width: 14px;
        height: 14px;
      }
      .notSelected:first-child {
        position: absolute;
        top: 0;
        left:0;
        background-image :url('https://s2.ax1x.com/2019/04/27/EKazD0.png');
        background-size:cover;
      }
      .notSelected:nth-child(2) {
        position: absolute;
        top: 7px;
        left: 0;
        background-image :url('https://s2.ax1x.com/2019/04/27/EKaXgs.png');
        background-size:cover;
      }
      .sszSelected {
        position: absolute;
        top: 0;
        left:0;
        background-image :url('https://s2.ax1x.com/2019/04/27/EKwlwV.png');
        background-size:cover;
      }
      .nszSelected {
        position: absolute;
        top: 7px;
        left:0;
        background-image :url('https://s2.ax1x.com/2019/04/27/EKw0w6.png');
        background-size:cover;
      }
    }
  }
  .wrapper {
    position: absolute;
    top: 177px;
    bottom: 60px;
    left: 18px;
    right:18px;
    overflow-x: hidden;
    border-bottom: 1px solid #e3e3e3;
    .list{
      display: flex;
      flex-direction: row;
      z-index:9;
        div{
          flex:1;
          font-size:14px;
          padding: 10px 0;
          border-right: 1px solid #e3e3e3;
          border-top: 1px solid #e3e3e3;
        }
        div:first-child{
          border-left: 1px solid #e3e3e3;
        }
        div:last-child{
          flex: 3;
        }
    }
  }
  .pagenation {
    position : fixed;
    bottom: 0;
    left:0;
    right:0;
    height: 60px;
    line-height: 60px;
    padding-right:20px;
    text-align: right;
    span:not(.page) {
      margin-left: 20px;
    }
    .page{
      padding: 0 10px;
    }
    .select {
      width: 60px;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      background: transparent;
      border: none;
      color: #dac4b9;
      padding-left: 10px;
    }
    img {
      vertical-align: middle;
    }
    input {
      width:40px;
      height:25px;
      padding-left: 10px;
      border-radius: 5px;
    }
  }
  .button-wrapper {
    width:200px;
    display: flex;
    text-align:right;
    .button{
      flex:1;
      margin: 0 10px 10px 0;
      background-color: #42b983;
      padding: 8px 10px;
      text-align:center;
      font-size: 15px;
      color: white;
      border-radius: 5px;
    }
  }
}

</style>

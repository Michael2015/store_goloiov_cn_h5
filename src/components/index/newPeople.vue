<template>
  <div v-if="newObj.length != 0 && is_show">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="news_box">
          <div v-for='(item,index) in filterList(poplist,"hidden")' :key='index'>
            <div class="header">
            <span>{{item.label}}</span>
            <img src="~img/closeTip.png" @click="close" />
          </div>
          <div class="main"> 
            <img :src="item.img_url" @click='toSeek(item.jump_url)'/>
          </div>
          <div class="footer">
            <button @click='toSeek(item.jump_url)'>去看看</button>
            <button @click='next'>下一条</button>
          </div>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import tojump from "mixins/tojump";
import showHide from "mixins/show-hide";
import popup from "ui/popup";
import { getNowDate } from "lib";
export default {
  props: {
    newObj: {
      type: Array
    },
    is_fisrt_pop: {
      type: Boolean
    }
  },
  data() {
    return {
      is_show: false,
      poplist:[],
      current:0,
    };
  },
  computed: {
    ...mapState(["isLogin", "isFirst"]),
    filterList(){
      return (arr,hidden)=>{
       return arr.filter(item=>{
          return !item[hidden]
        })
      }
    }
  },
  methods: {
    ...mapMutations(["setFirst"]),
    toSeek(args){
      this.$router.push(args);
    },
    next(){
     if(this.current===this.poplist.length-1){
       this.current=0;
     }else{
        this.current++;
     }
      for(var i in this.poplist){
        if(this.current===Number(i)){
          this.poplist[i].hidden=false;
        }
        else{
          this.poplist[i].hidden=true;
        }
      }
    },
    close() {
      this.is_show = false;
    },
    goBay() {
      localStorage.setItem("new_people_pop_" + getNowDate(), 1); //记录时间
      this.tojump(this.newObj[0].jump_url);
      this.close();
    },
    show(callback) {
      callback().then(res => {
       console.log(res);
       this.poplist=res.map((item,index)=>{
         return{
           ...item,
           hidden:index===0?false:true
         }
       });
       this.current=0;
       if(res.length){
         this.is_show=true;
       }
      });
    }
  },
  mixins: [showHide, tojump],
  components: {
    popup
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.news_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: size(600);
  min-height: size(300);
  background: white;
  .header {
    display: flex;
    justify-content: space-between;
    padding: size(30) 0;
    margin: 0 size(30);
    border-bottom: size(2) solid whitesmoke;
    font-size: size(28);
    align-items: center;
    img {
      width: size(40);
    }
  }
  .main{
    margin: size(30);
    img{
      width: 100%;
      height: size(400);
    }
  }
  .footer{
    display: flex;
    button:focus{
      outline: 0;
    }
    button{
      width: 50%;
      height: size(70);
      font-size: size(28);
    }
    button:nth-of-type(1){
      background: rgba(240,240,240,1);
      color: rgba(217,0,27,1);
    }
    button:nth-of-type(2){
      background: rgba(217,0,27,1);
      color: white;
    }
  }
  .close {
    width: size(50);
    position: absolute;
    right: 0;
    top: size(70);
  }
  .new_bg {
    width: size(536);
  }
  .new_msg {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: size(467);
    .discount {
      color: #ff9f0e;
      text-align: center;
      font-size: size(32);
      margin-top: size(38);
      > span {
        color: #ff6815;
        font-size: size(38);
      }
    }
    .discount_name {
      color: #ff6815;
      font-size: size(36);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .discount_time {
      font-size: size(32);
      color: #ff9f0e;
      margin-top: size(14);
    }
  }
  .gobaybtn {
    width: size(360);
    height: size(88);
    position: absolute;
    right: size(90);
    bottom: size(6);
    border-radius: size(88);
  }
}
</style>
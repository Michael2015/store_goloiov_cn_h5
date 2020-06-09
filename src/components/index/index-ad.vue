<template>
  <div class="ad">
    <div class="chepu">
      <img :src="getAdPosition(list,1).icon" @click='toGo($event,getAdPosition(list,1))'/>
    </div>
    <div class="ad-main">
<div class="path1">
<div class="ad1"><img :src="getAdPosition(list,2).icon" @click='toGo($event,getAdPosition(list,2))'/></div>
<div class="path3">
<div class="ad2"><img :src="getAdPosition(list,4).icon" @click='toGo($event,getAdPosition(list,4))'/></div>
<div class="path4">
<div class="ad3"><img :src="getAdPosition(list,5).icon" @click='toGo($event,getAdPosition(list,5))'/></div>
<div class="ad4"><img :src="getAdPosition(list,6).icon" @click='toGo($event,getAdPosition(list,6))'/></div>
</div>
</div>
</div>
<div class="path2">
<div class="ad5"><img :src="getAdPosition(list,3).icon" @click='toGo($event,getAdPosition(list,3))'/></div>
<div class="ad6"><img :src="getAdPosition(list,7).icon" @click='toGo($event,getAdPosition(list,7))'/></div>
</div>
</div>
  </div>
</template>
<script>
import { getAdv } from "api";
export default {
  data() {
    return {
      list:[]
    };
  },
  computed:{
    getAdPosition(){
      return (arr,n)=>{
        var crr=arr.filter(item=>item.position===n);
        return crr.length?crr[0]:{icon:''}
      }
    }
  },
  created() {
getAdv(2).then(data => {
     // console.log(data);
      if (data) {
        this.list = data;
      }
    });
  },
  methods: {
    toGo(e,item){
     // console.log(item)
      let {kind,url} =item;
      switch (kind) {
          case 1:
          case 2:
          case 3:
            this.$router.push(url);
            break;
          case 5:
            window.location.href = decodeURIComponent(url);
            break;
          default:
            break;
        }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.ad {
  .chepu {
    text-align: center;
    position: relative;
    height: size(146);
    margin: size(5) size(20) size(16);
    img {
      width: 100%;
      height: size(146);
    }
    span {
      position: absolute;
      width: 100%;
      height: size(80);
      font-size: size(40);
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: size(80);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .ad-main{
width: 100%;
height: size(602);
display: flex;
flex-direction: column;
box-sizing: border-box;
padding: 0 size(20) size(20);
img{
  width: 100%;
  height: 100%;
}
}
.path1{
width: 100%;
height: size(430);
margin-bottom: size(8);
display: flex;
box-sizing: border-box;
}
.path2{
width: 100%;
height: size(120);
margin-top: size(8);
display: flex;
box-sizing: border-box;
}
.ad1,.path3{
width: 50%;
height: 100%;
}
.ad2,.path4{
width: 100%;
height: 50%;
}
.ad3,.ad4{
width: 50%;
height: 100%;
}
.ad5,.ad6{
width: 50%;
height: 100%;
}
.ad1{
margin-right: size(8);
}
.path3{
margin-left: size(8);
display: flex;
box-sizing: border-box;
flex-direction: column;
}
.ad2{
margin-bottom: size(8);
}
.path4{
margin-top: size(8);
display: flex;
box-sizing: border-box;
}
.ad3{
margin-right: size(8);
}
.ad4{
margin-left: size(8);
}
.ad5{
margin-right: size(8);
}
.ad6{
margin-left: size(8);
}
}
</style>
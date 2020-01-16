<template>
  <div class="focus">
    <li class="foucs-tiem" v-for="(item,index) in list" :key="index" @click="rediect_cate(item.id,item.cate_name)">
      <img v-lazy="item.pic" />
      <label>{{item.cate_name}}</label>
    </li>
     <div class="clearfix"></div>
  </div>
</template>
<script>
import { getCategory } from "api";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    getCategory().then(data => {
      if (data) {
        this.list = data;
      }
    });
  },
  methods:{
    rediect_cate(cate_id,cate_name)
    {
      if(cate_name == '油卡充值' || cate_name == 'VIP服务商')
      {
          this.$router.push({path:'/blank'});
      }else
      {
          this.$router.push({path:'/search',query:{cate_id:cate_id}});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.focus {
  padding: 0 size(20);
  .foucs-tiem {
    list-style: none;
    float: left;
    width: 21%;
    margin: 2% 2% size(20);
    text-align: center;
    img {
      width: 80%
    }
    label{
      text-align: center;
      height: size(50);
      line-height: size(50);
      width: 100%;
      display: inline-block;
      font-size: size(25);
    }
  }
  .clearfix:after{
    content: "";
    display: table;
    clear:both;
  }
}
</style>
<template>
  <div class="list">
    <div class="item" v-for="item in 2" :key="item">
      <div class="head table">
        <div class="avatar"><img src="" alt=""></div>
        <div class="name"><div>我是昵称</div></div>
        <div class="star">
          <div>
            <span></span>
          </div>
        </div>
      </div>
      <div class="text">
        我是评论的内容我是评论的内容我是评论的内容我是评论的内
容我是评论的内容，我是评论的内容。我是评论的内容我是评
我是评论的内容我是评论的内容我是评论的内容论的内容
      </div>
      <div class="imgs">
        <div><div><img src="" alt=""></div></div>
      </div>
      <div class="time">2019-06-30</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.list{
  background-color: $color-body-bg;
}
.item{
  margin-bottom: size(20);
  padding: size(30) size(30) size(36);
  background: #fff;
}
.head{
  height: size(80);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .avatar{
    width: size(80);
    background: #ddd;
    img{
      display: block;
      width: 100%;
      height: size(80);
      border-radius: 50%;
    }
  }
  .name{
    padding-left: size(20);
    font-size: size(30);
    >div{
       @include txt-overflow;
    }
  }
  .star{
    width: size(188);
    text-align: right;
    font-size: 0;
    span{
      display: inline-block;
      width: size(30);
      height: size(30);
      margin-right: 2px;
      @include bg('~img/icon/star.png');
    }
  }
}
.text{
  margin: size(22) 0;
  font-size: size(26);
  line-height: 1.6;
}
.imgs{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  >div{
    width: 31%;
    background: #ddd;
    >div{
      padding-bottom: 100%;
      position: relative;
      margin-bottom: size(20);
    }
    img{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
.time{
  font-size: size(24);
  color: #999;
  line-height: size(32);
  margin-top: size(38);
}
</style>
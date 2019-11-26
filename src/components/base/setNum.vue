<template>
  <div v-show="isShow">
    <popup-goods @mask-click="hide">
      <div class="mask_box" @click.stop>
        <div class="close" @click="hide">
          <img src="~img/closeTip.png" alt="">
        </div>
        <div class="good_msg">
          <img v-if="info.slider_image" :src="sku_img || info.slider_image[0]" alt />
          <div class="show_price">
            <div
              class="price"
            >价格：¥{{price}}</div>
            <div class="setter">{{attr_sku ? '已选: ' +attr_sku : '请选择规格属性'}}</div>
          </div>
        </div>
        <div v-for="(overitem,overindex) in skuLists" :key="overindex">
          <div class="title">{{overitem.attr_name}}</div>
          <div class="selectIcon">
            <div
              class="icon"
              :class="[subIndex[overindex] == index?'active':'']"
              v-for="(sukitem,index) in overitem.attr_values"
              :key="index"
              @click="specificationBtn(sukitem, overindex, $event, index)"
            >{{sukitem}}</div>
          </div>
        </div>
        <div class="title num_t">数量</div>
        <div class="setcount">
          <div class="reduce" @click="reduce">-</div>
          <input class="count" type="number" v-model="total_num" />
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </popup-goods>
  </div>
</template>

<script>
import showHide from "mixins/show-hide";
import popupGoods from "ui/popup-goods";
import { Toast } from "lib";
import { mapState } from "vuex";
export default {
  components: {
    popupGoods
  },
  mixins: [showHide],
  data() {
    return {
      isShow: false,
      total_num: 1,
      info: {
        newbornzone: {}
      },
      skuLists: [],
      difference: {},
      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
      price: "", //选中规格的价钱
      attr_sku: '',
      sku_img:'',
      sku_unique: ''
    };
  },
  methods: {
    reduce() {
      if (this.total_num <= 1) {
        return;
      }
      this.total_num = --this.total_num;
    },
    add() {
      if (this.info.newbornzone.is_newborn) {
        if (this.total_num + 1 > this.info.newbornzone.limit_num) {
          Toast(`最多下单${this.info.newbornzone.limit_num}个`);
          return;
        }
      }
      this.total_num = ++this.total_num;
    },
    show(info) {
      this.isShow = true;
      this.info = info;
      this.price = this.role=== 0 ? info.price:info.vip_price
      this.skuLists = info.attr;
      this.difference = info.attr_value;
      this.initSku();
    },
    // 初始化sku
    initSku() {
      for (var i in this.difference) {
        //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
        this.shopItemInfo[this.difference[i].suk] = this.difference[i];
      }
      this.checkItem();
    },
    specificationBtn(item, n, event, index) {
      var self = this;
      if (self.selectArr[n] != item) {
        self.selectArr[n] = item;
        self.subIndex[n] = index;
      } else {
        self.selectArr[n] = "";
        self.subIndex[n] = -1; //去掉选中的颜色
      }
      self.checkItem();
    },
    checkItem() {
      var self = this;
      var option = this.skuLists;
      let obj = {}
      var result = []; //定义数组储存被选中的值

      for (var i in option) {
        result[i] = self.selectArr[i] ? self.selectArr[i] : "";
      }
      for (var i in option) {
        var last = result[i]; //把选中的值存放到字符串last去
        for (var k in option[i].attr_values) {
          result[i] = option[i].attr_values[k]; //赋值，存在直接覆盖，不存在往里面添加name值
          // option[i].attr_values[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
        }
        result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时被覆盖
      }
      // console.log(this.shopItemInfo[result])
      if (this.shopItemInfo[result]) {
        let data = this.shopItemInfo[result];
        this.price = data.price || "";
        this.attr_sku = data.suk;
        this.sku_img = data.image;
        this.sku_unique = data.unique;
      }
      self.$forceUpdate(); //重绘
    },
    isMay: function(result) {
      for (var i in result) {
        if (result[i] == "") {
          return true; //如果数组里有为空的值，那直接返回true
        }
      }
      return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    }
  },
  computed: {
    ...mapState(["role"])
  },
  watch: {
    total_num(v) {
      if (this.info.newbornzone.is_newborn) {
        if (v > this.info.newbornzone.limit_num) {
          Toast(`最多下单${this.info.newbornzone.limit_num}个`);
          this.total_num = this.info.newbornzone.limit_num;
          return;
        }
      }
      if (v > 50) {
        Toast("最多下单50个");
        this.total_num = 50;
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.mask_box {
  background: #fff;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  border-radius: size(30) size(30) 0 0;
  padding: size(36) size(30) size(100) size(30);
  .close{
    position: absolute;
    width: size(50);
    height: size(50);
    top: size(10);
    right: size(10);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .good_msg {
    display: flex;
    > img {
      width: size(196);
      height: size(196);
      border-radius: size(4);
      margin-right: size(20);
    }
    .show_price {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .price {
        font-size: size(28);
        color: #fe0000;
        line-height: size(35);
        padding-bottom: size(20);
      }
      .setter {
        font-size: size(28);
        color: #333333;
        line-height: size(35);
      }
    }
  }
  .title {
    font-size: size(28);
    line-height: size(35);
    color: #4b4b4b;
    margin-top: size(42);
    &.num_t{
      padding-top: size(20);
      border-top: 1px solid #ddd;
    }
  }
  .selectIcon {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .icon {
      height: size(70);
      line-height: size(70);
      border-radius: size(6);
      border: size(1) solid #7f7f7f;
      padding: 0 size(25);
      color: #363636;
      font-size: size(24);
      margin: size(12) size(30) 0 0;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .active {
      color: #fe0000;
      border: size(1) solid #fe0000;
    }
    .noneActive {
      color: #666;
      background: #ccc;
    }
  }
  .setcount {
    width: size(220);
    height: size(60);
    line-height: size(60);
    display: flex;
    justify-content: space-between;
    font-size: size(28);
    border-radius: size(2);
    margin-top: size(12);
    box-sizing: border-box;
    .add,.reduce {
      height: size(60);
      width: size(60);
      line-height: size(60);
      text-align: center;
      color: #696969;
      border: size(1) solid #878787;
      box-sizing: content-box;
    }
    .count {
      height: size(60);
      flex: 1;
      text-align: center;
      color: #363636;
      border-top: size(1) solid #878787;
      border-bottom: size(1) solid #878787;
      box-sizing: content-box;
      padding: 0;
      border-radius: 0;
    }
  }
}
</style>
<template>
  <div class="info">
    <div class="left">
      <div class="top">{{getFloat(product_price,2)}}</div>
      <div class="bot">
        <span>+2.00</span>
        <span>+2.40%</span>
      </div>
    </div>
    <div class="right">
      <div>
        <span class="label">成交量（日/总）</span>
        <span class="value">11/1000</span>
      </div>
      <div>
        <span class="label">成交额（日/总）</span>
        <span class="value">1200.60/1.12万</span>
      </div>
      <div>
        <span class="label">价&emsp;格（低/高）</span>
        <span class="value red">12.60/16.20</span>
      </div>
    </div>
  </div>

</template>

<script>
import { getProductPrice } from 'api/index'
import { Loading, getFloat } from 'lib/index'
export default {
  components: {},
  data() {
    return {
      product_price: ''
    };
  },
  watch: {
    '$store.state.commonFlag': {
      handler(val) {
        if (val) {
          this.getProductPrice(val.id)
        }
      }
    }
  },
  methods: {
    async getProductPrice(id) {
      Loading.open()
      let { product_price } = await getProductPrice({
        product_id: id
      })
      Loading.close()
      this.product_price = product_price
      this.$parent.goodsPrice = product_price
    }
  },
  computed: {
    getFloat: () => getFloat
  },
}
</script>
<style lang='scss' scoped>
@import "~css/def";
.info {
  border-radius: size(16);
  background: white;
  height: size(170);
  display: flex;
  margin-top: size(20);
  padding: size(14) size(20) size(25);
  .left {
    width: size(240);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .top {
      font-size: size(48);
      font-weight: 600;
      color: $color-main;
      line-height: size(67);
      letter-spacing: size(2);
    }
    .bot {
      > span {
        font-size: size(20);
        font-weight: 600;
        color: $color-main;
        line-height: size(28);
      }
      > span:nth-of-type(1) {
        margin-right: size(16);
      }
    }
  }
  .right {
    line-height: size(30);
    font-size: size(22);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .label {
      font-weight: 600;
      color: #b0b0b0;
      margin-right: size(34);
    }
    .value {
      font-weight: 400;
      color: #000000;
    }
    .red {
      color: $color-main;
    }
  }
}
</style>
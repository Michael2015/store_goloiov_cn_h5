<template>
  <!-- 暂时废弃这个组件 -->
  <div class="price">
    <table>
      <tr>
        <td>规格</td>
        <td>商品零售价</td>
        <td>销售单品返利</td>
      </tr>
      <tr>
        <td>黑色</td>
        <td>99.0</td>
        <td>100.00</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.price{
  padding: size(20) size(20);
}
table{
  width: 100%;
  text-align: center;
  font-size: size(24);
  td{
    width: 30%;
    border: 1px solid #ddd;
    line-height: 1.4;
    padding: size(12) 0;
  }
  tr{
    &:nth-child(2){
      color: #999;
    }
  }
}
</style>
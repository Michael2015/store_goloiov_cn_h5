<template>
  <div class="list clearfix">
    <div class="item">
      <img src="" alt="">
      <div class="close"></div>
    </div>
    <div class="item add">
      <label for="image"></label>
      <input type="file" id="image" accept="image/*" @change="change" ref="img" />
    </div>
  </div>
</template>

<script>
export default {

}
function fileToBase64(file) {
  // 创建一个文件读取的工具类
  let reader = new FileReader()
  // 读取文件
  reader.readAsDataURL(file)
  return new Promise(function(resolve){
    reader.onload = function (/*e */) {
      let image = new Image()
      // 获取base64图片
      image.src = this.result
      image.onload = function() {
        resolve(compress(image, file.size, /\.png$/.test(file.name)))
      }
    }
  })
}

function compress(image, size, png) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  // canvas清屏,并设置为上面宽高
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // 重置canvas宽高
  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)
  // 图片质量为0.2
  let quality = canvas.toDataURL('image/' + (png ? 'png' : 'jpg'), .2)
  // 如果是低版本的Safari, 返回原图片
  if (quality === 'data:,' || (quality.length && quality.length > size)) {
    return image.src
  }
  return quality
}

function base64ToBlob(base64Data) {
  let arr = base64Data.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  // console.log(arr)
  // console.log(mime)
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  let blob = new Blob([u8arr], { type: mime })
  return blob
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.list{
  margin-left: -3%;
  .item{
    width: 30.3%;
    margin-left: 3%;
    float: left;
    min-height: 50px;
    position: relative;
    padding-bottom: 30.3%;
    margin-bottom: size(24);
    background: gold;
    >img{
      @include fill;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: 0px 1px 9px 0px rgba(225, 225, 225, 0.5);
    }
    &.add{
      label{
        position: absolute;
        @include fill;
        @include bg('~img/add-img.png');
        box-shadow: 0px 1px 9px 0px rgba(225, 225, 225, 0.5);
      }
      input{
        visibility: hidden;
        width: 0;
        height: 0;
        position: absolute;
      }
    }
    .close{
      position: absolute;
      width: size(30);
      height: size(30);
      right: size(-6);
      top: size(-12);
      @include bg('~img/icon/close.png');
    }
  }
}
</style>
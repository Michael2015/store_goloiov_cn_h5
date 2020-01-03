<template>
  <div class="list clearfix">
    <div class="item" v-for="(item, index) in imgs2" :key="item.name + ' ' + index">
      <div class="img"><img :src="item.data" alt=""></div>
      <div class="close" @click="del(index)"></div>
    </div>
    <div class="item add" v-if="imgs2.length < max">
      <label for="image2"></label>
      <input type="file" id="image2" accept="image/*" @change="change" ref="img" />
    </div>
  </div>
</template>

<script>
import {Loading} from 'lib'
import {uploadImg, getHost} from 'api'
export default {
  props: {
    max: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      imgs2: []
    }
  },
  methods: {
    change: function() {
      const file = this.$refs.img.files[0]
      if (!file) {
        // 没有文件
        return
      }
      Loading.open()
      fileToBase64(file).then(b => {
        // 设置选择的图片
        const result = {
          name: file.name,
          data: b,
          path: null
        }
        this.imgs2.push(result)
        const form = new FormData()
        // 这个key是后台写死成这样的 b068931cc450442b63f5b3d276ea4297 app使用file
        form.append('file', base64ToBlob(b), file.name)
        uploadImg(form).then(data => {
          if (data) {
            result.path = getHost() + '/' + data.url
            this.trigger()
          }
        }).finally(() => {
          Loading.close()
        })
      })
    },
    del(i) {
      this.imgs2.splice(i, 1)
      this.trigger()
    },
    trigger() {
      this.$emit('input', this.imgs2.filter(i => i.path).map(i => i.path))
    }
  }
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
    background: #fff;
    .img{
      overflow: hidden;
      position: absolute;
      @include fill;
      left: 0;
      top: 0;
    }
    .img>img{
      display: block;
      position: absolute;
      left: 0;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
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
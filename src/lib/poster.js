import {req} from 'api/request'

export default class Poster{
  constructor(title, canvas) {
    this.canvas = canvas ? canvas : document.createElement('canvas')
    this.canvas.width = 560
    this.canvas.height = 800
    this.ctx = this.canvas.getContext('2d')
    
    const ctx = this.ctx

    // 清除背景
    ctx.save()
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, 560, 800)
    ctx.restore()

    const titleHeight = 44
    // 海报标题的高度
    this.titleHeight = titleHeight
    this.goodsImgHeight = 560 - titleHeight

    // 标题背景
    ctx.save()
    ctx.fillStyle = '#f55254'
    ctx.fillRect(0, this.goodsImgHeight, 560, titleHeight)
    ctx.restore()
    
    // 绘制标题
    let  goodsName = title
    ctx.save()
    ctx.font = 'normal 100 26px sans-serif'
    ctx.fillStyle = '#ffffff'
    let storeNameTextPx = ctx.measureText(goodsName)
    while(storeNameTextPx.width >= (560 - 80)) {
      goodsName = goodsName.substr(0, goodsName.length - 2)
      storeNameTextPx = ctx.measureText(goodsName + '...')
    }
    ctx.fillText(goodsName + '...', ((560 - storeNameTextPx.width) / 2), this.goodsImgHeight + 32, 560)
    ctx.restore()
  }
  downloadImg(path) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve(img)
      }
      console.log(path)
      if (process.env.NODE_ENV !== 'production' && path.indexOf('data') !== 0) {
        // dev 需要的逻辑
        // dev 会出现图片跨域问题，所以自己下载图片
        // 替换域名是为了下载图片走webpack的代理
        req.get(path.replace('https://storemp.golodata.com', ''), {
          responseType: 'arraybuffer'
        }).then(({data}) => {
          img.src = 'data:image/png;base64,' + transformArrayBufferToBase64(data)
        })
      } else {
        img.src = path
      }

      setTimeout(() => {
        reject(new Error('Poster download image timeout: ' + path))
      }, 20 * 1000)

    })
  }
  drawGoods(path) {
    return this.downloadImg(path).then(img => {
      const ctx = this.ctx
      let height = img.height * (560 / img.width)
      ctx.drawImage(img, 0, 0, 560, height > this.goodsImgHeight ? this.goodsImgHeight : height)
    })
  }
  drawTips(path) {
    return this.downloadImg(path).then(img => {
      this.ctx.drawImage(img, 61, 643, img.width, img.height)
    })
  }
  drawQrcode(path) {
    return this.downloadImg(path).then(img => {
      this.ctx.drawImage(img, 339, 600, 163, 163)
    })
  }
  getBase64() {
    return this.canvas.toDataURL()
  }
}

function transformArrayBufferToBase64 (buffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary);
}
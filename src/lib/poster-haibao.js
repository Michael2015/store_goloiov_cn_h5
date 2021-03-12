import {
  req
} from 'api/request'

export default class Poster {
  constructor(canvas) {
    this.canvas = canvas ? canvas : document.createElement('canvas')
    // this.canvas.width = 560
    // this.canvas.height = 800
    this.ctx = this.canvas.getContext('2d')

    const ctx = this.ctx
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
        req.get(path.replace('https://storemp.golodata.com/', ''), {
          responseType: 'arraybuffer'
        }).then(({
          data
        }) => {
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
  drawAllcode(path) {
    return this.downloadImg(path).then(img => {
      this.canvas.width = img.width
      this.canvas.height = img.height
      this.ctx.drawImage(img, 0, 0, img.width, img.height)
    })
  }
  getBase64() {
    return this.canvas.toDataURL()
  }
}

function transformArrayBufferToBase64(buffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary);
}

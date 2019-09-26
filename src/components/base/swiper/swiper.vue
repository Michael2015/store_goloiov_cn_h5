<template>
<div class="swiper-container" ref="container">
  <div class="swiper-wrapper">
    <slot></slot>
  </div>
  <div class="swiper-pagination"></div>
</div>
</template>

<script>
import Swiper from './swiper-lib'
export default {
  mounted() {
    const config = 
      {
        // pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        autoplayDisableOnInteraction: false,
        // paginationClickable: true,
        loop: true,
        // autoplay: 3000,
        spaceBetween: 0,
        centeredSlides: true,
        initialSlide: 2
      }
    this.swiper = new Swiper(this.$refs.container, config)
  },
  deactivated() {
    if (this.swiper) {
      this.swiper.stopAutoplay()
    }
  },
  activated() {
    if (this.swiper) {
      this.swiper.update()
      // this.swiper.startAutoplay()
    }
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy()
      this.swiper = null
    }
  }
}
</script>

<style lang="scss">
@import "~css/def";
.swiper-container{
  width: 100%;
  height: 100%;
}
.swiper-slide {
	// -webkit-transition: transform 1.0s;
	// transition: transform 1.0s;
	-webkit-transform: scale(0.89);
  transform: scale(0.89);
  width: 85%;
}
.swiper-slide-active,.swiper-slide-duplicate-active {
	-webkit-transform: scale(1);
	transform: scale(1);
}

// .swiper-pagination{
//   position: absolute;
//   z-index: 999;
//   right: 0;
//   left: 0;
//   bottom: 0;
//   text-align: center;
//   font-size: 0;
//   .swiper-pagination-bullet{
//     display: inline-block;
//     margin: 0 2px!important;
//     width: size(8);
//     height: size(8);
//     border-radius: 50%;
//     background: rgba(255, 255, 255, .6);
//   }
//   .swiper-pagination-bullet-active{
//     border-radius: size(8);
//     width: size(20);
//     background: #fff;
//   }
// }
</style>
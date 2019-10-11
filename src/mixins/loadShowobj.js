import {incomeListDetail} from 'api/income'
export default {
  data() {
    return {
      showObj:{}
    }
  },
  async mounted(){
    // console.log(this.$route.query.order_id)
    const reque = await incomeListDetail(this.$route.query.order_id)
    this.showObj = reque
  }
}

import {incomeListDetail} from 'api/income'
import { Toast } from 'lib'
export default {
  data() {
    return {
      showObj:{}
    }
  },
  async mounted(){
    // console.log(this.$route.query.order_id)
    const reque = await incomeListDetail(this.$route.query.order_id, this.$route.query.user_id)
    if(reque.code === 200){
      this.showObj = reque.data
    }else {
      Toast(reque.msg)
    }
  }
}

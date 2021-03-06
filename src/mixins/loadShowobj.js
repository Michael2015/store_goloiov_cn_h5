import {incomeListDetail} from 'api/income'
import { Toast } from 'lib'
export default {
  data() {
    return {
      showObj:{}
    }
  },
  async mounted(){
    const { order_id,user_id,type_num,order_sn } = this.$route.query
    // console.log(type_num)
    const reque = await incomeListDetail(order_id,user_id,type_num,order_sn)
    if(reque.code === 200){
      this.showObj = reque.data 
    }else {
      Toast(reque.msg)
    }
  }
}

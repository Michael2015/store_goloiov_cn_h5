import {req, OK, SIZE} from './request'

const clean = ({data}) => {
  return data && data.code === OK ? (data.data ? data.data : true) : null
}

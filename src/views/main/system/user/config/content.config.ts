import { IPropListType } from '@/base/table'
const propList: IPropListType[] = [
  { prop: 'name', label: '用户名', minWidth: '100', align: 'center' },
  { prop: 'realname', label: '真实姓名', minWidth: '100', align: 'center' },
  {
    prop: 'cellphone',
    label: '电话号码',
    minWidth: '100',
    align: 'center'
  },
  {
    prop: 'enable',
    label: '状态',
    minWidth: '100',
    align: 'center',
    slotName: 'status'
  },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '250',
    align: 'center',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '250',
    align: 'center',
    slotName: 'updateAt'
  },
  {
    label: '操作',
    minWidth: '120',
    align: 'center',
    slotName: 'handler'
  }
]

export const contentTableConfig = {
  propList,
  title: '用户列表',
  showIndexColumn: true,
  showSelectColumn: true
}

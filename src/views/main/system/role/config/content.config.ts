import { IPropListType } from '@/base/table'
const propList: IPropListType[] = [
  { prop: 'name', label: '角色名', minWidth: '100', align: 'center' },
  { prop: 'intro', label: '权限介绍', minWidth: '100', align: 'center' },
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
  title: '角色列表',
  showIndexColumn: true,
  showSelectColumn: true
}

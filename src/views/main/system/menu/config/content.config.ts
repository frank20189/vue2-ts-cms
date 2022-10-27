import { IPropListType } from '@/base/table'
const propList: IPropListType[] = [
  { prop: 'name', label: '菜单名称', minWidth: '100', align: 'center' },
  {
    prop: 'type',
    label: '类型',
    minWidth: '100',
    align: 'center',
    slotName: 'oldPrice'
  },
  {
    prop: 'url',
    label: '菜单url',
    minWidth: '100',
    align: 'center',
    slotName: 'newPrice'
  },
  {
    prop: 'icon',
    label: '菜单图标',
    minWidth: '100',
    align: 'center'
  },
  {
    prop: 'permission',
    label: '按钮权限',
    minWidth: '100',
    align: 'center'
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
  title: '菜单列表',
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}

import { IPropListType } from '@/base/table'
const propList: IPropListType[] = [
  { prop: 'name', label: '商品名称', minWidth: '100', align: 'center' },
  {
    prop: 'oldPrice',
    label: '原价格',
    minWidth: '100',
    align: 'center',
    slotName: 'oldPrice'
  },
  {
    prop: 'newPrice',
    label: '现价格',
    minWidth: '100',
    align: 'center',
    slotName: 'newPrice'
  },
  {
    prop: 'desc',
    label: '描述',
    minWidth: '100',
    align: 'center'
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: '100',
    align: 'center',
    slotName: 'status'
  },
  {
    prop: 'imgUrl',
    label: '图片',
    minWidth: '100',
    align: 'center',
    slotName: 'imgUrl'
  },
  {
    prop: 'inventoryCount',
    label: '库存',
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
  title: '商品列表',
  showIndexColumn: true,
  showSelectColumn: true
}

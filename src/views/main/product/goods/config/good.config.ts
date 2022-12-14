import { IForm, IFormItem } from '@/base/form'
const formItems: IFormItem[] = [
  { field: 'id', type: 'input', label: 'Id', placeholder: '请输入id' },
  {
    field: 'name',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    field: 'realname',
    type: 'input',
    label: '真实姓名',
    placeholder: '请输入真实姓名'
  },
  {
    field: 'cellphone',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },
  {
    field: 'enable',
    type: 'select',
    label: '用户状态',
    placeholder: '请选择用户状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    field: 'createAt',
    type: 'datepicker',
    label: '创建时间',
    placeholder: '请选择创建时间',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange',
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now() - 8.64e6
      }
    }
  }
]
export const searchFormConfig: IForm = {
  colLayout: {
    span: 6
  },
  formItems
}

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
    field: 'password',
    type: 'password',
    label: '密码',
    placeholder: '请输入密码'
  },
  {
    field: 'sport',
    type: 'select',
    label: '喜欢的运动',
    placeholder: '请选择喜欢的运动',
    options: [
      { label: '篮球', value: '篮球' },
      { label: '排球', value: '排球' }
    ]
  },
  {
    field: 'createTime',
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
    span: 4
  },
  formItems
}

import { IForm, IFormItem } from '@/base/form'
const formItems: IFormItem[] = [
  {
    type: 'input',
    label: 'Id',
    placeholder: '请输入id'
  },
  {
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    type: 'password',
    label: '密码',
    placeholder: '请输入密码'
  },
  {
    type: 'select',
    label: '喜欢的运动',
    placeholder: '请选择喜欢的运动',
    options: [
      { label: '篮球', value: '篮球' },
      { label: '排球', value: '排球' }
    ]
  },
  {
    type: 'datepicker',
    label: '创建时间',
    placeholder: '请选择创建时间',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    }
  }
]
export const searchFormConfig: IForm = {
  formItems
}

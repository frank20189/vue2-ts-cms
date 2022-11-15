import { IForm, IFormItem } from '@/base/form'
const formItems: IFormItem[] = [
  { field: 'id', type: 'input', label: 'Id', placeholder: '请输入id' },
  {
    field: 'name',
    type: 'input',
    label: '角色名',
    placeholder: '请输入角色名'
  },
  {
    field: 'intro',
    type: 'input',
    label: '角色介绍',
    placeholder: '请输入角色介绍'
  }
]
export const modalFormConfig: IForm = {
  colLayout: {
    span: 24
  },
  formItems
}

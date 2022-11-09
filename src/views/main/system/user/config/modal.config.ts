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
    field: 'password',
    type: 'password',
    label: '密码',
    placeholder: '请输入用户密码',
    isHidden: true
  },
  {
    field: 'cellphone',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },
  {
    field: 'departmentId',
    type: 'select',
    label: '选择部门',
    placeholder: '请选择部门'
  },
  {
    field: 'roleId',
    type: 'select',
    label: '选择角色',
    placeholder: '请选择角色'
  }
]
export const modalFormConfig: IForm = {
  colLayout: {
    span: 24
  },
  formItems
}

import { IForm, IFormItem } from '@/base/form'
const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '角色名称',
    placeholder: '请输入角色名称'
  },
  {
    field: 'intro',
    type: 'input',
    label: '权限介绍',
    placeholder: '请输入权限介绍'
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
    span: 5
  },
  formItems
}

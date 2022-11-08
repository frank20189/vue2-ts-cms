export type IFormOptions = { label: string; value: number | string }

export interface IFormItem {
  field: string
  type: string
  label: string
  rules?: any[]
  placeholder: any
  // 针对select
  options?: IFormOptions[]
  // 针对特殊属性
  otherOptions?: any
  itemStyle?: Record<string, any>
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}

export type IFormOptions = { label: string; value: string }

export interface IFormItem {
  type: string
  label: string
  rules?: any[]
  placeholder: any
  // 针对select
  options?: IFormOptions[]
  // 针对特殊属性
  otherOptions?: any
  itemStyle?: Record<string, any>
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}

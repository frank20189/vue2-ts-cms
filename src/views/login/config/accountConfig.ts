import type { FormRules } from 'element-plus'
const rules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,}$/,
      message: '密码必须是5位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
export default rules

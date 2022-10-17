import type { FormRules } from 'element-plus'
import config from '@/global/config'
const rules: FormRules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: config.phoneRxg,
      message: '请输入正确格式的手机号',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
export default rules

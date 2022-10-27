import { IUserInfo, IUserMenuInfo } from '@/service/login/type'

export interface ILogonState {
  token: string
  userInfo: IUserInfo
  userMenus: IUserMenuInfo[]
  permissions: string[]
}
export type ILoginStateKey = keyof ILogonState

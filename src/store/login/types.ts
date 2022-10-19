import { IUserInfo, IUserMenuInfo } from '@/service/login/type'

export interface ILogonState {
  token: string
  userInfo: IUserInfo
  userMenus: IUserMenuInfo[]
}
export type ILoginStateKey = keyof ILogonState

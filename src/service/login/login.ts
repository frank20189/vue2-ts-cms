import hyRequest from '..'
import { IAccount, IUserResponse, IUserInfo, IUserMenuInfo } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法：role/{id}
  UserMenus = '/role/' // 用法：/role/{id}/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IUserResponse>({
    url: LoginAPI.AccountLogin,
    data: { ...account }
  })
}

/**
 *
 * @param id 用户id
 * @returns Promise<ResponseResult<IUserInfo>>
 */
export function requestUserInfoById(id: number) {
  return hyRequest.get<IUserInfo>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

/**
 * 获取用户的菜单
 * @param id 用户id
 */
export function requestUserMenuByRoleId(id: number) {
  return hyRequest.get<IUserMenuInfo>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}

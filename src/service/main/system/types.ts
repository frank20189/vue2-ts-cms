export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: Date
  updateAt: Date
}
export interface IUserInfoResult {
  list: IUserInfo[]
  totalCount: number
}

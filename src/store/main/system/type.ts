export interface UserInfo {
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

export interface ISystemState {
  userList: UserInfo[]
  userCount: number
}

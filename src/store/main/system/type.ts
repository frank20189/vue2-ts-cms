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
export interface Child2 {
  id: number
  url?: any
  name: string
  sort?: any
  type: number
  parentId: number
  permission: string
}

export interface Child {
  id: number
  url: string
  name: string
  sort: number
  type: number
  children: Child2[]
  parentId: number
}

export interface MenuList {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: Child[]
}

export interface RoleInfo {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
  menuList: MenuList[]
}
export interface ISystemState {
  userList: UserInfo[]
  userCount: number
  roleList: RoleInfo[]
  roleCount: number
  goodList: any[]
  goodCount: number
}

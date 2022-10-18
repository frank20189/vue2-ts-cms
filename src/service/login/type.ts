export interface IAccount {
  name: string
  password: string
}
export interface IUserResponse {
  id: number
  name: string
  token: string
}

// 用户信息
export interface Role {
  id: number
  name: string
  intro: string
  createAt?: Date
  updateAt?: Date
}

export interface Department {
  id: number
  name: string
  parentId?: any
  createAt?: Date
  updateAt?: Date
  leader: string
}

export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt?: Date
  updateAt?: Date
  role: Role
  department: Department
}

// 菜单信息
export interface AuthList {
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
  children: AuthList[]
  parentId: number
}

export interface IUserMenuInfo {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: Child[]
}

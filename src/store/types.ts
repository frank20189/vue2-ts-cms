import { ILogonState } from './login/types'
import { ISystemState } from './main/system/type'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  loginModule: ILogonState
  systemModule: ISystemState
}

export type IStoreType = IRootState & IRootWithModule

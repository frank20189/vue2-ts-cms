import { ILogonState } from './login/types'
import { ISystemState } from './main/system/type'
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  loginModule: ILogonState
  systemModule: ISystemState
}

export type IStoreType = IRootState & IRootWithModule

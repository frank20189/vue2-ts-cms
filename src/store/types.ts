import { ILogonState } from './login/types'
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  loginModule: ILogonState
}

export type IStoreType = IRootState & IRootWithModule

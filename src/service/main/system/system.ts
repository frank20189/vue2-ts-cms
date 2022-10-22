import hyRequest from '@/service'
import type { IUserInfoResult } from './types'
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IUserInfoResult>({ url, data: queryInfo })
}

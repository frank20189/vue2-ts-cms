import hyRequest from '@/service'
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<any>({ url, data: queryInfo })
}

export function deletePageData(url: string) {
  // todo
  return hyRequest.delete<any>({ url })
}

export function createPageData(url: string, data: any) {
  return hyRequest.post<any>({ url, data })
}

export function editPageData(url: string, data: any) {
  return hyRequest.patch<any>({ url, data })
}

import { useStore } from '@/store'

export function userPermission(pageName: string, handleName: string) {
  // todo
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  return !!permissions.find(
    (item) => item.indexOf(handleName) && item.indexOf(pageName)
  )
}

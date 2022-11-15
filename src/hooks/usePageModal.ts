import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallBackFn = (payload?: any) => void

export function usePageModal(newCB?: CallBackFn, editCB?: CallBackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const title = ref<string>('')

  const handleNewData = (value: string) => {
    // value  传递title标题
    title.value = value
    defaultInfo.value = {}
    pageModalRef.value && (pageModalRef.value.dialogVisible = true)
    newCB && newCB()
  }

  // 传递payload表格行数据，以及title标题
  const handleEditData = (payload: any, value: string) => {
    title.value = value
    pageModalRef.value && (pageModalRef.value.dialogVisible = true)
    editCB && editCB(payload)
    defaultInfo.value = { ...payload }
  }

  return {
    pageModalRef,
    defaultInfo,
    title,
    handleNewData,
    handleEditData
  }
}

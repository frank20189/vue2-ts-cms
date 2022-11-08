import { ref } from 'vue'
import PageModal from '@/components/page-modal'
export function usePageModal() {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    pageModalRef.value && (pageModalRef.value.dialogVisible = true)
  }

  const handleEditData = (payload: any) => {
    defaultInfo.value = { ...payload }
    pageModalRef.value && (pageModalRef.value.dialogVisible = true)
  }

  return {
    pageModalRef,
    defaultInfo,
    handleNewData,
    handleEditData
  }
}

import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    // todo
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    //todo
    pageContentRef.value?.getPageData(queryInfo)
  }
  return { pageContentRef, handleResetClick, handleQueryClick }
}

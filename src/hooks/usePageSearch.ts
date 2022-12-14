import PageContent from '@/components/page-content'
import { ref } from 'vue'

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

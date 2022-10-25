<template>
  <div class="custom-table">
    <div class="header">
      <slot name="tableHeader">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          :align="item.align"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="tableFooter">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    // 是否展示序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否展示复选框
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    // todo
    const handleSelectionChange = (value: any) => {
      // todo 处理选中事件
      emit('selectionChange', value)
    }
    const handleSizeChange = () => {
      //todo
    }
    const handleCurrentChange = () => {
      //todo
    }
    return { handleSelectionChange, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style lang="less" scoped>
.custom-table {
  margin-top: 32px;
  margin-right: 24px;
  margin-left: 24px;
  padding-bottom: 16px;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .footer {
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

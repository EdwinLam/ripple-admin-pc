<template>
    <div>
        <Row>
            <Col span="18">
            <Input v-model="phone" @on-change="queryPage(1)" icon="search" placeholder="请输入手机号搜搜..."
                   style="width: 200px"/></Col>
            <Col span="6" style="text-align: right">
            <Button type="primary" @click="openAdd">添加账号</Button>
            </Col>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
            <can-edit-table :loading="loading" refs="table3" v-model="dataItems" :edit-incell="true"
                            :columns-list="columns" @on-cell-change="handleCellChange"
                            @on-change="handleChange" @on-delete="handleDel"
                            @on-bind-click="bindMange"></can-edit-table>

            <div style="margin: 10px;">
                <div style="float: right;">
                    <Page :total="total" :current="pageNo" size="small" show-elevator show-sizer
                          @on-change="queryPage" @on-page-size-change="changePageSize"></Page>
                </div>
            </div>
        </Row>
    </div>
</template>
<script>
  import AccountApi from '../../../../api/AccountApi'
  import canEditTable from '@/views/tables/components/canEditTable.vue'
  import { accountColumns } from '../data/tableColumns'
  export default {
    name: 'accountTable',
    components: {
      canEditTable
    },
    data () {
      return {
        loading: false,
        total: 0,
        phone: '',
        pageNo: 1,
        pageSize: 10,
        dataItems: [],
        columns: accountColumns
      }
    },
    methods: {
      bindMange(items, index){
        this.$emit('bind-mange', items, index)
      },
      openAdd(){
        this.$emit('open-add')
      },
      async queryPage(pageNo){
        const ctx = this
        ctx.loading = true
        const res = await AccountApi.queryPage({
          phone: this.phone,
          pageNo: pageNo,
          pageSize: this.pageSize
        })
        ctx.loading = false
        this.dataItems = res.data.rows
        this.total = res.data.count
        this.pageNo = pageNo
      },
      async handleDel (val, index) {
        const item = this.dataItems[index]
        const res = await AccountApi.destroy(item.id)
        this.$Message.success(res.message)
        this.dataItems.splice(index,1)
      },
      async handleCellChange (val, index, key) {
        const item = this.dataItems[index]
        const res = await AccountApi.update(item.id, {[key]: item[key]})
        this.$Message.success(res.message)
      },
      async handleChange (val, index) {
        const item = this.dataItems[index]
        const res = await AccountApi.update(item.id, {phone: item.phone, email: item.email})
        this.$Message.success(res.message)
      },
      changePageSize(pageSize){
        this.pageSize = pageSize
        this.queryPage(1)
      }
    }
  }
</script>
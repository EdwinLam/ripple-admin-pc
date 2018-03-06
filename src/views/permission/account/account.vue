<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                账号管理
            </p>
            <Row>
                <Input v-model="phone" @on-change="queryPage(1)" icon="search" placeholder="请输入手机号搜搜..."
                       style="width: 200px"/>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <can-edit-table :loading="loading" refs="table3" v-model="dataItems" :edit-incell="true"
                                :columns-list="tableColumns"  @on-cell-change="handleCellChange"
                                @on-change="handleChange" @on-delete="handleDel"></can-edit-table>

                <div style="margin: 10px;">
                    <div style="float: right;">
                        <Page :total="total" :current="pageNo" size="small" show-elevator show-sizer
                              @on-change="queryPage" @on-page-size-change="changePageSize" ></Page>
                    </div>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
  import AccountApi from '../../../api/AccountApi'
  import { tableColumns } from './data/tableColumns'

  import canEditTable from '../../tables/components/canEditTable.vue'

  export default {
    name: 'account',
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
        tableColumns: tableColumns
      };
    },
    methods: {
      init () {
        this.queryPage(1)
      },
      changePageSize(pageSize){
        this.pageSize = pageSize
        this.queryPage(1)
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
        const res= await AccountApi.destroy(item.id)
        this.$Message.success(res.message)
      },
      async handleCellChange (val, index, key) {
        const item = this.dataItems[index]
        const res= await AccountApi.update(item.id,{[key]:item[key]})
        this.$Message.success(res.message)
      },
      async handleChange (val, index) {
        const item = this.dataItems[index]
        const res= await AccountApi.update(item.id,{phone:item.phone,email:item.email})
        this.$Message.success(res.message)
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

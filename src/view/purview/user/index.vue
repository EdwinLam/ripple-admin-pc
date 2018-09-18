<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="openAddUser" type="primary" icon="md-add">添加用户</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown" />
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">刷新</DropdownItem>
            <DropdownItem name="exportData">导出所选数据</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Row>
      <Row>
        <Alert show-icon>
          已选择 <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" border :columns="columns" :data="data" sortable="custom" @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table"></Table>
        <Table :columns="columns" :data="exportData" ref="exportTable" style="display:none"></Table>
      </Row>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator show-sizer></Page>
      </Row>
    </Card>
    <add-user ref="addUserModal" @ok="fetchData"></add-user>
  </div>
</template>

<script>
import AddUser from './modal/addUser'
import Tables from '_c/tables'
import { UserApi } from '@/api'
import columns from './table/columns'
export default {
  name: 'tables_page',
  components: {
    Tables, AddUser
  },
  data () {
    return {
      columns,
      loading: false,
      selectCount: 0,
      total: 0,
      data: [],
      selectList: [],
      searchForm: {
        username: '',
        departmentId: '',
        mobile: '',
        email: '',
        sex: '',
        type: '',
        status: '',
        pageNumber: 1,
        pageSize: 10,
        sort: 'createTime',
        order: 'desc',
        startDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    showSelect (e) {
      this.exportData = e
      this.selectList = e
      this.selectCount = e.length
    },
    openAddUser () {
      this.$refs.addUserModal.open()
    },
    delAll () {

    },
    changeSort (e) {
      this.searchForm.sort = e.key
      this.searchForm.order = e.order
      if (e.order === 'normal') {
        this.searchForm.order = ''
      }
      this.fetchData()
    },
    changePage (v) {
      this.searchForm.pageNumber = v
      this.fetchData()
      this.clearSelectAll()
    },
    changePageSize (v) {
      this.searchForm.pageSize = v
      this.fetchData()
    },
    clearSelectAll () {
      this.$refs.table.selectAll(false)
    },
    handleDropdown (name) {
      if (name === 'exportData') {
        if (this.selectCount <= 0) {
          this.$Message.warning('您还未选择要导出的数据')
          return
        }
        this.$Modal.confirm({
          title: '确认导出',
          content: '您确认要导出所选 ' + this.selectCount + ' 条数据?',
          onOk: () => {
            this.$refs.exportTable.exportCsv({
              filename: '用户数据'
            })
          }
        })
      } else if (name === 'refresh') {
        this.fetchData()
      }
    },
    exportExcel () {
      this.$refs.table.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    async fetchData () {
      this.loading = true
      const res = await UserApi.getByCondition(this.searchForm)
      this.loading = false
      this.total = res.result.totalElements
      this.data = res.result.content
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>

</style>

<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row>
        <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
          <Form-item label="用户名称" prop="username">
            <Input type="text" v-model="searchForm.username" clearable placeholder="请输入用户名" style="width: 200px"/>
          </Form-item>
          <Form-item label="部门" prop="department">
            <Cascader v-model="selectDep" :data="department" :load-data="loadData" @on-change="handleChangeDep"
                      change-on-select filterable placeholder="请选择或输入搜索部门" style="width: 200px"></Cascader>
          </Form-item>
          <span v-if="drop">
                            <Form-item label="手机号" prop="mobile">
                              <Input type="text" v-model="searchForm.mobile" clearable placeholder="请输入手机号"
                                     style="width: 200px"/>
                            </Form-item>
                              <Form-item label="邮箱" prop="email">
                                <Input type="text" v-model="searchForm.email" clearable placeholder="请输入邮箱"
                                       style="width: 200px"/>
                              </Form-item>
                              <Form-item label="性别" prop="sex">
                                <Select v-model="searchForm.sex" placeholder="请选择" clearable style="width: 200px">
                                  <Option value="0">女</Option>
                                  <Option value="1">男</Option>
                                </Select>
                              </Form-item>
                              <Form-item label="用户状态" prop="status">
                                <Select v-model="searchForm.status" placeholder="请选择" clearable style="width: 200px">
                                  <Option value="0">正常</Option>
                                  <Option value="-1">禁用</Option>
                                </Select>
                              </Form-item>
                              <Form-item label="创建时间">
                                <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable
                                            @on-change="selectDateRange" placeholder="选择起始时间"
                                            style="width: 200px"></DatePicker>
                              </Form-item>
                            </span>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <a class="drop-down" @click="dropDown">{{dropDownContent}}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="openAddUser" type="primary" icon="md-add">添加用户</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
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
        <Table :loading="loading" border :columns="columns" :data="userItems" sortable="custom"
               @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table"></Table>
        <Table :columns="columns" :data="exportData" ref="exportTable" style="display:none"></Table>
      </Row>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator
              show-sizer></Page>
      </Row>
    </Card>
    <add-user ref="addUserModal" @ok="fetchData"></add-user>
  </div>
</template>

<script>
import AddUser from './modal/addUser'
import Tables from '_c/tables'
import columns from './table/columns'
import { mapState } from 'vuex'

export default {
  name: 'tables_page',
  components: {
    Tables, AddUser
  },
  data () {
    return {
      selectDate: null,
      accessToken: {},
      loading: true,
      operationLoading: false,
      loadingExport: true,
      modalExportAll: false,
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      selectCount: 0,
      selectList: [],
      viewImage: false,
      department: [],
      selectDep: [],
      dataDep: [],
      exportData: [],
      columns,
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
  computed: {
    ...mapState({
      userItems: state => state.user.userItems,
      total: state => state.user.total
    })
  },
  methods: {
    handleReset () {

    },
    loadData (item, callback) {

    },
    handleSearch () {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.fetchData()
    },
    dropDown () {
      if (this.drop) {
        this.dropDownContent = '展开'
        this.dropDownIcon = 'ios-arrow-down'
      } else {
        this.dropDownContent = '收起'
        this.dropDownIcon = 'ios-arrow-up'
      }
      this.drop = !this.drop
    },
    handleChangeDep () {

    },
    selectDateRange (v) {
      if (v) {
        this.searchForm.startDate = v[0]
        this.searchForm.endDate = v[1]
      }
    },
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
      await this.$store.dispatch('queryUser', this.searchForm)
      this.loading = false
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>

</style>

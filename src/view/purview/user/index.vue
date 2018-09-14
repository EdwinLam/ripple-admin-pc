<template>
  <div>
    <Card>
      <Row>
        <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-save-edit="handleEdit"/>
      </Row>
      <!--<Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>-->
      <Row type="flex" justify="end" class="page">
        <Page :current="1" :total="2" :page-size="2" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator show-sizer></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getByCondition, adminEdit } from '@/api/user'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '用户名',
          key: 'username',
          width: 145,
          sortable: true,
          fixed: 'left'
        },
        {
          title: '头像',
          key: 'avatar',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('Avatar', {
              props: {
                src: params.row.avatar
              }
            })
          }
        },
        {
          title: '所属部门',
          key: 'departmentTitle',
          width: 120
        },
        {
          title: '手机',
          key: 'mobile',
          width: 115,
          sortable: true
        },
        {
          title: '邮箱',
          key: 'email',
          width: 180,
          sortable: true
        },
        {
          title: '性别',
          key: 'sex',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.sex === 1 ? '男' : '女')
          }
        },
        {
          title: '用户类型',
          key: 'type',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('div', params.row.type === 1 ? '管理员' : '普通用户')
          }
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 140,
          render: (h, params) => {
            if (params.row.status === 0) {
              return h('div', [
                h(
                  'Tag',
                  {
                    props: {
                      type: 'dot',
                      color: 'success'
                    }
                  },
                  '正常启用'
                )
              ])
            } else if (params.row.status === -1) {
              return h('div', [
                h(
                  'Tag',
                  {
                    props: {
                      type: 'dot',
                      color: 'error'
                    }
                  },
                  '禁用'
                )
              ])
            }
          },
          filters: [
            {
              label: '正常启用',
              value: 0
            },
            {
              label: '禁用',
              value: -1
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 0) {
              return row.status === 0
            } else if (value === -1) {
              return row.status === -1
            }
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: true,
          sortType: 'desc',
          width: 150
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            if (params.row.status === 0) {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',
                  {
                    props: {
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.disable(params.row)
                      }
                    }
                  },
                  '禁用'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row)
                      }
                    }
                  },
                  '删除'
                )
              ])
            } else {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.enable(params.row)
                      }
                    }
                  },
                  '启用'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row)
                      }
                    }
                  },
                  '删除'
                )
              ])
            }
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    changePageSize () {

    },
    async handleEdit (params) {
      console.log(params)
      params.row[params.column.key] = params.value
      const res = await adminEdit(Object.assign(params.row, { roles: [] }))
      console.log(res)
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getByCondition().then(res => {
      console.log(res)
      this.tableData = res.result.content
    })
  }
}
</script>

<style>

</style>

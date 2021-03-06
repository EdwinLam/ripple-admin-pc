export default [
  {
    type: 'selection',
    key: 'selection',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    type: 'index',
    key: 'index',
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
]

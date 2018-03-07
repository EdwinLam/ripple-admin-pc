export const accountColumns = [
  {
    'title': '电话',
    'key': 'phone',
    editable: true
  },
  {
    'title': 'email',
    'key': 'email',
    editable: true
  },
  {
    'title': '创建日期',
    'key': 'createdAt',
    filterMethod (value, row) {
      console.log(value)
      return row.show > 4000
    }
  },
  {
    title: '操作',
    width: 300,
    key: 'handle',
    handle: [{type:'custom',name:'绑定管理',key:'bind'},{type:'edit'}, {type:'delete'}],
  }
]

export const userColumns = [
  {
    'title': '用户名',
    'key': 'userName',
    editable: true
  },
  {
    'title': '性别',
    'key': 'sex',
    editable: true
  },
  {
    'title': '联系号码',
    'key': 'phone',
    editable: true
  },
  {
    'title': '创建日期',
    'key': 'createdAt'
  },
  {
    title: '操作',
    width: 200,
    key: 'handle',
    handle: [{type:'custom',name:'解除绑定',key:'unbind'}],
  }
]
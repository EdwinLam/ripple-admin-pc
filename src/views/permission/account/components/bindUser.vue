<template>
    <Modal :width="900" v-model="isShow" :title="'绑定用户'" >
        <can-edit-table :loading="loading"  v-model="dataItems" :columns-list="columns" @on-bind-click="bindUser"></can-edit-table>
        <div slot="footer">
        </div>
    </Modal>
</template>
<script>
  import UserApi from '@/api/UserApi'
  import canEditTable from '@/views/tables/components/canEditTable.vue'
  import {userBindColumns} from '../data/tableColumns'

  export default {
    name:'userMange',
    components: {
      canEditTable
    },
    data () {
      return {
        id:-1,
        loading:false,
        isShow:false,
        columns:userBindColumns,
        total: 0,
        phone: '',
        pageNo: 1,
        pageSize: 10,
        dataItems: [],
      }
    },
    methods: {
      async open(id){
        this.id = id
        this.isShow=true
        this.query(1)
      },
      async query(pageNo){
        this.loading=true
        const res = await UserApi.findBindUserPage({
          phone: this.phone,
          pageNo: pageNo,
          pageSize: this.pageSize
        })
        this.loading=false
        this.dataItems = res.data.rows
      },
      async bindUser (items, index) {
       const id=items[index].id
       const accountId=this.id
       const res =await UserApi.bindUser({id,accountId})
       this.dataItems [index].accountId='finish'
       this.dataItems = JSON.parse(JSON.stringify(this.dataItems))
       this.$Message.success(res.message)
       this.$emit('on-bind-suc')
      },
      handleReset (name) {
        this.isShowAdd=false
        this.$refs[name].resetFields();
      }
    }
  }
</script>
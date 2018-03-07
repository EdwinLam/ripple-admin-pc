<template>
    <Modal :width="900" v-model="isShow" :title="'绑定管理'" >
        <Row style="padding: 10px">
            <Button type="primary"  style="float:right" @click="openBindUser">绑定用户</Button>
        </Row>
        <can-edit-table :loading="loading"  v-model="dataItems" :columns-list="columns" @on-unbind-click="unbind"></can-edit-table>
        <div slot="footer">
        </div>
    </Modal>
</template>
<script>
  import UserApi from '@/api/UserApi'
  import canEditTable from '@/views/tables/components/canEditTable.vue'
  import {userColumns, accountColumns } from '../data/tableColumns'

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
        dataItems:[],
        columns:userColumns,
      }
    },
    methods: {
      openBindUser(){
        this.$emit('on-bind-user-click',this.id)
      },
      async open(id){
        this.id=id
        this.isShow=true
        this.query()
      },
      async query(){
        this.loading=true
        const res = await UserApi.findUserByAccountId(this.id)
        this.loading=false
        this.dataItems = res.data
      },
      async unbind (items, index) {
       const res =await UserApi.unBindUser(items[index].id)
       this.$Message.success(res.message)
       this.query(this.id)
      },
      handleReset (name) {
        this.isShowAdd=false
        this.$refs[name].resetFields();
      }
    }
  }
</script>
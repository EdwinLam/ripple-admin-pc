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
            <account-table ref="accountTable" @bind-mange="bindMange" @open-add="openAdd"></account-table>
            <bind-mange ref="bindMange" @on-bind-user-click="bindUser"></bind-mange>
            <add-account ref="addAccount" @add-account-suc="queryPage(1)"></add-account>
            <bind-user ref="bindUser" @on-bind-suc="updateBindMange"></bind-user>
        </Card>
    </div>
</template>

<script>
  import addAccount from './components/addAccount.vue'
  import bindMange from './components/bindMange'
  import accountTable from './components/accountTable'
  import bindUser from './components/bindUser.vue'

  export default {
    name: 'account',
    components: {
      bindMange, addAccount, accountTable,bindUser
    },
    data () {
      return {};
    },
    methods: {
      init () {
        this.$refs['accountTable'].queryPage(1)
      },
      openAdd(){
        this.$refs['addAccount'].open()
      },
      bindMange(items, index){
        this.$refs['bindMange'].open(items[index].id)
      },
      bindUser(id){
        this.$refs['bindUser'].open(id)
      },
      updateBindMange(){
        this.$refs['bindMange'].query()
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

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
            <bind-mange ref="bindMange"></bind-mange>
            <add-account ref="addAccount" @add-account-suc="queryPage(1)"></add-account>
        </Card>
    </div>
</template>

<script>
  import addAccount from './components/addAccount.vue'
  import bindMange from './components/bindMange'
  import accountTable from './components/accountTable'
  export default {
    name: 'account',
    components: {
      bindMange, addAccount, accountTable
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
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

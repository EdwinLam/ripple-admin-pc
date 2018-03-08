<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                类型管理
            </p>
            <type-tree ref="typeTree"  @open-add="openAdd" @remove-suc="init"></type-tree>
            <add-type ref="addType" @add-type-suc="init"></add-type>
        </Card>
    </div>
</template>

<script>
  import addType from './components/addType.vue'
  import typeTree from './components/typeTree'

  export default {
    name: 'account',
    components: {
     addType, typeTree
    },
    data () {
      return {};
    },
    methods: {
      init () {
        this.$refs['typeTree'].queryAll()
      },
      openAdd({cascaderDataItems,item}){
        this.$refs['addType'].open({item,cascaderDataItems})
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

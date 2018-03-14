<template>
    <div>
        <add ref="add" @return-index="returnIndex" @add-suc="showList(true)"></add>
        <edit ref="edit" @return-index="returnIndex" @edit-suc="showList(true)"></edit>
        <list ref="list" @open-add="openAdd" @open-edit="openEdit" @return-index="returnIndex"></list>
    </div>
</template>
<script>
  import add from './add.vue'
  import list from './list.vue'
  import edit from './edit.vue'
  import MallTypeApi from '@/api/MallTypeApi'

  export default {
    components: {
      add,list,edit
    },
    data () {
      return {
        typeItems:[],
        selectedType:0,
      }
    },
    methods: {
      async init () {
        await this.findBaseType()
        this.showList(true)
      },
      showList(initData){
        this.$refs['list'].show({typeItems:this.typeItems,selectedType:this.selectedType,initData})
      },
      openAdd(){
        this.$refs['add'].show({typeItems:this.typeItems,selectedType:this.selectedType})
      },
      openEdit(item){
        this.$refs['edit'].show({typeItems:this.typeItems,selectedType:this.selectedType,item})
      },
      returnIndex(){
        this.showList()
      },
      async findBaseType(){
        const res = await MallTypeApi.findBaseType()
        this.typeItems=res.data.map(el=>{return {label:el.typeName,value:el.id}})
        this.selectedType =this.typeItems.length?this.typeItems[0].value:0
      }
    },
    mounted () {
      this.init();
    }
  }
</script>

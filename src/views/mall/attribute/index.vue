<template>
    <div>
        <add-attribute  ref="addAttribute" @return-index="returnIndex" @add-suc="showList(true)"></add-attribute>
        <edit-attribute  ref="editAttribute" @return-index="returnIndex" @edit-suc="showList(true)"></edit-attribute>
        <attribute-list ref="attributeList" @open-add="openAdd" @open-edit="openEdit" @return-index="returnIndex"></attribute-list>
    </div>
</template>
<script>
  import addAttribute from './addAttribute.vue'
  import attributeList from './attributeList.vue'
  import editAttribute from './editAttribute.vue'

  import MallTypeApi from '@/api/MallTypeApi'

  export default {
    components: {
      addAttribute, attributeList,editAttribute
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
        this.$refs['attributeList'].show({typeItems:this.typeItems,selectedType:this.selectedType,initData})
      },
      openAdd(){
        this.$refs['addAttribute'].show({typeItems:this.typeItems,selectedType:this.selectedType})
      },
      openEdit(item){
        this.$refs['editAttribute'].show({typeItems:this.typeItems,selectedType:this.selectedType,item})
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

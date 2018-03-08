<template>
    <Modal ref="addModal" :width="900" v-model="isShow" title="新增类型" :loading="loading" @on-ok="handleSubmit('formValidate')" @on-cancel="handleReset('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="所属类型">
                <Cascader :data="cascaderDataItems" @on-change="changeCascader" change-on-select :value="value"></Cascader>
            </FormItem>
            <FormItem label="类型名称" prop="typeName">
                <Input v-model="formValidate.typeName" placeholder="请输入你的类型名称"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
  import MallTypeApi from '../../../../api/MallTypeApi'

  export default {
    name:'addType',
    data () {
      return {
        value:[1, 10, 12],
        cascaderDataItems:[],
        loading:true,
        isShow:false,
        formValidate: {
          typeName: ''
        },
        ruleValidate: {
          typeName: [
            { required: true, message: '必须输入类型名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      changeCascader:function(value){
        this.value=value
      },
      open:function({cascaderDataItems,item}){
        let idLink=''
        if(item){
          idLink=item.idLink+','+item.id
        }
        idLink=idLink||''
        let idLinkArray = idLink.split(',')
        idLinkArray=idLinkArray.map((item)=>parseInt(item))
        idLinkArray.shift()
        this.value=idLinkArray
        this.cascaderDataItems=cascaderDataItems
        this.isShow= true
      },
      handleSubmit (name) {
        const typeId=this.value.length?this.value[this.value.length-1]:0
        let idLink = this.value.join(",")
        idLink=idLink.length?('0,'+idLink):'0'
        this.$refs[name].validate(async(valid) => {
          if (valid) {
            const res = await MallTypeApi.save(Object.assign({},this.formValidate,{typeId,idLink}))
            this.$Message.success(res.message)
            this.handleReset(name)
            this.$refs['addModal'].buttonLoading=false
            this.$emit("add-type-suc")
          } else {
            this.$refs['addModal'].buttonLoading=false
            this.$Message.error('表单验证失败');
          }
        })
      },
      handleReset (name) {
        this.isShow=false
        this.$refs[name].resetFields();
      }
    }
  }
</script>
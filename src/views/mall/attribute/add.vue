<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                添加属性
            </p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="所属类型">
                    <Select v-model="formValidate.typeId">
                        <Option v-for="item in typeItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="属性名称" prop="attributeName">
                    <Input v-model="formValidate.attributeName" placeholder="请输入属性名称"></Input>
                </FormItem>
                <FormItem style="text-align: center">
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    <Button type="ghost" @click="returnToIndex" style="margin-left: 8px">返回</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
  import MallTypeApi from '@/api/MallTypeApi'
  import MallAttributeApi from '@/api/MallAttributeApi'

  export default {
    data () {
      return {
        typeItems:[],
        formValidate: {
          attributeName: '',
          typeId:'',
        },
        ruleValidate: {
          attributeName: [
            { required: true, message: '属性不能为空', trigger: 'blur' }
          ],
          typeId: [
            { required: true, message: '请选择所属类型', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      returnToIndex(){
//        this.$router.go(-1)
        this.$router.push({ name: 'attribute'})
      },
      async init () {
        await this.findBaseType()
      },
      async findBaseType(){
        const res = await MallTypeApi.findBaseType()
        this.typeItems=res.data.map(el=>{return {label:el.typeName,value:el.id}})
        this.selectedType =this.typeItems.length?this.typeItems[0].value:0
      },
      handleSubmit (name) {
        this.$refs[name].validate(async(valid) => {
          if (valid) {
            const res = await MallAttributeApi.save(this.formValidate)
            this.$Message.success(res.message)
            this.handleReset(name)
          } else {
            this.$Message.error('表单验证失败');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

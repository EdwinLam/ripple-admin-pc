<template>
    <div v-show="visible">
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                添加属性
            </p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="所属类型" prop="formValidate">
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
  import MallAttributeApi from '@/api/MallAttributeApi'

  export default {
    data () {
      return {
        visible:false,
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
      show({typeItems,selectedType}){
        this.visible = true
        this.typeItems = typeItems
        this.formValidate.typeId=selectedType
      },
      returnToIndex(){
        this.visible = false
        this.$emit('return-index')
        this.handleReset('formValidate')
      },
      handleSubmit (name) {
        this.$refs[name].validate(async(valid) => {
          if (valid) {
            const res = await MallAttributeApi.save(this.formValidate)
            this.$Message.success(res.message)
            this.handleReset(name)
            this.visible = false
            this.$emit('add-suc')
          } else {
            this.$Message.error('表单验证失败');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  };
</script>

<template>
    <Modal ref="addModal" :width="900" v-model="isShowAdd" title="新增账号" :loading="loading" @on-ok="handleSubmit('formValidate')" @on-cancel="handleReset('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="号码" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入你的号码"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email" placeholder="请输入你的email"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
  import AccountApi from '../../../../api/AccountApi'

  export default {
    name:'addAccount',

    data () {
      return {
        loading:true,
        isShowAdd:false,
        formValidate: {
          phone: '',
          email: '',
        },
        ruleValidate: {
          phone: [
            { required: true, message: '号码不能为空', trigger: 'blur' }
          ],
          mail: [
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      open:function(){
        this.isShowAdd=true
      },
      handleSubmit (name) {
        this.$refs[name].validate(async(valid) => {
          if (valid) {
            const res = await AccountApi.save(this.formValidate)
            this.$refs[name].resetFields()
            this.$Message.success(res.message)
            this.isShowAdd=false
            this.$refs['addModal'].buttonLoading=false
            this.$emit("add-account-suc")
          } else {
            this.$refs['addModal'].buttonLoading=false
            this.$Message.error('表单验证失败');
          }
        })
      },
      handleReset (name) {
        this.isShowAdd=false
        this.$refs[name].resetFields();
      }
    }
  }
</script>
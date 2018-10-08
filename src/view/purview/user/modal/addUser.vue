<template>
  <div>
    <image-view ref="imageViewModal"></image-view>
    <Modal title="添加用户" v-model="visible" :mask-closable='false' :width="500" :styles="{top: '30px'}">
      <Form ref="userForm" :model="userForm" :label-width="70" :rules="userFormValidate">
        <FormItem label="用户名" prop="username">
          <Input v-model="userForm.username" autocomplete="off"/>
        </FormItem>
        <FormItem label="密码" prop="password" :error="errorPass">
          <Input type="password" v-model="userForm.password" autocomplete="off"/>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="userForm.email"/>
        </FormItem>
        <FormItem label="手机号" prop="mobile">
          <Input v-model="userForm.mobile"/>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="userForm.sex">
            <Radio :label="1">男</Radio>
            <Radio :label="0">女</Radio>
          </RadioGroup>
        </FormItem>
        <Form-item label="头像" prop="avatar">
          <Poptip trigger="hover" title="图片预览" placement="right" width="350">
            <Input v-model="userForm.avatar" placeholder="可直接填入网络图片链接" clearable/>
            <div slot="content">
              <img :src="userForm.avatar" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
              <a @click="viewPic()" style="margin-top:5px;text-align:right;display:block">查看原图</a>
            </div>
          </Poptip>
          <Upload :action="uploadUrl"
          :headers="accessToken"
          :on-success="handleSuccess"
          :on-error="handleError"
          :format="['jpg','jpeg','png','gif']"
          :max-size="5120"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="beforeUpload"
          ref="up"
          class="upload">
          <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </Form-item>
        <Form-item label="所属部门" prop="departmentTitle">
          <Poptip trigger="click" placement="right" title="选择部门" width="250">
            <div style="display:flex;">
              <Input v-model="userForm.departmentTitle" readonly style="margin-right:10px;"/>
              <Button icon="md-trash" @click="clearSelectDep">清空已选</Button>
            </div>
            <div slot="content">
              <Tree :data="dataDep" :load-data="loadDataTree" @on-select-change="selectTree"></Tree>
              <Spin size="large" fix v-if="loading"></Spin>
            </div>
          </Poptip>
        </Form-item>
        <FormItem label="角色分配" prop="roles">
          <Select v-model="userForm.roles" multiple>
            <Option v-for="item in roleItems" :value="item.id" :key="item.id" :label="item.name">
              <!-- <div style="display:flex;flex-direction:column"> -->
              <span style="margin-right:10px;">{{ item.roleName }}</span>
              <span style="color:#ccc;">没有描述哦</span>
              <!-- </div> -->
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="close">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="save">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import ImageView from './imageView'
import config from '@/config'
export default {
  components: {
    ImageView
  },
  methods: {
    init () {
      this.uploadUrl = (process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro) + '/upload/file'
      this.accessToken = {
        accessToken: this.$store.state.app.token
      }
    },
    reset () {
      this.$refs.userForm.resetFields()
    },
    open () {
      this.reset()
      this.visible = true
    },
    close () {
      this.visible = false
    },
    save () {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          this.submitLoading = true
          await this.$store.dispatch('addUser', this.userForm)
          this.submitLoading = false
          this.$UI.successMsg({ message: '添加成功' })
          this.visible = false
          this.$emit('ok')
        }
      })
    },
    loadDataTree (item, callback) {

    },
    selectTree () {

    },
    viewPic () {
      this.viewImage = true
    },
    clearSelectDep () {
      this.userForm.departmentId = ''
      this.userForm.departmentTitle = ''
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '不支持的文件格式',
        desc:
          '所选文件‘ ' +
          file.name +
          ' ’格式不正确, 请选择 .jpg .jpeg .png .gif格式文件'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件大小过大',
        desc: '所选文件‘ ' + file.name + ' ’大小过大, 不得超过 5M.'
      })
    },
    beforeUpload () {
      return true
    },
    handleSuccess (res, file) {
      file.url = res.data
      this.userForm.avatar = res.data
    },
    handleError (error, file, fileList) {
      this.$Message.error(error.toString())
    }
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      selectDep: [],
      dataDep: [],
      department: [],
      loading: false,
      uploadUrl: '',
      accessToken: {},
      errorPass: '',
      roleItems: this.$store.state.role.allRolesItems,
      userForm: {
        sex: 1,
        type: 0,
        avatar: 'https://s1.ax1x.com/2018/05/19/CcdVQP.png',
        roles: [],
        departmentId: '',
        departmentTitle: ''
      },
      userFormValidate: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码最小为6位', trigger: 'blur' }

        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '邮箱格式不正确' }
        ]
      },
      submitLoading: false,
      visible: false
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style>
  .ivu-poptip, .ivu-poptip-rel {
    display: inline-block;
    width: 100%;
  }
  .search .operation {
    margin-bottom: 2vh;
  }
  .br button, .operation button {
    margin-right: 5px;
  }
</style>

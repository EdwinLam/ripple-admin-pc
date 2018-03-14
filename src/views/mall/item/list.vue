<template>
    <div v-show="visible">
        <Card style="padding-bottom:50px">
            <p slot="title">
                <Icon type="person"></Icon>
                品牌管理
            </p>
            <Row style="margin-bottom:10px">
                <Col span="18">
                <Select v-model="selectedType" style="width:200px" @on-change="onChange">
                    <Option v-for="item in typeItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="6" style="text-align: right">
                <Button type="primary" @click="openAdd">添加属性</Button>
                </Col>
            </Row>
            <Table border :columns="dataColumns" :data="dataItems" :loading="loading"></Table>
            <div style="margin-top:10px">
                <div style="float: right;">
                    <Page :total="total" :current="pageNo" size="small" show-elevator show-sizer
                          @on-change="queryPage" @on-page-size-change="changePageSize"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
  import MallAttributeApi from '@/api/MallAttributeApi'
  import { formatDate } from '@/utils/DateUtil'

  export default {
    data () {
      return {
        visible: false,
        dataItems: [],
        typeItems: [],
        selectedType: 0,
        dataColumns: [
          {
            title: '名称',
            key: 'attributeName'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openEdit(params, params.index)
                    }
                  }
                }, '修改'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.destroy(params, params.index)
                    }
                  }
                }, [
                  h('Button', {
                    style: {
                      margin: '0 5px'
                    },
                    props: {
                      type: 'error',
                      placement: 'top'
                    }
                  }, '删除')
                ])]);
            }
          }
        ],
        loading: false,
        total: 0,
        phone: '',
        pageNo: 1,
        pageSize: 10
      }
    },
    methods: {
      show({typeItems, selectedType, initData}){
        this.visible = true
        this.typeItems = typeItems
        this.selectedType = selectedType
        if (initData)
          this.init()
      },
      async init () {
        await this.queryPage(1)
        this.isInit = false
      },
      onChange(){
        this.queryPage(1)
      },
      openDel(){
      },
      openAdd(){
        this.visible = false
        this.$emit('open-add')
      },
      openEdit(val, index){
        const item = this.dataItems[index]
        this.visible = false
        this.$emit('open-edit', item)
      },
      async destroy(val, index){
        const item = this.dataItems[index]
        const res = await MallAttributeApi.destroy(item.id)
        this.$Message.success(res.message)
        this.dataItems.splice(index, 1)
      },
      async queryPage(pageNo){
        pageNo = pageNo ? pageNo : this.pageNo
        const ctx = this
        ctx.loading = true
        const res = await MallAttributeApi.queryPage({
          typeId: this.selectedType,
          pageNo: pageNo,
          pageSize: this.pageSize
        })
        ctx.loading = false
        this.dataItems = res.data.rows
        this.total = res.data.count
        this.pageNo = pageNo
      },
      changePageSize(pageSize){
        this.pageSize = pageSize
        this.queryPage(1)
      }
    }
  }
</script>

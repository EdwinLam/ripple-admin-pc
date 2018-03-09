<template>
    <div>
        <Card style="padding-bottom:50px">
            <p slot="title">
                <Icon type="person"></Icon>
                属性管理
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
  import MallTypeApi from '@/api/MallTypeApi'
  import {formatDate} from '@/utils/DateUtil'

  export default {
    data () {
      return {
        typeItems:[],
        selectedType:0,
        dataItems:[],
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
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        loading: false,
        total: 0,
        phone: '',
        pageNo: 1,
        pageSize: 10,
      }
    },
    methods: {
      async init () {
        await this.findBaseType()
        await this.queryPage()
      },
      onChange(){
        this.queryPage()
      },
      openAdd(){
        this.$router.push({ name: 'addAttribute'})
      },
      async findBaseType(){
        const res = await MallTypeApi.findBaseType()
        this.typeItems=res.data.map(el=>{return {label:el.typeName,value:el.id}})
        this.selectedType =this.typeItems.length?this.typeItems[0].value:0
      },
      async queryPage(pageNo){
        const ctx = this
        ctx.loading = true
        const res = await MallAttributeApi.queryPage({
          typeId:this.selectedType,
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
    },
    created () {
      this.init();
    }
  }
</script>

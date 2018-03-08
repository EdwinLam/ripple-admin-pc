<style lang="less">
    @import './typeTree.less';
</style>
<template>
    <div>
    <Row style="margin-bottom: 10px;text-align: right">
        <Button type="primary" @click="openAdd">添加类型</Button>
    </Row>
    <Tree :data="dataItems" :render="renderContent"></Tree>
    </div>
</template>
<script>
  import MallTypeApi from '../../../../api/MallTypeApi'
  import DataUtil from '@/utils/DataUtil'
  export default {
    data () {
      return {
        dataItems: [],
        cascaderDataItems:[],
        typeName: '',
        buttonProps: {
          type: 'ghost',
          size: 'small',
        }
      }
    },
    methods: {
      openAdd(){
        this.$emit('open-add',{cascaderDataItems:this.cascaderDataItems})
      },
      async queryAll(){
        const res = await MallTypeApi.findAll()
        const treeData = DataUtil.toTreeData({
          sourceData: res.data,
          key: 'typeName',
          idKey: 'id',
          parentIdKey: 'typeId'
        })
        this.cascaderDataItems=DataUtil.toCascaderData({
          sourceData: res.data,
          key: 'typeName',
          idKey: 'id',
          parentIdKey: 'typeId'
        })
        this.dataItems = treeData
      },
      renderContent (h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('span', {style: {fontSize: '16px'}}, data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '30px'
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-plus-empty'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.append(data) }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-minus-empty'
              }),
              on: {
                click: () => { this.remove(root, node, data) }
              }
            })
          ])
        ]);
      },
      append (data) {
        this.$emit('open-add',{item:data,cascaderDataItems:this.cascaderDataItems})
      },
      async remove (root, node, data) {
        const res = await MallTypeApi.destroy(data.id)
        this.$Message.success(res.message)
        this.$emit('remove-suc')
      }
    }
  }
</script>
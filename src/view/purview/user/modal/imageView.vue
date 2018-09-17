<template>
  <Modal title="图片预览" v-model="modalVisible" :styles="{top: '30px'}">
    <img :src="imgUrl" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
  </Modal>
</template>
<script>
export default {
  methods: {
    open (imgUrl) {
      this.imgUrl = imgUrl
      this.modalVisible = true
    },
    close () {
      this.modalVisible = false
    }
  },
  data () {
    return {
      modalVisible: false,
      imgUrl: ''
    }
  }
}
</script>

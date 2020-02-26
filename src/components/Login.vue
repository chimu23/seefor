<template>
<el-dialog
  title="提示"
  :visible.sync="true"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button>取 消</el-button>
    <el-button type="primary" >确 定</el-button>
  </span>
</el-dialog>

</template>

<script>
export default {

  created () {

  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

</style>

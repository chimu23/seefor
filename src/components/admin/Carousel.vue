<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>影片管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="根据影片搜索" v-model="queryInfo.query" clearable @clear="getMovies">
            <el-button slot="append" icon="el-icon-search" @click="getMovies"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="dialogVisible=true">新增影片</el-button>
        </el-col>
      </el-row>
      <el-table :data="movieList" style="width: 100%" border stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="mname" label="影片名"></el-table-column>
        <el-table-column label="操作" width="230px" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editByID(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeByMname(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-size="8"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog
      title="影片信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleDialogClose"
    >
      <el-form ref="subInfoRef" :model="subInfo" label-width="80px">
        <el-form-item label="影片名 :">
          <el-input v-model="subInfo.mname"></el-input>
        </el-form-item>
        <el-form-item label="图片地址 :">
          <el-input v-model="subInfo.limg"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="subItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created () {
    this.getMovies()
  },
  data () {
    return {
      total: 0,
      queryInfo: {
        currentPage: 1,
        query: ''
      },
      movieList: [],
      dialogVisible: false,
      subInfo: {
        mname: '',
        limg: ''
      }
    }
  },
  methods: {
    handleCurrentChange (e) {
      this.queryInfo.currentPage = e
      this.getMovies()
    },
    async getMovies () {
      const { data: res } = await this.$http.get('/admin/carousel', {
        params: this.queryInfo
      })
      if (res.msg !== 200) {
        return this.$message.error('获取错误，请稍后重试')
      }
      this.movieList = res.data
      this.total = res.total
    },
    async removeByMname (row) {
      const { Id } = row
      const { data: res } = await this.$http.delete('/admin/carousel', {
        params: { Id }
      })

      if (res.msg !== 200) {
        return this.$message.error('删除失败，请稍后重试')
      }
      const index = this.movieList.findIndex(item => {
        return item.Id === Number(Id)
      })
      this.movieList.splice(index, 1)
      this.total -= 1
      if (this.total === 0) {
        this.movieList = []
      }
      return this.$message.success('已删除')
    },
    handleDialogClose () {
      this.dialogVisible = false
      this.$refs.subInfoRef.resetFields()
      this.subInfo = {}
    },
    async subItem () {
      const { data: res } = await this.$http.post(
        '/admin/carousel',
        this.subInfo
      )
      if (res.status !== 200) { return this.$message.error('发生了错误，请稍后重试') }
      this.handleDialogClose()
      this.$message.success('数据库已更新')
      this.getMovies()
    },
    async editByID (row) {
      const { data: res } = await this.$http.get('/admin/carousel', {
        params: { query: row.mname }
      })
      this.dialogVisible = true
      this.subInfo = res.data[0]
    }
  }
}
</script>

<style lang='less' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-table {
  margin-top: 15px;
  font-size: 12px !important;
  text-align: center;
}
</style>

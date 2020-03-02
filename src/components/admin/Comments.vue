<template>
<div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>

    </el-breadcrumb>
     <el-card class="box-card">
<el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="根据影片名模糊搜索" v-model="queryInfo.query" clearable @clear="getCommentsList">
            <el-button slot="append" icon="el-icon-search" @click="getCommentsList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="commentsList" style="width: 100%" border stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="mname" label="影片名" width="180"></el-table-column>
        <el-table-column prop="userID" label="用户ID" width="180"></el-table-column>
        <el-table-column prop="comment" label="评论内容" width="180"></el-table-column>
        <el-table-column prop="comment" label="时间" width="180">
          <template slot-scope="scope">
            {{scope.row.time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230px" align="center">
          <template slot-scope="scope">

            <el-button type="danger" icon="el-icon-delete" size="mini"
               @click="removeById(scope.row.id)"></el-button>

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
</div>
</template>

<script>
export default {
  created () {
    this.getCommentsList()
  },
  data () {
    return {
      commentsList: [],
      total: 15,
      queryInfo: {
        query: '',
        currentPage: 1
      }

    }
  },
  methods: {
    handleCurrentChange (e) {
      this.queryInfo.currentPage = e
      this.getCommentsList()
    },
    async removeById (id) {
      const { data: res } = await this.$http.delete('/admin/comments',
        { params: { id } })
      if (res.msg === 200) {
        this.getCommentsList()
        return this.$message.success('删除成功')
      } else {
        return this.$message.error('修改失败，请稍后重试')
      }
    },
    async getCommentsList () {
      this.queryInfo.page = (this.queryInfo.currentPage - 1) * 8
      const { data: res } = await this.$http.get('/admin/comments', {
        params: this.queryInfo
      })
      console.log(res)

      this.commentsList = res.data
      this.total = res.total
    }
  }
}
</script>

<style lang='less' scoped>
.el-breadcrumb{
    margin-bottom: 15px;
}
.el-table{
    margin-top: 15px;
    font-size: 12px !important;
    text-align: center
}
</style>

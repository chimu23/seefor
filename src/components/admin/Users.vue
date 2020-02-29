<template>
<div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="搜索用户" v-model="queryInfo.query" clearable @clear="getUserLits">
            <el-button slot="append" icon="el-icon-search" @click="getUserLits"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="userlist" style="width: 100%" border stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>

        <el-table-column label="状态" width="180px" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStatusChange(scope.row)"
            ></el-switch>
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
    this.getUserLits()
  },
  data () {
    return {
      dialogVisible: false,
      userlist: [],
      total: 0,
      queryInfo: {
        query: '',
        currentPage: 1
      }

    }
  },
  methods: {
    async getUserLits () {
      this.queryInfo.page = (this.queryInfo.currentPage - 1) * 8
      const { data: res } = await this.$http.get('/admin/users', {
        params: this.queryInfo
      })
      //   console.log(res)
      res.data.forEach(v => {
        if (v.status === 1) {
          v.duty = false
        } else {
          v.status = true
        }
      })
      console.log(res)
      if (res.msg === 301) {
        this.$message.error('无访问权限')
        return this.$router.push('/')
      } else {
        this.userlist = res.data
        this.total = res.total
      }
    },
    async userStatusChange (row) {
      var { id, status } = row
      if (status === false) { status = 1 } else { status = 0 }
      const { data: res } = await this.$http.put('/admin/users', {
        id,
        status
      })
      if (res.msg === 200) {
        this.$message.success('修改状态成功')
      } else {
        row.status = !row.status
        return this.$message.error('修改状态失败，请稍后重试')
      }
    },
    async removeById (id) {
      const { data: res } = await this.$http.delete('/admin/users', { params: { id } })

      if (res.msg === 200) {
        this.getUserLits()
        return this.$message.success('删除成功')
      } else {
        return this.$message.error('修改失败，请稍后重试')
      }
    },
    handleCurrentChange (e) {
      this.queryInfo.currentPage = e
      this.getUserLits()
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

<template>
<div>    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>影片管理</el-breadcrumb-item>

    </el-breadcrumb>
     <el-card class="box-card">
<el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="根据影片搜索"
          v-model="queryInfo.query"
          clearable
          @clear="getMovies">
            <el-button slot="append" icon="el-icon-search" @click="getMovies"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="dialogVisible=true">新增影片</el-button>

        </el-col>

      </el-row>
      <el-table :data="movieList" style="width: 100%" border stripe>
         <el-table-column type="expand" >
           <template slot-scope="scope">
            <div>剧情简介 :  </div><span>{{scope.row.introduce}}</span>
           </template>
         </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="mname" label="影片名" ></el-table-column>
        <el-table-column prop="director" label="导演" ></el-table-column>
        <el-table-column prop="region" label="国家" ></el-table-column>
        <el-table-column prop="language" label="语言" ></el-table-column>
        <el-table-column prop="star" label="评分" ></el-table-column>
        <el-table-column label="操作" width="230px" align="center">
          <template slot-scope="scope">

            <el-button type="danger" icon="el-icon-delete" size="mini"
               @click="removeByMname(scope.row)"></el-button>

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
  title="新增影片"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleDialogClose">
  <el-form ref="subInfoRef" :model="subInfo" label-width="80px">
  <el-form-item label="影片名 :">
    <el-input v-model="subInfo.mname"></el-input>
  </el-form-item>
    <el-form-item label="评分 :">
    <el-input v-model="subInfo.star" type="number"></el-input>
  </el-form-item>
    <el-form-item label="导演 :">
    <el-input v-model="subInfo.director"></el-input>
  </el-form-item>
    <el-form-item label="演员 :">
    <el-input v-model="subInfo.actor"></el-input>
  </el-form-item>
    <el-form-item label="图片地址 :">
    <el-input v-model="subInfo.img"></el-input>
  </el-form-item>
    <el-form-item label="影视链接 :">
    <el-input v-model="subInfo.src"></el-input>
  </el-form-item>
    <el-form-item label="影视集数 :">
    <el-input v-model="subInfo.steps"></el-input>
  </el-form-item>
    <el-form-item label="地区 :">
    <el-input v-model="subInfo.region"></el-input>
  </el-form-item>
    <el-form-item label="语言 :">
    <el-input v-model="subInfo.language"></el-input>
  </el-form-item>
    <el-form-item label="上映时间 :">
    <el-input v-model="subInfo.time"></el-input>
  </el-form-item>
  <el-form-item label="介绍 :">
    <el-input v-model="subInfo.introduce"></el-input>
  </el-form-item>
  <el-form-item label="归属分类 :">
    <el-input v-model="subInfo.activeName"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
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
        star: 0,
        img: '',
        src: '',
        steps: 1,
        director: '',
        actor: '',
        region: '',
        language: '',
        time: '',
        activeName: '',
        introduce: ''
      }

    }
  },
  methods: {
    handleCurrentChange (e) {
      this.queryInfo.currentPage = e
      this.getMovies()
    },
    async getMovies () {
      const { data: res } = await this.$http.get('/admin/movies', {
        params: this.queryInfo
      })
      if (res.msg !== 200) {
        return this.$message.error('获取错误，请稍后重试')
      }
      this.movieList = res.data
      this.total = res.total
    },
    async removeByMname (row) {
      const { mname, activeName } = row
      const { data: res } = await this.$http.delete('/admin/movies', {
        params: { mname, activeName }
      })

      if (res.msg !== 200) {
        return this.$message.error('删除失败，请稍后重试')
      }
      const index = this.movieList.findIndex(item => { return item.mname === mname })
      this.movieList.splice(1, index)
      this.total -= 1
      if (this.total === 0) { this.movieList = [] }
      return this.$message.success('已删除')
    },
    handleDialogClose () {
      this.dialogVisible = false
      this.$refs.subInfoRef.resetFields()
      this.subInfo = {}
    },
    async subItem () {
      console.log(this.subInfo)
      const { data: res } = await this.$http.post('/admin/movies', this.subInfo)
      if (res.msg !== 200) return this.$message.error('添加错误，请稍后重试')
      this.$refs.subInfoRef.resetFields()
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getMovies()
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

<template>
  <el-container>
    <el-header>
      <div class="header">

        <router-link to="/"> <img  src="http://pic2.zhimg.com/v2-42eab18c98bc41d2f2597c349b6f20a5_b.gif" /></router-link>
        <el-button v-show="isLogin" size="mini" type="primary" plain @click="dialogVisible=true">登录 NOW</el-button>
<!-- 搜索输入框 -->
      <div class="search_box">
         <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select" :clearable="true">
             <el-button slot="append" icon="el-icon-search" @click="searchInput"></el-button>
          </el-input>
      </div>

        <div v-show="!isLogin" class="login_box">
     <router-link to="/user">     <el-avatar size="large">{{loginName}}</el-avatar></router-link>
          <el-button size="mini" type="danger" @click="logout">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-carousel :interval="4000" type="card" height="260px">
        <el-carousel-item v-for="item in Carousellist" :key="item.src">
          <router-link :to="'/detail/'+item.activeName+'/'+item.mname">
            <img :src="item.limg" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="热门推荐" name="hot">
            <ul class="photo_container">
              <li v-for="item in list" :key="item.src">
                <router-link :to="'/detail/'+activeName+'/'+item.mname">
                  <div class="photo">
                    <img :src="item.img" />
                  </div>
                  <div class="title">{{item.mname}}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="电影" name="movie">
            <ul class="photo_container">
              <li v-for="item in list" :key="item.src">
                <router-link :to="'/detail/'+activeName+'/'+item.mname">
                  <!-- <router-link :to="{name:'Detail',query:{name:'luban'}}"> -->
                  <div class="photo">
                    <img :src="item.img" />
                  </div>
                  <div class="title">{{item.mname}}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="连续剧" name="series">
            <ul class="photo_container">
              <li v-for="item in list" :key="item.src">
                <router-link :to="'/detail/'+activeName+'/'+item.mname">
                  <!-- <router-link :to="{name:'Detail',query:{name:'luban'}}"> -->
                  <div class="photo">
                    <img :src="item.img" />
                  </div>
                  <div class="title">{{item.mname}}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="综艺" name="variety">
            <ul class="photo_container">
              <li v-for="item in list" :key="item.src">
                <router-link :to="'/detail/'+activeName+'/'+item.mname">
                  <!-- <router-link :to="{name:'Detail',query:{name:'luban'}}"> -->
                  <div class="photo">
                    <img :src="item.img" />
                  </div>
                  <div class="title">{{item.mname}}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="动漫" name="anime">
            <ul class="photo_container">
              <li v-for="item in list" :key="item.src">
                <router-link :to="'/detail/'+activeName+'/'+item.mname">
                  <!-- <router-link :to="{name:'Detail',query:{name:'luban'}}"> -->
                  <div class="photo">
                    <img :src="item.img" />
                  </div>
                  <div class="title">{{item.mname}}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="12"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </el-main>
    <el-footer>
      <div>
        <div>本站所有资源来源于互联网网友交流,只供网络测试和学习交流所用、所有视频版权归原权利人，如有关视频侵犯了你的权益，请联系告之，我们将于第一时间删除！</div>
        <div>我们建议所有影视爱好者购买正版音像制品或去电影院观看最新大片。</div>
        <div>Seefor 祝您观影愉快</div>
      </div>
    </el-footer>
    <el-dialog
      title="登录(不存在则直接注册)"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item label="用户名 :" prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码 :" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="subLogin">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  created () {
    this.getCarousel()
    this.handleClick()
    this.show()
  },
  data () {
    return {
      Carousellist: [],
      activeName: 'hot',
      list: [],
      total: 0,
      currentPage: 1,
      dialogVisible: false,
      loginName: '',
      searchValue: '',
      isLogin: true,
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { max: 8, message: '长度不能超过8位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度不符合要求', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getCarousel () {
      const { data: res } = await this.$http.get('/carousel')
      this.Carousellist = res.data[0]
    },
    handleClick () {
      this.currentPage = 1

      this.getList()
    },
    handleCurrentChange (e) {
      this.currentPage = e
      this.getList()
    },
    async getList () {
      const { data: res } = await this.$http.get(
        `/all/${this.activeName}/${(this.currentPage - 1) * 12}`
      )
      if (res.meta.status !== 200) {
        return null
      }
      this.list = res.data.list
      this.total = res.data.total
    },
    handleClose () {
      this.dialogVisible = false
      this.$refs.loginForm.resetFields()
    },
    subLogin () {
      this.$refs.loginForm.validate(async v => {
        if (!v) {
          return
        }
        try {
          const config = await this.$http.post('/login', this.loginForm)
          window.sessionStorage.setItem('token', config.data.token)
          window.sessionStorage.setItem('name', config.data.name)
          this.$message.success('登录成功')
          this.$refs.loginForm.resetFields()
          this.loginName = config.data.name
          this.dialogVisible = false
          this.isLogin = false
          // this.getCollections()
          this.getColl()
        } catch (e) {
          if (e.status === 422) {
            this.$refs.loginForm.resetFields()
            return this.$message.error('密码错误了呢，请重新输入')
          }
          return this.$message.error('请重新登录下')
        }
      })
    },
    logout () {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('name')
      this.isLogin = true
    },
    show () {
      if (window.sessionStorage.getItem('token')) {
        this.isLogin = false
        this.loginName = window.sessionStorage.getItem('name')
      } else {
        this.isLogin = true
        this.loginName = window.sessionStorage.getItem('name')
      }
    },
    async searchInput () {
      console.log(this.searchValue)
      if (this.searchValue.trim().length > 0) {
        const { data: res } = await this.$http.get(`/search/${this.searchValue}`)

        if (res.msg === 1) { return this.$message.info('暂时没找到该内容呢') } else {
          this.$router.push(`/detail/${res.data[0].activeName}/${res.data[0].mname}`)
        }
      } else {
        return this.$message({
          showClose: true,
          type: 'error',
          duration: 800,
          center: true,
          message: '请先输入内容'
        })
      }
    },
    async getCollections () {
      const name = window.sessionStorage.getItem('name')
      const { data, status } = await this.$http.get(`/collections?name=${name}`)
      if (status !== 200) return
      window.sessionStorage.setItem('collection', JSON.stringify(data.data))
    },
    async getColl () {
      const name = window.sessionStorage.getItem('name')
      const { data: res } = await this.$http.get(`/collectionss?name=${name}`)
      window.sessionStorage.setItem('mcoll', JSON.stringify(res.data))
    }
  }
}
</script>

<style lang='less' scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-footer {
  height: 90px !important;
  font-size: 12px;
  > div > div {
    font-size: 12px;
    height: 18px;
    padding-bottom: 5px;
  }
}
.header {
  position: relative;
  display: flex;
  justify-content: center;
  img {
    position: absolute;
    left: 0;
    margin-top: 5px;
    width: 50px;
    height: 50px;
  }
  .el-button {
    position: absolute;
    right: 0;
    margin-top: 5px;
  }
  .search_box{
    align-self: center;
  }
  .login_box {
    align-self: right;
    // position: absolute;
    // right: 0;
    // margin-top: 5px;
    .el-avatar {
      position: absolute;
      right: 70px;
      margin-top: 3px;
      color: #657feb;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel {
  img {
    display: inline-block;
    height: auto;
    width: 100%;
  }
}

.el-tab-pane {
  display: flex;
  justify-content: center;
  // flex-flow: row wrap;
}

ul {
  list-style-type: none;
  display: flex;
  flex-flow: row wrap;
  margin: 0%;
  padding: 0%;
  justify-content: space-around;

  li {
    padding: 0 1rem;
    margin-top: 1rem;

    width: 140px;
    .photo {
      width: 150px;
      height: 220px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      color: #772514;
      text-align: center;
      padding-top: 5px;
    }
  }
}
.search_box{
  // display: flex;
  // width: 300px;
  .el-input{
     width: 330px;
     position: relative;
  }
  .el-button{
    position: absolute;
    top:-12%;
    right: 27%;
  }
}
</style>

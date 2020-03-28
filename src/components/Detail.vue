<template>
  <el-container>
    <el-header>
      <div class="header">
         <router-link to="/"> <img  src="http://pic2.zhimg.com/v2-42eab18c98bc41d2f2597c349b6f20a5_b.gif" /></router-link>
     <div v-show="isLogin" class="login_box">
          <el-avatar size="large">{{loginName}}</el-avatar>
          <el-button size="mini" type="danger" @click="logout">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item>影片详情</el-breadcrumb-item>
          <el-breadcrumb-item>{{mname}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="50">
          <el-col :span="2">
            <div class="grid-content bg-purple-dark photo_box"></div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-dark photo_box">
              <img v-bind:src="list.img" />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark text_box">
              <h3>{{list.mname}}</h3>
              <p>
                导演 :
                <span>{{list.director}}</span>
              </p>
              <p>
                主演 :
                <span>{{list.actor}}</span>
              </p>
              <p>
                类型 :
                <span>{{list.type}}</span>
              </p>
              <p>
                地区 :
                <span>{{list.region}}</span>
              </p>
              <p>
                语言 :
                <span>{{list.language}}</span>
              </p>
              <p>
                上映 :
                <span>{{list.time}}</span>
              </p>
              <p class="starScore">
                评分 :<el-rate
                    v-model="list.star"
                    disabled
                    show-score
                    text-color="#ff9900"
                  ></el-rate>
              </p>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple-dark introduce_box">
              <p>电影介绍</p>
            <span> {{list.introduce}}</span>
            </div>
          </el-col>
           <el-col :span="1">
            <div >
              <el-button  circle plain @click="drawer=true" icon="el-icon-edit"></el-button>
            </div>
             <div >
              <el-button  circle plain @click="subCollection" :icon="index?'el-icon-star-on':'el-icon-star-off'" class="collection"></el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="zxbf">在线播放</div>
        </el-row>
        <el-row>
          <div class="src_list">
            <ul>
              <li v-for="item in srcList" :key="item.src">
               <router-link  :to="'/play/'+activeName+'/'+mname+'/'+item.steps">
                <el-button type="danger">{{item.steps}}</el-button>
                </router-link>
              </li>
            </ul>
          </div>
        </el-row>
        <el-row class="comment_box">
          <el-col :span="24">
            <el-collapse @change="showComment">
  <el-collapse-item title="评论区" name="1">
   <ul >
     <li v-for="item in commentList" :key="item.id">
        <el-divider content-position="left" >
          <span class="comment_title">{{item.userID}}</span>

          </el-divider>
          <div class="spacecomment"> <span>{{item.comment}}</span>  <span>{{item.time | dateFormat}}</span></div></li>

   </ul>
  </el-collapse-item>
 </el-collapse></el-col>
        </el-row>

      </el-card>
    </el-main>
    <el-footer>
      <div>
        <div>本站所有资源来源于互联网网友交流,只供网络测试和学习交流所用、所有视频版权归原权利人，如有关视频侵犯了你的权益，请联系告之，我们将于第一时间删除！</div>
        <div>我们建议所有影视爱好者购买正版音像制品或去电影院观看最新大片。</div>
        <div>Seefor 祝您观影愉快</div>
      </div>
    </el-footer>
    <el-drawer
  title="添加评论"
  :visible.sync="drawer"
  :with-header="false"
  @open='openDrawer'
  :modal="false"
  class="addcomment_box">
<el-form ref="addCommentRef" label-position="top" :model="addComment" label-width="80px" class="addComment_box">
     <el-divider content-position="left"></el-divider>
  <el-form-item label="用户名称 :">
    <el-input disabled v-model="addComment.userID"></el-input>
  </el-form-item>
 <el-form-item label="评论内容 :">
    <el-input  v-model="addComment.query"></el-input>
  </el-form-item>

  <div style="text-align:center"><el-button type="primary" @click="pushComment" >发布评论</el-button></div>
</el-form>

</el-drawer>

  </el-container>
</template>

<script>
export default {
  created () {
    this.mname = this.$route.params.name
    this.activeName = this.$route.params.activeName
    this.getDetail()
    this.show()
    this.isCollection()
  },
  data () {
    return {
      mname: '',
      activeName: '',
      list: {}, // 渲染影片详细
      srcList: [],
      isLogin: false,
      loginName: '',
      drawer: false,
      commentList: [],
      addComment: {
        userID: '',
        query: '',
        mname: '',
        time: ''
      },
      index: false
    }
  },
  methods: {
    async getDetail () {
      const { data: res } = await this.$http.get(
        `/detail/${this.activeName}/${this.mname}`
      )
      this.list = res.data.list
      this.srcList = res.data.src
    },
    show () {
      if (window.sessionStorage.getItem('token')) {
        this.isLogin = true
        this.loginName = window.sessionStorage.getItem('name')
      } else {
        this.isLogin = false
        this.loginName = window.sessionStorage.getItem('name')
      }
    },
    logout () {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('name')
      this.isLogin = false
    },
    async showComment () {
      const { data: res } = await this.$http.get('/singlecomments', {
        params: this.mname
      })

      if (res.msg !== 200) return this.$message.error('获取评论失败，请稍后重试')
      this.commentList = res.data
    },
    openDrawer () {
      if (!window.sessionStorage.getItem('name')) {
        this.drawer = false
        return this.$message.error('请先登录')
      }
      this.addComment.userID = window.sessionStorage.getItem('name')
      this.addComment.mname = this.mname
    },
    async pushComment () {
      this.addComment.time = Date.now()
      const { data: res } = await this.$http.post('/addComment', this.addComment)

      if (res.status !== 200) return this.$message.error(res.msg)
      this.drawer = false
      this.addComment.query = ''
      this.$message.success(res.msg)
      this.showComment()
    }, // 判断是否收藏，改变icon的值
    isCollection () {
      const arry = JSON.parse(window.sessionStorage.getItem('mcoll'))
      if (!arry) return
      const theIndex = arry.findIndex(i => {
        return i === this.mname
      })
      if (theIndex === -1) { this.index = false } else {
        this.index = true
      }
    }, // 判断是否收藏，加入或者删除收藏
    async subCollection () {
      this.index = !this.index
      const data = JSON.parse(window.sessionStorage.getItem('mcoll'))
      const mmname = window.sessionStorage.getItem('name')
      if (this.index) {
        data.push(this.mname)
        window.sessionStorage.setItem('mcoll', JSON.stringify(data))
        this.$http.post('collectionss', {
          mmname,
          data
        })
      } else {
        const ii = data.findIndex(i => {
          return i === this.mname
        })
        data.splice(ii, 1)
        window.sessionStorage.setItem('mcoll', JSON.stringify(data))
        this.$http.post('collectionss', {
          mmname,
          data
        })
      }
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
  //   position: relative;
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
   .login_box {
    position: absolute;
    right: 0;
    margin-top: 5px;
    .el-avatar {
      position: absolute;
      right: 70px;
      margin-top: 3px;
      color: #657feb;
    }
  }
}
// 原始模板
.el-row:nth-child(3) {
  border: none;
}
.el-row {
  margin-top: 10px;
  padding-top: 25px;
  border-top: #c0c4cc solid 1px;
  .photo_box {
    width: 200px;
    height: 300px;
    img {
      width: 100%;
    }
  }
  .text_box {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    h3{
      color: #008000;
    }
    span {
      color: #337ab7;
    }
  }
  .introduce_box {
    p {
      color: #ff0000;
      font-weight: 700;
      font-size: 17px;
    }
    span{
        font-size: 15px;
          font-weight: 500;
          line-height: 25px;
          letter-spacing: .4px;
          text-indent: 2em !important;
    }
  }
}
.zxbf {
  margin-left: 36px;
}

.src_list {
  display: flex;
  justify-content: center;
  ul {
    list-style-type: none;
    margin: 0%;
    padding: 0%;
    width: 80%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    li {
      flex: 0 0 8%;
      margin: 8px 10px;
      .el-button {
        width: 70px;
      }
    }
  }
}
.starScore{
    display: flex;
    .el-rate{
        margin-left: 3px;
    }
}
.comment_box{
  padding-left: 40px;

  ul{
    list-style-type: none;
    li{
      .comment_title{
color: #c0c4cc
      }

    }
  }
}
.spacecomment{
  display: flex;
  justify-content: space-between;
   font-size: 16px !important;
 font-weight: 600;
 padding-left: 120px;
}
.collection{
  margin-top: 20px;
  color: red;
}
</style>

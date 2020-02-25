<template>
  <el-container>
    <el-header>
      <div class="header">
        <img src="http://pic2.zhimg.com/v2-42eab18c98bc41d2f2597c349b6f20a5_b.gif" />
        <el-button size="mini" type="warning">登录 NOW</el-button>
      </div>
    </el-header>
    <el-main>
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item>{{activeName}}</el-breadcrumb-item>
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
          <el-col :span="8">
            <div class="grid-content bg-purple-dark introduce_box">
              <p>电影介绍</p>
            <span> {{list.introduce}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="zxbf">在线播放</div>
        </el-row>
        <el-row>
          <div class="src_list">
            <ul>
              <li v-for="(item,i) in srcList" :key="item.src">
                <el-button type="danger">{{i+1}}</el-button>
              </li>
            </ul>
          </div>
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
  </el-container>
</template>

<script>
export default {
  created () {
    this.mname = this.$route.params.name
    this.activeName = this.$route.params.activeName
    this.getDetail()
  },
  data () {
    return {
      mname: '',
      activeName: '',
      list: {}, // 渲染影片详细
      srcList: []

    }
  },
  methods: {
    async getDetail () {
      const { data: res } = await this.$http.get(
        `/detail/${this.activeName}/${this.mname}`
      )
      this.list = res.data.list
      this.srcList = res.data.src
      console.log(this.list)
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
</style>

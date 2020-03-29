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
          <el-breadcrumb-item >在线播放</el-breadcrumb-item>
          <el-breadcrumb-item ><span style="cursor:pointer" @click="go">{{mname}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
       <div class="play_box">
             <video-player
       ref="videoPlayer"
       class="video-player vjs-custom-skin"
       :playsinline="true"
       :options="playerOptions"
      />
       </div>
         <el-row>
          <div class="src_list">
            <ul>
              <li v-for="(item,i) in srcList" :key="item.src">

                <el-button :type="steps==i?'danger':'plain'" @click="switchHandle(item.src)">{{item.step}}</el-button>

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
    this.steps = this.$route.params.steps
    // console.log(this.$route.params)
    // console.log('时间点1')
    this.getDetail()
    this.show()
  },
  mounted () {
    this.player = this.$refs.videoPlayer.player
  },
  data () {
    return {
      mname: '',
      activeName: '',
      isLogin: false,
      loginName: '',
      dp: null,
      srcList: [],
      steps: 1,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            // type: 'normal', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: 'http://v3.szjal.cn/20191221/Z5jYL0wU/index.m3u8' // url地址
          }
        ],
        hls: true,
        poster: 'http://b-ssl.duitang.com/uploads/item/201706/06/20170606092356_VKYxC.thumb.700_0.gif', // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      player: null
    }
  },
  methods: {
    play () {
      console.log('play callback')
    },
    switchHandle (src) {
      this.player.src(src)
      this.player.play()
    },
    async getDetail () {
      const { data: res } = await this.$http.get(
        `/detail/${this.activeName}/${this.mname}`
      )
      const arry = res.data.src[0].src.split(' ')
      arry.forEach(element => {
        var a = {}
        a.step = element.split('$')[0]
        a.src = element.split('$')[1]
        this.srcList.push(a)
      })
      this.switchHandle(this.srcList[this.steps].src)
    },
    go () {
      this.$router.go(-1)
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
.play_box{
    display: flex;
    justify-content: center;
    margin-top: 30px;

.video-player{
    width: 92%;

}
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
        width: 90px;
      }
    }
  }
}
</style>

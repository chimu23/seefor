<template>
  <el-container>
    <el-header>
      <div class="header">
        <img src="http://pic2.zhimg.com/v2-42eab18c98bc41d2f2597c349b6f20a5_b.gif" />
        <el-button size="mini" type="warning">登录 NOW</el-button>
      </div>
    </el-header>
    <el-main>
      <el-carousel :interval="4000" type="card" height="260px">
        <el-carousel-item v-for="item in Carousellist" :key="item.src">
          <img :src="item.src" />
        </el-carousel-item>
      </el-carousel>
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="热门推荐" name="hot">
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
  </el-container>
</template>

<script>
export default {
  created () {
    this.getCarousel()
    this.handleClick()
  },
  data () {
    return {
      Carousellist: [],
      activeName: 'hot',
      list: [],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    async getCarousel () {
      const { data: res } = await this.$http.get('/carousel')
      console.log(res)

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
      const { data: res } = await this.$http.get(`/all/${this.activeName}/${(this.currentPage - 1) * 12}`)
      if (res.meta.status !== 200) {
        return null
      }
      this.$message.success('获取数据成功')
      this.list = res.data.list
      this.total = res.data.total
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
  flex-flow: row wrap;
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
</style>

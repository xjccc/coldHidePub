<template>
<div>
  <Menu mode="horizontal" active-name="1">
    <div class="layout-assistant">
      <Menu-item name="1">发布货源</Menu-item>
    </div>
  </Menu>

  <div class="content">
    <div class="left">
      <p>我发布的货源 共{{goodsTotal}}条</p>
      <div class="itemHeight">
        <div class="item" v-for="item in myGoods">
          {{item}}
        </div>
      </div>
    </div>
    <div class="right">
      <Input v-model="textarea" type="textarea" :rows="15" placeholder="请输入货源信息" class="textarea"></Input>
      <Button type="success" long class="publish" @click="publishGoods">发布货源</Button>
    </div>
  </div>
</div>
</template>
<script>
import api from '../api/index.js'
export default {
  data () {
    return {
      goodsTotal: 0,
      textarea: '',
      showTips: false,
      tips: '',
      good: [],
      myGoods: [],  // 我发布的货源
      userData: []
    }
  },
  created () {
    this.getUsers()
  },
  beforeMount () {
    let myGoods = localStorage.getItem('myGoods')
    if (myGoods) {
      this.myGoods = JSON.parse(myGoods)
      this.goodsTotal = this.myGoods.length
      // localStorage.clear()
    } else {
      this.myGoods = []
      this.goodsTotal = 0
    }
  },
  methods: {
    getUsers () {
      api.getUsers({ts: +new Date()}).then(res => {
        this.userData = res.data
      })
    },
    trim (str) {  // 去除前面空格
      str = str.replace(/^\s+/g, '')
      return str
    },
    clickGoods () {
      this.name = '1'
      let myGoods = localStorage.getItem('myGoods')
      if (myGoods) {
        this.myGoods = JSON.parse(myGoods)
        this.goodsTotal = this.myGoods.length
        // localStorage.clear()
      } else {
        this.myGoods = []
        this.goodsTotal = 0
      }
    },
    // 取消提示
    cancleTips () {
      setTimeout(() => {
        this.showTips = false
      }, 1000)
    },
    // 发布货源
    publishGoods () {
      var index = Math.floor((Math.random() * (this.userData.length)))
      if (this.trim(this.textarea) === '') {
        this.showTips = true
        this.$Message.error('内容不能为空')
        this.cancleTips()
      } else {
        api.publishGoods({
          openId: this.userData[index].openid,
          isCarGo: 1, // 用户身份，1为货主，2为车主
          userName: this.userData[index].name,
          photo: this.userData[index].avatar,
          content: this.textarea,
          ts: +new Date()
        }).then(res => {
          console.log(res)
          var r = res.data
          if (r.data.info === 1) {
            this.goodsTotal += 1
            this.good = []
            this.good.unshift(this.textarea)
            this.textarea = ''
            this.myGoods = this.good.concat(this.myGoods)
            var str = JSON.stringify(this.myGoods)
            localStorage.setItem('myGoods', str)
          } else if (r.data.info === 2) {
            this.$Message.error('发布失败')
          } else {
            this.$Message.error('已被拉黑')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.layout-assistant {
  width: 100px;
  margin: 0 auto;
  height: inherit;
}

.container {
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  flex-direction: row;
  padding: 40px;
}

.left {
  flex: 1;
  padding: 0 40px;
  text-align: center;
  width: 600px;
}

.itemHeight {
  height: 600px;
  overflow-y: auto;
}

.left p {
  font-size: 24px;
  line-height: 24px;
}

.item {
  width: 500px;
  padding: 10px;
  margin: 20px auto;
  background: #fff;
  border: 1px solid #999;
  text-align: left;
  text-indent: 20px;
}

.right {
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 600px;
  height: 500px;
}

.ivu-input {
  resize: none;
}

.textarea {
  flex: 1;
}

.publish {
  width: 200px;
  margin: 0 auto;
  margin-top: 40px;
}
</style>

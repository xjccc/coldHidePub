<template>
  <div class="Tablecontent">
    <div class="tableContent">
      <Table height="750" border :columns="columns" :data="list" stripe></Table>
    </div>
    <div style="margin: 10px;flex-direction: row-reverse;">
      <Page :total="total" show-elevator show-total :current="current" @on-change="changePage" :page-size="20" style="float:right"></Page>
    </div>
  </div>
</template>
<script>
import api from '../api/index.js'
export default {
  name: 'UserInfo',
  data () {
    return {
      UserId: '',
      listId: '',
      current: 1,
      total: 0,
      stylesColor: 'delete',
      columns: [
        {
          title: '已发布货源',
          key: 'user_content'
        },
        {
          title: '发布时间',
          key: 'add_time',
          width: 200
        },
        {
          title: '删除货源',
          key: 'delete',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: params.row.status === '1' ? 'error' : 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.deleteOwn(params.index)
                }
              }
            }, params.row.status === '1' ? '删除' : '恢复')
          }
        }
      ],
      list: []
    }
  },
  created () {
    this.UserId = this.$route.params.openid
    this.getRequest(this.UserId, this.current)
  },
  methods: {
    getRequest (UserId, page) {
      let UserData = {
        openId: UserId,
        page: page
      }
      api.getUserContentList(UserData).then(res => {
        let data = res.data.data
        this.list = data.list
        this.total = data.total
      })
    },
    changePage (e) {
      this.current = e
      this.getRequest(this.UserId, this.current)
    },
    tip (title, content, status, src, index, sucTip) {
      this.$Modal.confirm({
        title: title,
        content: content,
        onOk: () => {
          let deleteData = {
            id: this.listId,
            status: status,
            ts: +new Date()
          }
          api.deleteSource(deleteData).then(res => {
            this.$Message.info(sucTip)
            this.getRequest(this.UserId, this.current)
          })
        }
      })
    },
    deleteOwn (index) {
      this.listId = this.list[index].id
      let status = this.list[index].status
      let src = this.list[index].src
      if (status === '1') {
        this.tip('删除操作', '是否确认删除', 2, src, index, '删除成功')
      } else {
        this.tip('恢复操作', '是否确认恢复', 1, src, index, '恢复成功')
      }
    }
  }
}
</script>
<style>
</style>

<template>
  <div class="Tablecontent">
    <div class="tableContent">
      <Table @on-selection-change="seletSomeList" @on-select-all="selectAllList" height="750" border :columns="columns" :data="list" stripe></Table>
    </div>
    <div style="margin: 10px;flex-direction: row-reverse;">
      <Page :total="total" show-elevator show-total :current="current" @on-change="changePage" :page-size="40" style="float:right"></Page>
    </div>
  </div>
</template>
<script>
import api from '../api/index.js'
export default {
  data () {
    return {
      current: 1,
      total: 0,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'id',
          key: 'id',
          width: 200
        },
        {
          title: '用户名',
          key: 'user_name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('span', params.row.user_name)
            ])
          }
        },
        {
          title: '发布内容',
          key: 'user_content'
        },
        {
          title: '已发布内容',
          key: 'show',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.show(params.index)
                }
              }
            }, '查看')
          }
        },
        {
          title: '删除货源',
          key: 'delete',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.deleteOwn(params.index)
                }
              }
            }, '删除')
          }
        }
      ],
      list: [],
      userId: ''
    }
  },
  created () {
    this.getRequest()
  },
  methods: {
    getRequest () {
      let ListData = {
        page: this.current,
        ts: +new Date()
      }
      api.getAllList(ListData).then(res => {
        let data = res.data.data
        this.list = data.list
        this.total = data.total
      })
    },
    changePage (e) {
      this.current = e
      this.getRequest()
    },
    show (index) {
      this.userId = this.list[index].open_id
      console.log(this.userId)
      this.$router.push('/operation/' + this.userId)
    },
    tip (title, content, status, sucTip) {
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
      if (status === '1') {
        this.tip('删除操作', '是否确认删除', 2, '删除成功')
      } else {
        this.tip('恢复操作', '是否确认恢复', 1, '恢复成功')
      }
    },
    seletSomeList (selection) {
      var c = []
      for (let key in selection) {
        c.push(selection[key].id)
      }
      console.log(c)
    },
    selectAllList (selection) {
      let selectAll = []
      for (let i = 0; i < selection.length; i++) {
        selectAll.push(selection[i].id)
      }
      let a
      a = selectAll.join(',')
      console.log(typeof a)
      console.log(selectAll)
    }
  }
}
</script>
<style>
</style>

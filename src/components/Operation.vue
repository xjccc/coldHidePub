<template lang="html">
  <div>
    <div class="search" v-if="this.$route.path === '/operation'">
      <Input v-model="searchValue" @on-enter="searchName">
        <Button slot="append" icon="ios-search" @click.native="searchName"></Button>
      </Input>
    </div>
    <div class="Tablecontent" v-if="this.$route.path === '/operation'">
      <div class="tableContent">
        <Table height="750" border :columns="columns" :data="list" stripe></Table>
      </div>
      <div style="margin: 10px;flex-direction: row-reverse;">
        <Page :total="total" show-elevator show-total :current="current" @on-change="changePage" :page-size="20" style="float:right"></Page>
      </div>
      <Modal v-model="showChange" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>身份转换</span>
        </p>
        <div style="text-align:center">
            <p>是否需要更换用户身份</p>
        </div>
        <div slot="footer">
            <Button type="primary" @click="carPosition">车主</Button>
            <Button type="primary" @click="goodsPosition">货主</Button>
        </div>
    </Modal>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import api from '../api/index.js'
export default {
  data () {
    return {
      searchValue: '',
      showChange: false,
      total: 0,
      current: 1, // 页数
      userId: '',
      columns: [
        {
          title: '用户id',
          key: 'open_id'
        },
        {
          title: '用户名',
          key: 'user_name'
        },
        {
          title: '发货条数',
          key: 'userTotal',
          align: 'center',
          sortable: true
        },
        {
          title: '联系电话', // index超出了，为什么
          key: 'user_phone',
          render: (h, params) => {
            return h('div', [
              h('span', `${this.opensId.indexOf(params.row.open_id) > -1 ? '' : params.row.user_phone}`)
            ])
          }
        },
        {
          title: '已发布内容',
          key: 'show',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                backgroundColor: '#3399ff',
                borderColor: '#3399ff'
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
          title: '车货更改',
          key: 'change',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                backgroundColor: '#3399ff',
                borderColor: '#3399ff'
              },
              on: {
                click: () => {
                  this.change(params.index)
                }
              }
            }, params.row.position === 0 ? '无身份' : (params.row.position === 1 ? '车主' : '货主'))
          }
        },
        {
          title: '放入小黑屋',
          key: 'defriend',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                backgroundColor: '#464c5b',
                borderColor: '#464c5b'
              },
              on: {
                click: () => {
                  this.defriend(params.index)
                }
              }
            }, '拉黑')
          }
        },
        {
          title: '关禁闭三天',
          key: 'disable',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                backgroundColor: '#ff3300',
                borderColor: '#ff3300'
              },
              on: {
                click: () => {
                  this.disable(params.index)
                }
              }
            }, '禁言三天')
          }
        }
      ],
      list: [],
      opensId: `o9WMY0aF-nBNrRuxZIfZNLD4-undefined-o9WMY0aF-nBNrRuxZIfZNLD4e2y8-o9WMY0U1VQXW-3lAbbr-M8AO5fFc-o9WMY0ZexqzIxWzMAXiX1wQD6snMamlzdXBlaV9qaWFzaHVud3VsaXU=amlzdXBlaV95aW5ndG9uZ2Rhd3VsamlzdXBlaV9zaHVhbmdwaW5nd3VsamlzdXBlaV95aW56aHV3dWxpdQ==amlzdXBlaV9mYW5neXVud3VsaXU=amlzdXBlaV96aG9uZ3RpYW53dWxpamlzdXBlaV93YW5mYW5nd3VsaXU=amlzdXBlaV90aWFueXV3dWxpdQ==amlzdXBlaV96aGVuZ3lhemh1YW55amlzdXBlaV94aW5rdWl3dWxpdQ==amlzdXBlaV9qaW5kYXpodWFueWV3amlzdXBlaV9qaW5jaGFuZ2d1b2ppamlzdXBlaV9mZWljaGl3dWxpdQ==amlzdXBlaV96b25naGVuZ3d1bGl1amlzdXBlaV9xaWxpeHVuaXd1bGl1amlzdXBlaV9odWF4aWF5aXRvbmd3amlzdXBlaV9mZW5nY2hpd3VsaXU=amlzdXBlaV9ob25neXVuZGF3dWxpamlzdXBlaV9jaGVuZ3l1YW53dWxpamlzdXBlaV9qaW5odWFuYW53dWxpamlzdXBlaV9oZW5naGV3dWxpdQ==amlzdXBlaV9wZW5naml3dWxpdQ==amlzdXBlaV9qaWFzaGVuZ3d1bGl1amlzdXBlaV9ndWlodWF3dWxpdQ==amlzdXBlaV9rdW54aW53dWxpdQ==amlzdXBlaV9vdWxpYnVjaG9uZ3d1amlzdXBlaV9xaWppZWJ1Y2hvbmd3amlzdXBlaV95aWNoZW5nd3VsaXU=amlzdXBlaV9saWFuZ3Vhbnd1bGl1amlzdXBlaV9qaW5wZW5nd3VsaXU=amlzdXBlaV96aG9uZ3l1YW53dWxpamlzdXBlaV95dWFuYm93dWxpdQ==amlzdXBlaV9iYW9oYW5nd3VsaXU=amlzdXBlaV9kYWd1YW5nZmF3dWxpamlzdXBlaV9mZWl5dW5kYXd1bGl1amlzdXBlaV90ZW5naG9uZ3d1bGl1amlzdXBlaV96aHVueGlud3VsaXU=amlzdXBlaV94aW5yaWJ1Y2hvbmd3amlzdXBlaV9kaWVyd2Vpd3VsaXU=amlzdXBlaV9wZW5nZGF3dWxpdQ==amlzdXBlaV9jYW5neXVud3VsaXU=amlzdXBlaV9xaWhlbmd3dWxpdQ==amlzdXBlaV94aW5naG9uZ3d1bGl1amlzdXBlaV9ob25nZnV3dWxpdQ==amlzdXBlaV9kYXl1YnVjaG9uZ3d1amlzdXBlaV96aGVuZ2Rhd3VsaXU=amlzdXBlaV9kaW5nc2hlbmd3dWxpamlzdXBlaV9ob25nbGl3dWxpdQ==amlzdXBlaV96aHVvamlld3VsaXU=amlzdXBlaV9qdW5kYWJ1Y2hvbmd3amlzdXBlaV9odWl4aW5tYW93dWxpYmFuZ3l1bnd1bGl1Z29uZ3NpYmFuZ2NoZW5nd3VsaXVnb25nc2k=amlzdXBlaV9iYW5nZGF3dWxpdWdvamlzdXBlaV9iYW5namlhd3VsaXVnamlzdXBlaV9iYW5ndGFpd3VsaXVnamlzdXBlaV9kaW5ndGFpd3VsaXVnamlzdXBlaV9kaW5nY2hlbmd3dWxpamlzdXBlaV9kaW5neGlud3VsaXVnamlzdXBlaV9kaW5nbWlud3VsaXVnamlzdXBlaV9kaW5nZGF3dWxpdWdvamlzdXBlaV9qaW5neXVld3VsaXVncGluZ3NoaXN1d3VsaXVnb25nc2k=a2FpYm93dWxpdWdvbmdzaWJ1Y2hveGlhbmRhd3VsaXVnb25nc2lidWNoeW91cWl3dWxpdWdvbmdzaWJ1Y2hveHVuamlld3VsaXVnb25nc2lidWNoeW9uZ3Rvbmd3dWxpdWdvbmdzaWJ1aG9uZ2Rhd3VsaXVnb25nc2lidWNoY2hhbmdkYXd1bGl1Z29uZ3NpYnVjeWl0b25nemhpeXVhbnd1bGl1Z29ueWlmYW53dWxpdWdvbmdzaWJ1cWlhbmh1aXd1bGl1Z29uZ3NpYnU=eGlueGl1d3VsaXVnb25nc2lidQ==YmFkYXd1bGl1Z29uZ3NpYnVjaG9ud3V5aXRvbmd3dWxpdWdvbmdzaQ==ZGF4dW50b25nd3VsaXVnb25nc2k=a3VhaXRvbmd3dWxpdWdvbmdzaQ==amlzdXBlaV9sb25nY2hlbmd3dWxpamlzdXBlaV9zaGFueGlueXV3dWxpaHVhemhhbnd1bGl1eW91eGlhbmdvY2hhbmdmYW53dWxpdXlvdXhpYW5nbmFuZ3Vhbmd3dWxpdXlvdXhpYW5namlzdXBlaV9zaGVuZ3poZW5nd3VsamlzdXBlaV94aW5qaWF3dWxpdQ==aG9uZ3h1bnd1bGl1eW91eGlhbmdvamlzdXBlaV9qaW5jaGVuZ3d1bGl1d2Fuamlhd3VsaXV5b3V4aWFuZ29ubWluZ3NodW53dWxpdXlvdXhpYW5nc2hpaml3dWxpdXlvdXhpYW5nb2duY2hlbm51b3d1bGl1eW91eGlhbmdvZGFzaGVuZ3d1bGl1eW91eGlhbmdvdGFpcGluZ3lhbmd3dWxpdXlvdXhpd3V5b3Vnd3VsaXV5b3V4aWFuZ29ueWluZ3l1YW53dWxpdXlvdXhpYW5nZ3VhbmdyaXd1bGl1eW91eGlhbmdvamluZ3NodW53dWxpdXlvdXhpYW5nYmluZ3hpbnd1bGl1eW91eGlhbmdveWlkYXd1bGl1eW91eGlhbmdvbmdzeWl0b25nd3VsaXV5b3V4aWFuZ29ucWltaW5nd3VsaXV5b3V4aWFuZ29u`
    }
  },
  created () {
    this.getList(this.current)
  },
  methods: {
    getList (page) {
      let UserListData = {
        page: page,
        ts: +new Date()
      }
      api.getUserList(UserListData).then(res => {
        let data = res.data.data
        this.list = data.list
        this.total = data.total
      })
    },
    tip (title, content, index, sucTip) {
      this.$Modal.confirm({
        title: title,
        content: content,
        onOk: () => {
          this.list.splice(index, 1)
          this.$Message.info(sucTip)
        }
      })
    },
    change (index) {
      this.showChange = true
      this.userId = this.list[index].open_id
    },
    changePositions (position) {
      let UserPositionData = {
        openId: this.userId,
        position: position,
        ts: +new Date()
      }
      api.changeUserPosition(UserPositionData).then(res => {
        this.showChange = false
        this.$Message.success('修改成功')
      })
    },
    carPosition () {
      this.$Modal.confirm({
        title: '更换身份',
        content: '是否确认更改为车主',
        onOk: () => {
          this.changePositions(1)
        }
      })
    },
    goodsPosition () {
      this.$Modal.confirm({
        title: '更换身份',
        content: '是否确认更改为货主',
        onOk: () => {
          this.changePositions(2)
        }
      })
    },
    show (index) {
      this.userId = this.list[index].open_id
      this.$router.push('/operation/' + this.userId)
    },
    disable (index) {
      this.$Modal.confirm({
        title: '禁言操作',
        content: '是否确认禁言',
        onOk: () => {
          let disableData = {
            openId: this.list[index].open_id,
            status: 2, // 状态1,拉黑,2禁言三天,3解除限制
            name: this.list[index].user_name,
            ts: +new Date()
          }
          api.updateUserStatus(disableData).then(res => {
            if (res.data.info === 'ok') {
              this.$Message.info('禁言成功')
            }
          })
        }
      })
    },
    defriend (index) {
      this.$Modal.confirm({
        title: '拉黑操作',
        content: '是否确认拉黑',
        onOk: () => {
          let disableData = {
            openId: this.list[index].open_id,
            status: 1, // 状态1,拉黑,2禁言三天,3解除限制
            name: this.list[index].user_name,
            ts: +new Date()
          }
          api.updateUserStatus(disableData).then(res => {
            if (res.data.info === 'ok') {
              this.$Message.info('拉黑成功')
            }
          })
        }
      })
    },
    changePage (e) {
      this.current = e
      this.getList(this.current)
    },
    searchName () {
      if (this.searchValue === '') {
        this.getList(this.current)
      } else {
        let nameData = {
          name: this.searchValue,
          ts: +new Date()
        }
        api.searchUserName(nameData).then(res => {
          if (res.data) {
            this.list = res.data
            console.log(res.data)
          } else {
            this.list = []
          }
        })
      }
    }
  }
}
</script>

<style lang="css">
.search{
  width: 40%;
  position: absolute;
  right: 10px;
}
.Tablecontent{
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}
</style>

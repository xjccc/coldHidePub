<template>
  <div id="app" class="layout">
    <Row type="flex" class="row">
      <i-col span="5" class="layout-menu-left">
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
          <div class="layout-logo-left">冷藏后台系统</div>
          <Menu-item name="1">
            <Icon type="ios-navigate"></Icon>
            <span class="layout-text">发布货源</span>
          </Menu-item>
          <Submenu name="2">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                操作管理
            </template>
            <Menu-item name="2-1">用户管理</Menu-item>
            <Menu-item name="2-2">黑名单</Menu-item>
            <Menu-item name="2-3">已删除货源</Menu-item>
            <Menu-item name="2-4">全部货源</Menu-item>
          </Submenu>
          <Menu-item name="3">
            <Icon type="ios-analytics"></Icon>
            <span class="layout-text">数据统计</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col span="19">
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }
  .row{
    height: 100%;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    height: 100%;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
    height: 100%;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    font-weight: 800;
  }
</style>

# 冷藏联盟后台系统
### 合法域名

```
url: https://56-api.kcimg.cn/
```
### 提交表单

#### 传入参数

```
data:{
  c: 'carrefrigerateapi',
  m: 'savecargo',
  isCarGo: 1,   // 用户身份，1为货主，2为车主
  openId: app.uid,
  userName:userInfo.userName,
  photo:userInfo.photo,
  formId: e.detail.formId,
  content: c,    // 输入内容
  ts:+new Date()
}
```

#### 返回数据

```
data:{
  info: 1    // 1为发布成功，2为发布不成功，3为被拉黑
}
```

###  获取黑名单用户

#### 传入参数

```
data:{
  c:'carcooladminapi',
  m:'getblacklist',
  ts:+ new Date(),
  page:1
}
```

#### 返回参数

```
{
info: "ok",
data: {
	info: 1,
	list: [
		{
		id: "145",
		open_id: "o9WMY0TUxzWo-Od-h6F-Ghd7W4xM",
		user_name: "远成集团（重庆公司）",
		status: "1",						状态  1是小黑屋
		updatetime: "2017-07-06 16:43:22"
		},
	],
	total: 59			总发帖数
}
}
```

###  将用户加入黑名单

#### 传入参数

```
data:{
  c:'carcooladminapi',
  m:'updateuserstatus',
  ts:+ new Date(),
  openId: ************
  name:  用户名
  status:  状态1,拉黑,2禁言三天,3解除限制
}
```

#### 返回参数

```
{
info: "ok",
data: {
	info:1
	}
}
```

###  删除货源

#### 传入参数

```
data:{
  c:'carcooladminapi',
  m:'deletesource',
  ts:+ new Date(),
  id: 货源ID
  status:  状态1,正常,2删除
}
```

#### 返回参数

```
{
info: "ok",
data: {
	info:1
	}
}
```

###  删除货源列表

#### 传入参数

```
data:{
  c:'carcooladminapi',
  m:'deletesourcelist',
  ts:+ new Date(),
  page:1
}
```

#### 返回参数

```
{
	info: "ok",
	data: {
		list: [
			{
			id: "34893",
			open_id: "amlzdXBlaV95aW5ndG9uZ2Rhd3Vs",
			user_name: "盈通达物流",
			user_photo: "https://s.kcimg.cn/gisopic/avatar/veimg-2.jpg",
			user_content: "苏州到泉州求7.6冷藏车 福州到郑州2.5吨冻品拼车 18759278880",
			add_time: "2017-07-13 14:35:23",
			click_phone: "0",
			form_id: "",
			status: "2",			删除状态  2是删除
			src: 1
			},
		],
		total: 604   删除货源总数
	}
}
```

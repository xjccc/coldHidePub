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

###  获取城市列表

#### 传入参数

```
data:{
  c:'carnewapi',
  m:'getcitylist',
  ts:+ new Date()
}
```

#### 返回参数

```
data:[
  {
    car_province:"京"
    id:"1"
    province:"北京"
    provinceid:"110000"
  }
]
```

### 获取省份搜索货源信息

#### 传入参数

```
data:{
  c:'carrefrigerateapi',
  m:'getcitycargolist',
  provinceId:that.data.provinceId,   // 省份id
  page:that.data.page,     // 请求页数
  isCarGo: 1,               // 1为货源，2为车源
  ts:+ new Date()
}
```

#### 返回参数

```
data:[
  {
    add_time:"1499915918"
    click_phone:"0"
    form_id:""
    id:"34850"
    open_id:"amlzdXBlaV9zaGVuZ3poZW5nd3Vs"
    phone_num:[["15201356407", "15210176588"]]
    status:"1"
    unionId:null
    user_content:"北京～～虎门菜需15米冷藏车↵北京～～广州蔬菜需15米冷藏车，↵张北～～广州蔬菜需15米冷藏车，↵张北～～虎门菜需15米13.7米12.5米冷藏车，↵廊坊～～凭祥卸货的蔬菜需15米13.7米冷藏车，↵张北～～广西南宁蔬菜需15米13.7米冷藏车，↵张北～～福建福州，厦门，泉州蔬菜需15米冷藏车，↵山东寿光～～广州，虎门萝卜需15米冷藏车↵山东寿光～～昆明萝卜需15米冷藏车↵.（微信同号），天天发货。空车来电，↵杨"
    user_name:"升正物流"
    user_photo:"https://s.kcimg.cn/gisopic/avatar/veimg-132.jpg"
  }
]
```

### 个人中心

#### 传入参数

```
data:{
  c:'carrefrigerateapi',
  m:'getsharedatelist',
  page: this.data.page, // 请求页数
  unionId:unionId,
  openid: openid,
  isCarGo:isCarGo,  // 用户身份
  ts: +new Date()
}
```

#### 返回数据

```
data:[
  info: 1,  // 1为有数据，2为没有数据，没有数据的时候，没有list
  list:[
    {
      add_time:"1499847861"
      click_phone:"0"
      form_id:"the formId is a mock one"
      id:"5"
      open_id:"oCuLv0GnvwF3rAi-HInXBdekealo"
      phone_num:[["18920859907"]]
      status:"1"
      user_content:"胜芳到西安户县要13米高栏拉钢管33吨"
      user_name:"路遥"
      user_photo:"https://wx.qlogo.cn/mmopen/vi_32/ia3D7VYPwKffA3Hjic2jN4epJ0fklGpQ4bPic2fKgah4H3N70LLb3wlAekjibobhmxE8L6FNQKMB3Xefzicz55zbfXg/0"
    }
  ]
]
```

###  获取用户列表

#### 传入参数

```
data:{
  c:'carcooladminapi',
  m:'getuserlist',
  ts:+ new Date(),
  page:1
}
```

#### 返回参数

```
data: {
	list: [
		{
			id: "12",
			open_id: "oCuLv0GnvwF3rAi-HInXBdekealo",
			user_name: "路遥",
			user_photo: "https://wx.qlogo.cn/mmopen/vi_32/ia3D7VYPwKffA3Hjic2jN4epJ0fklGpQ4bPic2fKgah4H3N70LLb3wlAekjibobhmxE8L6FNQKMB3Xefzicz55zbfXg/0",
			user_content: "汕头到莆田求15米冷藏！！ 山东滨州到福州求15米冷藏！！ 山东菏泽到福州求15米冷藏！！ 福建龙岩到三明求15米冷藏！！ 18259002899",
			add_time: "2017-07-14 15:57:38",
			click_phone: "0",
			form_id: "d25010ec86f7d276ae8e15813119724c",
			status: "1",
			position: 2,		用户是车主还是货主
			userTotal: 4,		货源总数
			user_phone: [
				"18259002899"	电话
			]
		}
	],
	total: 1        用户总数
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

###  获取用户列表

#### 传入参数

```
data:{
  c:'carcooladminapi',
  m:'getuserlist',
  ts:+ new Date(),
  page:1
}
```

#### 返回参数

```
data: {
	list: [
		{
			id: "12",
			open_id: "oCuLv0GnvwF3rAi-HInXBdekealo",
			user_name: "路遥",
			user_photo: "https://wx.qlogo.cn/mmopen/vi_32/ia3D7VYPwKffA3Hjic2jN4epJ0fklGpQ4bPic2fKgah4H3N70LLb3wlAekjibobhmxE8L6FNQKMB3Xefzicz55zbfXg/0",
			user_content: "汕头到莆田求15米冷藏！！ 山东滨州到福州求15米冷藏！！ 山东菏泽到福州求15米冷藏！！ 福建龙岩到三明求15米冷藏！！ 18259002899",
			add_time: "2017-07-14 15:57:38",
			click_phone: "0",
			form_id: "d25010ec86f7d276ae8e15813119724c",
			status: "1",
			position: 2,		用户是车主还是货主
			userTotal: 4,		货源总数
			user_phone: [
				"18259002899"	电话
			]
		}
	],
	total: 1        用户总数
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

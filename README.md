# react-account-book-bootstrap:book:
*基于React的在线账本*

## 用到的技术/工具:wrench:
**前端：**
 - `React` 脚手架 `create-react-app`
 - `React-Hook` 常用的钩子 `(useState/useEffect...)`
 - `React-Router` 前端路由
 - `Axios`  集成网络请求
 - `Recharts`  图表库
 - `Bootstrap`  样式库
 - 第三方库 `(Ionicon...)`
 
**后端：**
 - `JSON-server` 模拟后台提供数据

## 主要功能:bulb:

- 收支展示
- 分月展示
- 添加账目
- 删除账目
- 编辑账目
- 图表展示

## 项目预览:eyes:
![列表模式](https://files.mdnice.com/user/28027/6ddb33a1-1f90-4878-be82-5ad72543bf33.png)


![图表模式](https://files.mdnice.com/user/28027/61db583b-8424-4d79-a3c4-8634bc259ba6.png)


![编辑模式](https://files.mdnice.com/user/28027/3d3481d6-8687-4c12-b70d-88a331d7b5eb.png)


## 项目结构:page_facing_up:

    |- src
    |  |- components: 封装的可复用组件
    |  |  |- CreateBtn: 创建新账目按钮
    |  |  |- Loader: 加载中组件
    |  |  |- MonthPicker: 日期选择组件
    |  |  |- MyPieChart: 图表展示的组件
    |  |  |- PriceList: 账目列表哦组件
    |  |  |- SelectCategory: 选择分类组件
    |  |  |- SelectForm: 选择信息组件
    |  |  |- Tabs: 切换栏组件
    |  |  |- TotalPrice: 价格展示组件
    |  |- pages: 路由组件
    |  |  |- Create: 创建/编辑界面
    |  |  |- Home: 主界面
    |  |- utils: 公用的函数、常量
    |  |- WithContext.jsx: 封装的提供context的高阶组件
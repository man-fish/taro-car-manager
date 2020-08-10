export default {
  pages: [
    "pages/search/search",
    "pages/profile/profile",
    "pages/bind/bind",
    "pages/list/list",
    "pages/chart/chart",
    "pages/index/index",
    "pages/log/log",
    "pages/statisics/statisics",
    "pages/table/table",
    "pages/statisicsList/statisicsList"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#3963bc",
    navigationBarTitleText: "车辆管理系统",
    navigationBarTextStyle: "white",
    useExtendedLib: {
      weui: true
    }
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/search/search",
        text: "查询",
        iconPath: "resources/img/tabbar/search.png",
        selectedIconPath: "resources/img/tabbar/search.png"
      },
      {
        pagePath: "pages/chart/chart",
        text: "统计",
        iconPath: "resources/img/tabbar/chart.png",
        selectedIconPath: "resources/img/tabbar/chart.png"
      },
      {
        pagePath: "pages/profile/profile",
        text: "信息",
        iconPath: "resources/img/tabbar/profile.png",
        selectedIconPath: "resources/img/tabbar/profile.png"
      }
    ],
    selectedColor: "#3963bc"
  }
};

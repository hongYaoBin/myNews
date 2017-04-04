angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        $stateProvider
            .state("tab", {
                url: "/tab",
                templateUrl: "template/tabs.html"
            })
            .state("tab.login", {
                url: "/login",
                views: {
                    "tab-setting": {
                        templateUrl: "template/login.html",
                        controller: "ctrl4"
                    }
                }
            })
            .state("tab.regist", {
                url: "/regist",
                views: {
                    "tab-setting": {
                        templateUrl: "template/regist.html",
                        controller: "ctrl5"
                    }
                }
            })
            .state("tab.home", {
                url: "/home",
                views: {
                    "tab-home": {
                        templateUrl: "template/home.html"
                    }
                }
            })
            .state("tab.home.newslist", {
                url: "/newslist/:id",
                // cache:false,
                views: {
                    "news-list": {
                        templateUrl: "template/newsList.html",
                        controller: "ctrl1"
                    }
                }
            })
            .state("tab.newsinfo", {
                url: "/newsinfo/:nid",
                views: {
                    "tab-home": {
                        templateUrl: "template/newsinfo.html",
                        controller: "ctrl2"
                    }
                }
            })
            .state("tab.search", {
                url: "/search",
                views: {
                    "tab-search": {
                        templateUrl: "template/search.html",
                        controller: "ctrl3"
                    }
                }
            })
            .state("tab.setting", {
                url: "/setting",
                views: {
                    "tab-setting": {
                        templateUrl: "template/setting.html",
                        controller:'ctrl6'
                    }
                }
            });
        $urlRouterProvider.otherwise("/tab/home/newslist/1");
    })
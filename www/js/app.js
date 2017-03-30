// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
    .run(function($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
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
                        templateUrl: "template/setting.html"
                    }
                }
            });
        $urlRouterProvider.otherwise("/tab/home/newslist/1");
    })
    .service('getData', ["$http", function($http) {
        this.getData = function(wf, t, ln, topic, fn) {
            var time = new Date();
            $http({
                method: 'GET',
                url: "../a.php",
                params: {
                    "wf": wf,
                    "t": t,
                    "ln": ln,
                    "topic": topic,
                    "currentTime": time
                }
            }).then(function successCallback(response) {
                fn(response);
            }, function errorCallback(response) {
                fn(response);
            });
        }
    }])
    .service('getNew', ["$http", function($http) {
        this.getNew = function(nids, fn) {
            $http({
                method: 'GET',
                url: "../b.php",
                params: {
                    "nids": nids
                }
            }).then(function successCallback(response) {
                fn(response.data.data.news[0]);
            }, function errorCallback(response) {
                fn(response);
            });
        }
    }])
    .controller('ctrl1', ['getData', '$scope', '$ionicSlideBoxDelegate', '$stateParams', '$ionicSlideBoxDelegate', '$timeout', function(getData, $scope, $ionicSlideBoxDelegate, $stateParams, $ionicSlideBoxDelegate, $timeout) {
        // $scope.list = new Array();
        // $scope.arr = new Array();
        //上拉触发函数
        $scope.loadMore = function() {
            switch ($stateParams.id) {
                case "1":
                    $scope.banner = "true";
                    getData.getData(1, "newchosenlist", 20, "", function(data) {
                        $scope.list = data.data.data.toppic;
                        $scope.arr = data.data.data.news;
                        console.log($scope.arr);
                        $ionicSlideBoxDelegate.update();
                        $ionicSlideBoxDelegate.$getByHandle("slideboximgs").loop(true);
                    });
                    break;
                case "2":
                    $scope.banner = "false";
                    getData.getData(0, "getbaijialist", 20, "", function(data) {
                        var newslist = new Array();
                        for (var i = 0; i < data.data.data.length; i++) {
                            for (var j = 0; j < data.data.data[i].news.length; j++) {
                                newslist = newslist.concat(data.data.data[i].news[j]);
                            }
                        }
                        $scope.arr = newslist;
                        console.log($scope.arr);
                    });
                    break;
                case "3":
                    $scope.banner = "true";
                    getData.getData(1, "localnewslist", 30, "", function(data) {
                        $scope.list = data.data.data.toppic;
                        $scope.arr = data.data.data.news.slice(0, 17);
                        console.log($scope.list, $scope.arr);
                        $ionicSlideBoxDelegate.update();
                        $ionicSlideBoxDelegate.$getByHandle("slideboximgs").loop(true);
                    });
                    break;
                case "4":
                    $scope.banner = "false";
                    getData.getData(1, "recommendlist", 30, "娱乐", function(data) {
                        $scope.arr = data.data.data.news.slice(0, 20);
                        console.log($scope.arr);
                    });
                    break;
                case "5":
                    $scope.banner = "false";
                    getData.getData(1, "recommendlist", 30, "社会", function(data) {
                        $scope.arr = data.data.data.news.slice(0, 20);
                        console.log($scope.arr);
                    });
                    break;
                case "6":
                    $scope.banner = "false";
                    getData.getData(1, "recommendlist", 30, "军事", function(data) {
                        $scope.arr = data.data.data.news.slice(0, 20);
                        console.log($scope.arr);
                    });
                    break;
            }
            //这里使用定时器是为了缓存一下加载过程，防止加载过快
            $timeout(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }, 1500);
        };
        //控制列表是否允许其加载更多
        $scope.moreDataCanBeLoaded = function() {
            return true;
        }
    }])
    .controller("ctrl2", ["$scope", "$stateParams", "getNew", function($scope, $stateParams, getNew) {
        getNew.getNew($stateParams.nid, function(data) {
            $scope.newsinfo = data;
        })
    }])
    .controller('ctrl3', ['$scope', 'getData', function($scope, getData) {
        getData.getData(0, "hotwordnews", 10, "", function(data) {
            $scope.list = data.data.data.news;
            console.log(data.data.data.news);
        })
    }])
    .controller('ctrl4', ['$scope', '$http', '$state', function($scope, $http, $state) {
        $scope.username = "";
        $scope.psd = "";
        $scope.login = function() {
            if ($scope.username == "" || $scope.psd == "") {
                  alert("用户名或密码不能为空");
            } else {
                $http({
                    url: "../login.php",
                    method: "get",
                    params: {
                        "username": $scope.username,
                        "password": $scope.psd
                    }
                }).then(function success(data) {
                    // console.log(data);
                    if(data.data){
                        // $state.go("/tab",{},{reload:true});
                    }else{
                        alert("用户名或密码有误");
                    }
                }, function failCallbacks(data) {

                })
            }

        }
    }])
    .controller('ctrl5', ['$scope', '$http', function($scope,$http){
        $scope.username = "";
        $scope.psd = "";
        $scope.regist = function() {
            if ($scope.username == "" || $scope.psd == "") {
                alert("用户名或密码不能为空");
                console.log('---');
            } else {
                $http({
                    url: "../regist.php",
                    method: "get",
                    params: {
                        "username": $scope.username,
                        "password": $scope.psd
                    }
                }).then(function success(data) {
                    // console.log(data)
                    switch(data.data){
                        case "0":
                            console.log(0);
                        break;
                        case "1":
                            console.log(1)
                        break;
                        case "2":
                            console.log(2)
                        break;
                    }
                }, function failCallbacks(data) {

                })
            }

        }
    }])
angular.module('starter')
    .controller('ctrl1', ['getData', '$scope', '$ionicSlideBoxDelegate', '$stateParams', '$ionicSlideBoxDelegate', '$timeout', function(getData, $scope, $ionicSlideBoxDelegate, $stateParams, $ionicSlideBoxDelegate, $timeout) {
        //上拉触发函数
        $scope.loadMore = function() {
            switch ($stateParams.id) {
                case "1":
                    $scope.banner = "true";
                    getData.getData(1, "newchosenlist", 20, "", function(data) {
                        $scope.list = data.data.data.toppic;
                        $scope.arr = data.data.data.news;
                        // console.log($scope.arr);
                        $ionicSlideBoxDelegate.stop();
                        $ionicSlideBoxDelegate.update();
                        $ionicSlideBoxDelegate.start();
                        $ionicSlideBoxDelegate.loop(true);
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
                        // console.log($scope.arr);
                    });
                    break;
                case "3":
                    $scope.banner = "true";
                    getData.getData(1, "localnewslist", 30, "", function(data) {
                        $scope.list = data.data.data.toppic;
                        $scope.arr = data.data.data.news.slice(0, 17);
                        // console.log($scope.list, $scope.arr);
                        $ionicSlideBoxDelegate.update();
                        $ionicSlideBoxDelegate.$getByHandle("slideboximgs").loop(true);
                    });
                    break;
                case "4":
                    $scope.banner = "false";
                    getData.getData(1, "recommendlist", 30, "娱乐", function(data) {
                        $scope.arr = data.data.data.news.slice(0, 20);
                        // console.log($scope.arr);
                    });
                    break;
                case "5":
                    $scope.banner = "false";
                    getData.getData(1, "recommendlist", 30, "社会", function(data) {
                        $scope.arr = data.data.data.news.slice(0, 20);
                        // console.log($scope.arr);
                    });
                    break;
                case "6":
                    $scope.banner = "false";
                    getData.getData(1, "recommendlist", 30, "军事", function(data) {
                        $scope.arr = data.data.data.news.slice(0, 20);
                        // console.log($scope.arr);
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
            // console.log(data.data.data.news);
        })
    }])
    .controller('ctrl4', ['$rootScope', '$scope', '$http', '$state','$cordovaDialogs', function($rootScope,$scope, $http, $state,$cordovaDialogs) {
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
                    console.log(data);
                    if(data.data == "1"){
                        $rootScope.username = $scope.username;
                        window.location.href = "http://localhost/myNews/www/#/tab/home/newslist/1";
                    }else{
                        console.log("用户名或密码有误");
                    }
                }, function failCallbacks(data) {
                    console.log(data);
                })
            }

        }
    }])
    .controller('ctrl5', ['$scope', '$http', function($scope,$http){
        $scope.username = "";
        $scope.psd = "";
        $scope.regist = function() {
            if ($scope.username == "" || $scope.psd == "") {
                console.log("用户名或密码不能为空");
            } else {
                $http({
                    url: "../regist.php",
                    method: "get",
                    params: {
                        "username": $scope.username,
                        "password": $scope.psd
                    }
                }).then(function success(data) {
                    // console.log(data);
                    switch(data.data){
                        case "0":
                            console.log("用户名已存在");
                        break;
                        case "1":
                        window.location.href = "http://localhost/myNews/www/#/tab/login";
                            console.log("注册成功");
                        break;
                    }
                }, function failCallbacks(data) {
                    console.log(data)
                })
            }

        }
    }])
    .controller('ctrl6', ['$rootScope', function($rootScope){
         $rootScope.username = "登录/注册";
    }])
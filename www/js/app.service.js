angular.module('starter')
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
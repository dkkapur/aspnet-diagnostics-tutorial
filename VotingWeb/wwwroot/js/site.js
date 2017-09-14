var app = angular.module('VotingApp', ['ui.bootstrap']);

//angular.module('insightsApp', ['ngRoute', 'angular-appinsights'])
//    .config(['$routeProvider', 'insightsProvider', function ($routeProvider, insightsProvider) {

//        $routeProvider
//            .when('/', {
//                templateUrl: "page1.html",
//                controller: 'page1Controller'
//            })
//            .when('/page2', {
//                templateUrl: "page2.html"
//            });

//        // Add application insights id here
//        insightsProvider.start('b465b588-6d89-4c97-8e1c-ad8389f4c464');
//    }])

app.run(function () { });

app.controller('VotingAppController', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {

    $scope.refresh = function () {
        $http.get('api/Votes?c=' + new Date().getTime())
            .then(function (data, status) {
                $scope.votes = data;
            }, function (data, status) {
                $scope.votes = undefined;
            });
    };

    $scope.remove = function (item) {
        $http.delete('api/Votes/' + item)
            .then(function (data, status) {
                $scope.refresh();
            })
    };

    $scope.add = function (item) {
        var fd = new FormData();
        fd.append('item', item);
        $http.put('api/Votes/' + item, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (data, status) {
                $scope.refresh();
                $scope.item = undefined;
            })
    };
}]);
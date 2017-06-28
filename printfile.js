
var app = angular.module('PrintCenter', ['ui.bootstrap','ui.calendar']);

app.directive('chooseFiles',['$parse',  function ($parse) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attachments){

            element.bind('change', function () {
                $parse(attachments.chooseFiles).assign(scope, element[0].files);
                scope.$apply()
            });

        }
    }
}]);+

app.factory("gDataService", function ($rootScope) {
    var service = {};
    service.events = [];
    service.events2 = [];
    service.added_event_short = {start: null, title: null};
    service.addData = function(object) {
        this.events2.push(object);
        $rootScope.$broadcast("gDataUpdated");
};
    return service;
});

app.controller('uploadFiles', ['$scope', '$http', 'gDataService', '$timeout', function($scope, $http, gDataService, $timeout){
    
    $scope.changedFile = function(element){
    $scope.files = element.files;
    $scope.$apply();
    }
    
    $scope.custom = true;
    $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
    };
    
    $scope.submit = function(){
        confirm("Print Successful");
    }
    
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
    };
    
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    
    $scope.addEvent = function (title, sdate, edate) {
        
        console.log($scope);
        var eventObj = {
            title: $scope.title,
            discription: $scope.discription,  
            start: new Date($scope.sdate),
            end: new Date($scope.edate),              
      };
        
            console.log(eventObj);
            $scope.events.push(eventObj);
            $scope.eventSources = [$scope.events, $scope.eventSource];
            
    };
    

    $scope.eventSources = [$scope.events, $scope.eventSource];
    
    
}]);   


    



    
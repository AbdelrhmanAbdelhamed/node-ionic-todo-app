"use strict";

/**
 * [Control the todos]
 * @type {Object}
 */
app.controller('GlobalController', function($scope, $cordovaDialogs, $ionicSideMenuDelegate, $cordovaDatePicker, $http, $timeout, User, Socket, Activity) {

    $scope.user = User.getInstance().getCurrentUser();

    $scope.ToDo = {
        Description: "",
        Remainder: "",
        isDone: false,
        userId: $scope.user.Id
    };


    $scope.toDoList = [];
    $scope.activities = [];


    $scope.addToDo = function() {

        var activity = new Activity($scope.user.Name, "added ( " + $scope.ToDo.Description + " ) ", new Date().toString());
        Socket.emit('addToDo', {
            ToDo: $scope.ToDo,
            activity: activity.toTString()
        });

        $scope.ToDo.Description = "";
        $scope.ToDo.Reminder = "";
    };

    Socket.on("newToDo", function(data) {
        $scope.toDoList.push(data.ToDo);
        $scope.activities.push(data.activity);
    });

    $scope.removeToDo = function(index) {
        var activity = new Activity($scope.user.Name, "removed ( " + $scope.toDoList[index].Description + " ) ", new Date().toString());
        Socket.emit('removeToDo', {
            index: index,
            activity: activity.toTString()
        });
    };

    Socket.on("deleteToDo", function(data) {
        $scope.toDoList.splice(data.index, 1);
        $scope.activities.push(data.activity);
    });

    $scope.setIsDone = function(index, status) {

        if (typeof status === 'undefined') {
            status = 'not done';
        }

        var activity = new Activity($scope.user.Name, "set ( " + $scope.toDoList[index].Description + " ) as " + status, new Date().toString());

        if (status === 'not done') {
            status = false
        }

        Socket.emit('setIsDone', {
            index: index,
            status: status,
            activity: activity.toTString()
        });
    };

    Socket.on('updateToDo', function(data) {
        $scope.toDoList[data.index].isDone = data.status;
        $scope.activities.push(data.activity);
    });

    var fireAlaram = function(message, timeForAlert) {

        $timeout(function() {
            $cordovaDialogs.alert(message, 'ToDO', 'OK');
            $cordovaVibration.vibrate(500);
        }, timeForAlert);
    };

    var setAlerts = function() {
        for (var i in $scope.toDoList) {
            var Remainder = $scope.toDoList[i].Remainder;
            if (Remainder !== null) {
                var timeForAlert = new Date(Remainder).getTime() - new Date().getTime();
                if (timeForAlert > 0)
                    fireAlaram("ToDo starts now: " + $scope.toDoList[i].Description, timeForAlert);
            }
        }
    };

    var options = {
        date: new Date(),
        mode: 'datetime',
        titleText: "Set a reminder",
        allowOldDates: false
    };

    $scope.showDatePicker = function() {
        $cordovaDatePicker.show(options).then(function(date) {
            $scope.ToDo.Reminder = date;
        });
    }

    $scope.toggleSideMenu = function(menu) {
        if (menu == "left") {
            $ionicSideMenuDelegate.toggleLeft();
        } else {
            $ionicSideMenuDelegate.toggleRight();
        }
    };

});
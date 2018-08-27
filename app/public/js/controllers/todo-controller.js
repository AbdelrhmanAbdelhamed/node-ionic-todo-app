"use strict";

/**
 * [Control the todos]
 * @type {Object}
 */
app.controller('ToDoController', function($scope, $ionicHistory, $state, $timeout, $cordovaDialogs, $cordovaVibration, $cordovaDatePicker, $ionicSideMenuDelegate, User, ToDo, Socket) {

    //    if (!user.getCurrentUser())
    //     $location.path("/");

    /**
     * [user Current User]
     * @type {Object: User}
     */
    $scope.user = User.getInstance().getCurrentUser();

    $scope.ToDo = {
        Description: "",
        Reminder: "",
        isDone: false
    };

    $scope.listAllToDos = (function() {
        $scope.user.loadAllToDos(function(todos) {
            if (todos !== null) {
                $scope.toDoList = todos;
            } else {
                $scope.toDoList = [];
            }
        });
    })();

    $scope.signOut = function() {
        $scope.user.signOut();

        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });
        $state.go("Signin");
    };

    /**
     * [Add a new todo to the current user]
     * @param {string} description [Description of the todo]
     * @param {string} reminder    [When to start the todo]
     */
    $scope.addToDo = function() {

        if ($scope.ToDo.Description.length < 3) {
            $cordovaDialogs.alert("Description must be at least 3 letters", "Todo's Descreption", 'OK');
            return;
        }

        if (!$scope.ToDo.Reminder)
            $scope.ToDo.Reminder = "null";

        var toDo = new ToDo($scope.ToDo.Description, $scope.ToDo.Reminder, "false", $scope.user.Id);

        toDo.Save(function(status) {
            if (status === false) {
                $cordovaDialogs.alert("Description already exists", "Todo's Descreption", 'OK');
            } else {

                $scope.toDoList.push(toDo);
                var lastId = status;
                $scope.toDoList[($scope.toDoList.length) - 1].Id = lastId;
                setAlert(($scope.toDoList.length) - 1);
            }
        });

        $scope.ToDo.Description = "";
        $scope.ToDo.Reminder = "";

    };
    /**
     * [Mark a todo as done]
     * @param {Object: User} ownerUser [The user than owns the todo]
     * @param {Integer} index     [The location of the todo to set done]
     */
    $scope.setIsDone = function(index, status) {
        console.log(status);

        var selectedToDo = $scope.toDoList[index];

        $scope.toDoList[index] = new ToDo(selectedToDo.Description, selectedToDo.Remainder, selectedToDo.isDone, selectedToDo.userId);
        $scope.toDoList[index].setId(selectedToDo.Id);

        $scope.toDoList[index].setDone(status);

        $scope.toDoList[index].Update();
    };
    /**
     * [Fire alerts when the time of the ownerUser's todos starts]
     * @param {Object: User} ownerUser [The user that owns the todos]
     */

    var fireAlaram = function(message, timeForAlert) {

        $timeout(function() {

            $cordovaDialogs.alert(message, 'ToDO', 'OK');
            $cordovaVibration.vibrate(500);
        }, timeForAlert);
    };

    var setAlert = function(index) {
        var Remainder = $scope.toDoList[index].Remainder;

        if (Remainder !== null) {
            //    Remainder = Remainder.toLocaleString();

            //    Remainder = Remainder.replace(/-/g, '/').replace('T', ' ');

            var timeForAlert = new Date(Remainder).getTime() - new Date().getTime();
            if (timeForAlert > 0)
                fireAlaram("ToDo starts now: " + $scope.toDoList[index].Description, timeForAlert);
        }
    };

    var setAlerts = (function() {
        for (var i in $scope.toDoList) {

            var Remainder = $scope.toDoList[i].Remainder;

            //    Remainder = Remainder.replace(/-/g, '/').replace('T', ' ');

            if (Remainder !== null) {
                var timeForAlert = new Date(Remainder).getTime() - new Date().getTime();
                if (timeForAlert > 0)
                    fireAlaram("ToDo starts now: " + $scope.toDoList[i].Description, timeForAlert);
            }
        }
    })();

    /**
     * [removes a specific todo from the ownerUser todo's list]
     * @param  {Object: User} ownerUser [The user that owns the chosen todo]
     * @param  {Integer} index     [The location of the todo to remove]
     */
    $scope.removeToDo = function(index) {

        $cordovaDialogs.confirm("Are you sure you want to delete this todo?", "ToDo Remove", ['Yes', 'No'])
            .then(function(buttonIndex) {
                if (buttonIndex == 1) {
                    var selectedToDo = $scope.toDoList[index];
                    $scope.toDoList[index] = new ToDo(selectedToDo.Description, selectedToDo.Remainder, selectedToDo.isDone, selectedToDo.userId);
                    $scope.toDoList[index].setId(selectedToDo.Id);
                    $scope.toDoList[index].Remove(function(status) {
                        console.log(status);
                    });
                    $scope.toDoList.splice(index, 1);
                }
            });
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

    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.goToGlobalRoom = function() {

        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });

        $state.go("GlobalRoom");
    }

});
"use strict";

app.controller('UserController@signup', function ($scope, $state, $ionicHistory, $cordovaDialogs, User) {

    /**
     * [A template User]
     * @type {Object: User}
     */
    $scope.user = User.getInstance();

    /**
     * [Add a new User to the local Storage]
     * @param {string} name     [Name of the user]
     * @param {string} email    [Email of the user]
     * @param {string} password [Password of the User]
     */
    $scope.addUser = function () {

        $scope.user.signUp(function (status) {

            if (status === false) {

                $cordovaDialogs.alert("Sorry, Email already exists", 'ToDO', 'OK');

            } else {

                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go("TODOApp");
            }
        });
    };
});
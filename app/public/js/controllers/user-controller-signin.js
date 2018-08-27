"use strict";

app.controller('UserController@signin', function ($scope, $state, $ionicHistory, $cordovaDialogs, User, ToDo) {

    /**
     * [A template User]
     * @type {Object: User}
     */
    $scope.user = User.getInstance();

    /**
     * [Check for email and the password provided by the user and sigin him/her in] 
     * @param  {string} email    [Email of the user]
     * @param  {[type]} password [Password of the user]
     */
    $scope.signIn = function () {

        $scope.user.signIn(function (status) {

            if (status === false) {

                if (deviceReady)
                    $cordovaDialogs.alert("Wrong Email or password", 'ToDO', 'OK');

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
"use strict";

app.factory('User', function (DatabaseManager) {

    /**
     * [description]
     * @param  {[type]} ) {var instance; function init( [description]
     * @return {[type]}   [description]
     */
    var User = augment(DatabaseManager, function (Parent) {

        /**
         * [construct the Object for the first time only]
         * @return {Object: User} [The current user]
         */
        this.constructor = function () {
            this.Name = "";
            this.Email = "";
            this.password = "";
        };

        /**
         * [Register the user and save it to the localStorage]
         * @return {boolean} [true for sucess, false for failure]
         */
        this.signUp = function (verify) {

            this.saveUser(this, function (response) {
                var self = User.getInstance();

                if (response.status === false) {
                    verify(false);
                }

                else {
                    self.Id = response.message;
                    window.sessionStorage.currentUser = JSON.stringify(self);
                    verify(true);
                }

            });
        };

        /**
         * [Log in the user after checking the description]
         * @return {boolean} [true on sucess, false on failure]
         */
        this.signIn = function (verify) {

            this.getUser(this.Email, this.password, function (response) {
                var self = User.getInstance();
                if (response.status === false || response.message.length <= 0) {
                    verify(false);
                }

                else {
                    var user = response.message[0];
                    self.Id = user.Id;
                    self.Name = user.Name;
                    window.sessionStorage.currentUser = JSON.stringify(self);
                    verify(true);
                }

            });

        };

        this.signOut = function () {
            delete this.Id;
            window.sessionStorage.currentUser = null;
        };

        this.fillUserData = function (Data) {

            this.Id = Data.Id;

            this.Email = Data.Email;

            this.Name = Data.Name;

            this.password = Data.password;
        };

        this.getCurrentUser = function () {

            var Data = this.getCurrentUserData();

            if (Data !== null) {
                this.fillUserData(Data);
                return User.getInstance();
            }
        };

        this.loadAllToDos = function (response) {
            this.getAllToDos(this.Id, function (status) {
                    response(status);
                });
            };
    });

    User._SharedInstance = null;

    User.getInstance = function () {

        if (!User._SharedInstance) {
            User._SharedInstance = new User();
        }
        return User._SharedInstance;
    }

    return User;

});
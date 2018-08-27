"use strict";
app.factory('DatabaseManager', function($http) {

    /**
     * [Storage Manager]
     * @type {Object: Storage}
     */

    var DatabaseManager = augment.defclass({
        constructor: function() {

        },
        /**
         * [Search for a user in the local Storage]
         * @param  {string} Email [Email of the user to search]
         * @return {Object: User}       [return the located user]
         */
        getUser: function(email, password, ajaxUser) {

            $http({
                method: "POST",
                url: "http://localhost:8000/api/users/signIn",
                data: {
                    "Email": email,
                    "password": password
                }
            }).success(function(user) {
                ajaxUser(user);
            });
        },
        /**
         * [Save user into database]
         * @param  {Object: User} user [The user to save]
         */
        saveUser: function(user, ajaxResponse) {
            $http.post("http://localhost:8000/api/users", user).
            success(function(data) {
                ajaxResponse(data);
            });
        },
        getCurrentUserData: function() {

            if (typeof window.sessionStorage.currentUser !== 'undefined' && window.sessionStorage.currentUser !== null) {
                var Data = JSON.parse(window.sessionStorage.currentUser);
                return Data;
            }
            return null;
        },
        saveToDo: function(todo, ajaxResponse) {
            $http.post("http://localhost:8000/api/todos", todo).
            success(function(data) {
                ajaxResponse(data);
            });
        },
        removeToDo: function(Id, ajaxResponse) {
            $http({
                method: "DELETE",
                url: "http://localhost:8000/api/todos/" + Id,
            }).success(function(response) {
                ajaxResponse(response);
            });
        },
        updateToDo: function(todo) {
            console.log(todo);

            if (typeof todo.isDone === 'undefined') {
                todo.isDone = false;
            }

            $http.put("http://localhost:8000/api/todos", todo).
            success(function(data) {
                console.log(data);
            });
        },
        getAllToDos: function(userId, ajaxResponse) {
            $http.get("http://localhost:8000/api/todos/" + userId).then(function(todos) {
                ajaxResponse(todos.data.message);
            });
        }
    });
    return DatabaseManager;
});
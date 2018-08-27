"use strict";

app.factory('ToDo', function (DatabaseManager) {

    /**
     * [a ToDo class]
     * @param  {string} description [Description of the ToDO]
     * @param  {string} remainder   [strong formatted date of starting for the ToDO]
     */
    var ToDo = augment(DatabaseManager, function (Parent) {

        this.Description = "";
        this.Remainder = null;
        this.isDone = false;
        this.userId = false;

        this.constructor = function (description, remainder, isDone, userId) {
            this.Description = description;
            this.Remainder = remainder;
            this.isDone = isDone;
            this.userId = userId;
        };

        /**
         * Save the toDo into the current user list]
         */
        this.Save = function (verify) {
            this.saveToDo(this, function (response) {
                if (response.status === false) {
                    verify(false);
                }

                else {
                    verify(response.message);
                }
            });
        };

        this.Update = function () {
            this.updateToDo(this);
        };

        this.setDone = function (status) {
            this.isDone = status;
        };

        this.Remove = function (verify) {
            this.removeToDo(this.Id, function (response) {
                if (response.status === false)
                    verify(false);

                else
                    verify(true);
            });
        };

        this.setId = function (Id) {
            this.Id = Id;
        };

    });
    
    return ToDo;
});
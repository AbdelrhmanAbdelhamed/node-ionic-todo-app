"use strict";

app.factory('Activity', function(DatabaseManager) {

    var Activity = augment(DatabaseManager, function(Parent) {

        this.constructor = function(ownerUser, verb, time) {
            this.ownerUser = ownerUser;
            this.verb = verb;
            this.time = time;
        };

        this.toTString = function() {
            return (this.ownerUser + " has " + this.verb + " \n - " + this.time + "\n");
        }
    });
    return Activity;
});
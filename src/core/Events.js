/**
* The `Matter.Events` module contains methods to fire and listen to events on other objects.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Events
*/

var Events = {};

module.exports = Events;

var Common = require('./Common');

(function () {

    /**
     * Subscribes a callback function to the given object's `eventName`.
     * @method on
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.on = function (object, eventNames, callback) {
        // var names = eventNames.split(' '),
        //     name;

        // for (var i = 0; i < names.length; i++) {
        //     name = names[i];
        //     object.events = object.events || {};
        //     object.events[name] = object.events[name] || [];
        //     object.events[name].push(callback);
        // }
        object.events = object.events || {};
        object.events[eventNames] = object.events[eventNames] || [];
        object.events[eventNames].push(callback);
        return callback;
    };

    /**
     * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
     * @method off
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.off = function (object, eventNames, callback) {
        // if (!eventNames) {
        //     object.events = {};
        //     return;
        // }
        // handle Events.off(object, callback)
        // if (typeof eventNames === 'function') {
        //     callback = eventNames;
        //     eventNames = Common.keys(object.events).join(' ');
        // }

        // var names = eventNames.split(' ');

        // for (var i = 0; i < names.length; i++) {
        //     var callbacks = object.events[names[i]],
        //         newCallbacks = [];

        //     if (callback && callbacks) {
        //         for (var j = 0; j < callbacks.length; j++) {
        //             if (callbacks[j] !== callback)
        //                 newCallbacks.push(callbacks[j]);
        //         }
        //     }

        //     object.events[names[i]] = newCallbacks;
        // }

        if (object.events && object.events[eventNames]) {
            // delete object.events[eventNames];
            var idx = object.events[eventNames].indexOf(callback);
            if(idx != -1)
                object.events[eventNames].splice(idx,1);
        }
    };

    /**
     * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
     * @method trigger
     * @param {} object
     * @param {string} eventNames
     * @param {} event
     */
    Events.trigger = function (object, eventNames, event) {
        // var names,
        //     name,
        //     callbacks,
        //     eventClone;

        // var events = object.events;

        // if (events && Common.keys(events).length > 0) {
        //     if (!event)
        //         event = {};

        //     names = eventNames.split(' ');

        //     for (var i = 0; i < names.length; i++) {
        //         name = names[i];
        //         callbacks = events[name];

        //         if (callbacks) {
        //             eventClone = Common.clone(event, false);
        //             eventClone.name = name;
        //             eventClone.source = object;

        //             for (var j = 0; j < callbacks.length; j++) {
        //                 callbacks[j].apply(object, [eventClone]);
        //             }
        //         }
        //     }
        // }

        if (object.events) {
            var callbacks = object.events[eventNames];
            if (callbacks) {
                for(var i = 0,len = callbacks.length;i<len;++i)
                {
                    var callback = callbacks[i];
                    var eventClone = Common.clone(event, false);
                    eventClone.name = eventNames;
                    eventClone.source = object;
                    callback.apply(object, [eventClone]);
                }

            }
        }
    };

})();

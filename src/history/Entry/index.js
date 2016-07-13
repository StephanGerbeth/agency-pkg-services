"use strict";

var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({

    props: {
        name: {
            type: 'string',
            required: true,
            setOnce: true
        },
        value: {
            type: 'string',
            required: true,
            allowNull: true,
            default: function() {
                return null;
            }
        },
        callbacks: {
            type: 'array',
            required: true
        },
        time: {
            type: 'number',
            required: true,
            default: function() {
                return Date.now();
            }
        }
    },

    initialize: function() {
        AmpersandModel.prototype.initialize.apply(this, arguments);

        this.on('change:value', function(model, value) {
            model.callbacks.forEach(function(callback) {
                callback.cb(value);
            });
        });
    },

    serialize: function() {
        return {name: this.name, value: this.value, time: this.time};
    }
});

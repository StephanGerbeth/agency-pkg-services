"use strict";

var browserHistory = require('exports?History!historyjs/scripts/bundled-uncompressed/html4+html5/native.history');
var AmpersandState = require('ampersand-state');
var Registry = require('./Registry');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');
var merge = require('agency-pkg-utils/merge');

//https://www.npmjs.com/package/history-events

module.exports = new(AmpersandState.extend(dataTypeDefinition, {
    session: {

        registry: {
            type: 'AmpersandCollection',
            required: true,
            default: function() {
                return new Registry();
            }
        },
        defaultTitle: {
            type: 'string',
            required: true,
            setOnce: true,
            default: function() {
                return document.title;
            }
        }
    },

    initialize: function() {
        AmpersandState.prototype.initialize.apply(this, arguments);

        browserHistory.Adapter.bind(window, 'statechange', function() {
            this.registry.add(browserHistory.getState().data, {
                merge: true
            });
        }.bind(this), false);

        $(document).on('click', 'a[data-deep-name]', function(e) {
            e.preventDefault();
            var node = $(e.currentTarget);
            if (!!node.attr('href').replace(/^#/, '')) {
                this.update([{
                    name: node.data('deep-name'),
                    value: node.attr('href').replace(/^#/, '') || null
                }], node.attr('title') || null);
            } else {
                this.remove([node.data('deep-name')]);
            }
        }.bind(this));

        var state = this.registry.toJSON();
        browserHistory.replaceState(state, getTitle.bind(this)(state), toQueryString(state));
    },

    register: function(name, callback) {
        var entry = this.registry.get(name);
        if (!entry) {
            entry = this.registry.add({
                name: name
            });
        }
        entry.callbacks.push({
            name: name,
            cb: callback
        });
        callback(entry.value);
    },

    unregister: function(name) {
        var callbacks = this.registry.get(name).callbacks;
        callbacks.splice(callbacks.findIndex(function(callback) {
            if (callback.name === name) {
                return true;
            }
        }), 1);
        this.registry.get(name).callbacks = callbacks;
    },

    update: function(map, title) {
        var collection = updateSerializedCollection(this.registry.toJSON(), map);
        if (title) {
            browserHistory.pushState(collection, title, toQueryString(collection));
        } else {
            browserHistory.replaceState(collection, browserHistory.getState().title, toQueryString(collection));
        }
    },

    remove: function(keys) {
        this.update(keys.map(function(key) {
            return {
                name: key,
                value: null
            };
        }), this.defaultTitle);
    }
}))();

function getTitle(state) {
    var title = this.defaultTitle;
    state.forEach(function(item) {
        var node = $('[data-deep-name="' + item.name + '"][data-deep-value="' + item.value + '"][data-deep-title]');
        if (node.length) {
            title = node.data('deep-title');
        }
    });
    return title;
}

function updateSerializedCollection(collection, map) {
    return merge.collections(collection, map, 'name');
}

function toQueryString(collection) {
    var result = collection.filter(function(item) {
        return item.value !== null;
    }).map(function(item) {
        return item.name + '=' + item.value;
    });
    if (result.length) {
        return '?' + result.join('&');
    } else {
        return location.pathname.split('/').slice(-1)[0] || 'index.html';
    }
}

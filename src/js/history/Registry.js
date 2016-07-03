"use strict";

var AmpersandCollection = require('ampersand-collection');
var url = require('url');
var Entry = require('./Entry');

module.exports = AmpersandCollection.extend({
    mainIndex: 'name',
    model: Entry,

    initialize: function() {
        AmpersandCollection.prototype.initialize.apply(this, arguments);

        var query = url.parse(global.location.href, true).query;
        for(var key in query) {
            if (query.hasOwnProperty(key)) {
                this.add({name: key, value: query[key]});
            }
        }
    }
});

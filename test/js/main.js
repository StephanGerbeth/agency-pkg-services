"use strict";

var js = require('../../src/parser/js')(require('./packages'));
var historySetup = require('./partials/history');

(function() {
    $(function() {
        js.parse();
        historySetup();
    });
})();

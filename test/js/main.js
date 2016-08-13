"use strict";

var js = require('../../src/parser/js')(require('./packages'));
var history = require('agency-pkg-services/history');

(function() {
    $(function() {
        js.parse();
        setup();
    });
})();

function setup() {
    console.log('history', history);
    // History Example
    var historyDeepName = 'history-test';
    var historyTitleEl = document.getElementById('history-title');
    var historyValueEl = document.getElementById('history-value');
    var historyDebugRegistryEl = document.getElementById('history-debug-registry');
    document.getElementById('history-click-update').addEventListener('click', function(e) {
        e.preventDefault();
        var map = [];
        map.push({
            name: historyDeepName,
            value: historyValueEl.value
        });
        history.update(map, historyTitleEl.value);
    });
    document.getElementById('history-click-replace').addEventListener('click', function(e) {
        e.preventDefault();
        var map = [];
        map.push({
            name: historyDeepName,
            value: historyValueEl.value
        });
        history.update(map);
    });
    history.register(historyDeepName, function() {
        var html = '';
        history.registry.models.forEach(function(model) {
            html += '<li>Name: ' + model.name + '; value: ' + model.value + '</li>';
        });
        historyDebugRegistryEl.innerHTML = html;
    });

}

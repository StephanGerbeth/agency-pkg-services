"use strict";

var history = require('agency-pkg-services/history');

module.exports = function() {

    console.log('history', history);
    // History Example

    var historyDeepName = 'history-test';
    var historySetTitleEl = document.getElementById('history-set-title');
    var historySetValueEl = document.getElementById('history-set-value');
    var historyDebugRegistryEl = document.getElementById('history-debug-registry');
    var historyValueEl = document.getElementById('history-value');

    // Listener

    history.register(historyDeepName, function(value) {

        historyValueEl.innerHTML = value;

        var html = '';
        history.registry.models.forEach(function(model) {
            html += '<li>Name: ' + model.name + '; value: ' + model.value + '</li>';
        });
        historyDebugRegistryEl.innerHTML = html;
    });

    // Events

    document.getElementById('history-click-apply').addEventListener('click', function(e) {
        e.preventDefault();
        var map = [];
        map.push({
            name: historyDeepName,
            value: historySetValueEl.value
        });
        if (historySetTitleEl.value) {
            history.update(map, historySetTitleEl.value);
        } else {
            history.update(map);
        }
    });

};

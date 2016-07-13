"use strict";

window.picture.addjQueryTriggerSupport($);
if (window.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
        window.picture.parse();
    }, false);
    window.addEventListener('resize', function () {
        window.picture.parse();
    }, false);
} else {
    document.attachEvent("onreadystatechange", function() {
        window.picture.parse();
    });
    window.attachEvent('onresize', function () {
        window.picture.parse();
    });
}

module.exports = window.picture;

"use strict";

var js = require('../../src-pkg/parser/js')(require('./packages'));

(function(){
    $(function() {
        js.parse();
    });
})();

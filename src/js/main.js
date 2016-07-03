"use strict";

var js = require('./parser/js')(require('./packages'));

(function(){
    $(function() {
        js.parse();
    });
})();

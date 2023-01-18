// ==UserScript==
// @name         athome-helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Athome's Helper
// @author       Willy Jansen
// @match        https://www.athome.co.jp/kodate/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js
// @require      https://github.com/willyjl/athome-helper/raw/master/src/element.js
// @grant        none
// @updateURL    https://github.com/willyjl/athome-helper/raw/master/src/index.js
// @downloadURL  https://github.com/willyjl/athome-helper/raw/master/src/index.js
// @run-at document-end
// ==/UserScript==

window.jq = $.noConflict(true);

(function() {
  'use strict';

  console.log("hello");
  athomeHelper.main(() => {
    athomeHelper.startApp();
  });
})();

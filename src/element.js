// PARENT_ELEMENT_ID = '#item-detai_basic'

(function (window) {
  let tableEl = `
    <div id="athome-helper" class="itemDataBox">
      <dl class="data typeTable">
        <dt class="cell01 I8I">Price</dt>
        <dd>{{price}}</dd>
      </dl>
    </div>
  `;

  let tableComp = new Vue({
    data: {
      price: 100000
    }
  });

  window.athomeHelper = {
    main(callback) {
      jq(document).ready(() => {
        callback();
      });
    },
    appendToBody() {
      jq("#item-detai_basic").prepend(tableEl);
      // jq(".mainItemInfo").prepend(tableEl);
    },
    startApp() {
      this.appendToBody();
      setTimeout(() => {
        tableComp.$mount('#athome-helper');
      }, 3000);
    }
  };
})(window);

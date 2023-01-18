(function (window) {
  let tableEl = `
    <div class="itemDataBox">
      <dl class="data typeTable">
        <dt class="cell01 I8I">Price</dt>
        <dd>100,000 円</dd>
      </dl>
    </div>
  `;

  window.athomeHelper = {
    main(callback) {
      jq(document).ready(function() {
        callback();
      });
    },
    appendToBody() {
      jq('#item-detai_basic').prepend(tableEl);
    },
    startApp() {
      this.appendToBody();
    }
  };
})(window);

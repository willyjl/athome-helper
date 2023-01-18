(function (window) {
  let el = `
    <div id="item-detai_basic" class="mainItemInfo">
      <div id="athome-helper" class="itemDataBox">
        <dl class="data typeTable">
          <dt class="cell01 I8I">価格</dt>
          <dd class="cell02">{{price}}</dd>
          <dt class="cell03 I8I">間取り</dt>
          <dd class="cell02">{{layout}}</dd>
        </dl>
        <dl class="data typeTable">
          <dt class="cell01 I8I">建物面積</dt>
          <dd class="cell02">{{houseArea}}</dd>
          <dt class="cell03 I8I">土地面積</dt>
          <dd class="cell02">{{landArea}}</dd>
        </dl>
        <dl class="data typeTable">
          <dt class="cell01 I8I">交通</dt>
          <dd class="cell02">
            <ul>
              <li v-for="station in stations" :key="station">{{station}}</li>
            </ul>
          </dd>
          <dt class="cell03 I8I">地図</dt>
          <dd class="cell02">{{mapExist}}</dd>
        </dl>
        <dl class="data typeTable">
          <dt class="cell01 I8I">備考</dt>
          <dd class="cell02">{{cautionNote}}</dd>
          <dt class="cell03 I8I">私道負担面積</dt>
          <dd class="cell02">{{publicRoadBurden}}</dd>
        </dl>
        <dl class="data typeTable">
          <dt class="cell01 I8I">駐車場</dt>
          <dd class="cell02">{{carPark}}</dd>
        </dl>
      </div>
    </div>
  `;

  let comp = new Vue({
    data: {
      price: '',
      layout: '',
      houseArea: '',
      landArea: '',
      stations: [],
      mapExist: false,
      cautionNote: '',
      publicRoadBurden: '',
      carPark: ''
    }
  });

  window.athomeHelper = {
    main(callback) {
      jq(document).ready(() => {
        callback();
      });
    },
    appendToBody() {
      // jq("#item-detai_basic").prepend(el);
      jq('.inner.width-save').prepend(el);
    },
    startApp() {
      this.appendToBody();
      setTimeout(() => {
        comp.price = jq('.num.fwB').text();
        comp.layout = jq('.cell04:eq(0)').text();
        comp.houseArea = jq('.cell03:contains("建物面積")+.cell02').text();
        comp.landArea = jq('.cell03:contains("土地面積")+.cell04').text();
        comp.stations = jq('.cell01:contains("交通")+dd').text().split('\n').reduce((acc, it) => {
          str = it.trim();
          if (str.length > 0 && str != "（電車ルート案内）") {
            acc.push(str);
          }
          return acc;
        }, []);
        comp.mapExist = jq('#detail-map').length == 1;
        comp.cautionNote = jq('th:contains("備考")~td>#accrodion_text').text();
        comp.publicRoadBurden = jq('th:contains("私道負担面積")~td').text();
        comp.carPark = jq('th.I8I:contains("駐車場")+td').text();

        comp.$mount('#athome-helper');
      }, 3000);
    }
  };
})(window);

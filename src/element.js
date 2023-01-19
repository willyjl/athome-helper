MAX_PRICE = 3000;
MIN_LAND_AREA = 100;

(function (window) {
  let el = `
    <div id="athome-helper">
      <dl>
        <dt>価格</dt>
        <dd>{{priceString()}}</dd>
        <dt>間取り</dt>
        <dd>{{layout}}</dd>
        <dt>建物面積</dt>
        <dd>{{houseArea}}</dd>
        <dt>土地面積</dt>
        <dd>{{landAreaString()}}</dd>
        <dt>交通</dt>
        <dd>
          <ul>
            <li v-for="station in stations" :key="station">{{station}}</li>
          </ul>
        </dd>
        <dt>都市ガス</dt>
        <dd v-if="cityGas">あり ✅</dd>
        <dd v-else>なし</dd>
        <dt>地図</dt>
        <dd v-if="mapExist">あり ✅</dd>
        <dd v-else>なし</dd>
        <dt>駐車場</dt>
        <dd v-if="carPark === '有 無料'">{{carPark}} ✅</dd>
        <dd v-else>{{carPark}}</dd>
        <dt>私道負担面積</dt>
        <dd v-if="isNil(publicRoadBurden)">なし ✅</dd>
        <dd v-else>{{publicRoadBurden}}</dd>
        <dt>備考</dt>
        <dd v-if="isNil(cautionNote)">なし ✅</dd>
        <dd v-else>{{cautionNote}}</dd>
      </dl>
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
      carPark: '',
      cityGas: false
    },
    methods: {
      priceString: function() {
        if (parseInt(this.price.replace(/[万円,]+/g, "")) <= 3000) {
          return `${this.price} ✅`;
        }
        return this.price;
      },
      landAreaString: function() {
        if (parseInt(this.landArea.replace(/[m²,]+/g, "")) <= 3000) {
          return `${this.landArea} ✅`;
        }
        return this.landArea;
      },
      isNil: function(str) {
        switch (str) {
          case '－':
          case 'なし':
          case '':
            return true;
          default:
            return false;
        }
      }
    }
  });

  window.athomeHelper = {
    main(callback) {
      jq(document).ready(() => {
        callback();
      });
    },
    insertElements() {
      jq('head').append(`
        <style type="text/css">
          #athome-helper {
            background: #f3f3ea;
            padding: 5px;
            border: 1px solid #ccc;
            position: fixed;
            left: 20px;
            top: 20%;
            width: 15%;
            z-index: 100;
          }

          #athome-helper dl {
            margin: 0 5px;
          }

          #athome-helper dt {
            font-size: 1.2em;
            font-weight: bold;
          }
        </style>
      `);
      jq('.inner.width-save').prepend(el);
    },
    startApp() {
      this.insertElements();
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
        comp.cautionNote = jq('th:contains("備考")~td>#accrodion_text').text().trim();
        comp.publicRoadBurden = jq('th:contains("私道負担面積")~td').text();
        comp.carPark = jq('th.I8I:contains("駐車場")+td').text();
        comp.cityGas = $('img[alt="都市ガス"]').attr('src').split('/').reverse()[0] === 'icon_tag_25_on.gif';

        comp.$mount('#athome-helper');
      }, 3000);
    }
  };
})(window);

//>>built
define("idx/gridx/mobile/tests/test_lazy_load",["dojo/_base/declare","dojo/domReady","dojo/store/JsonRest","dojox/mobile/parser","gridx/mobile/tests/support/data","gridx/mobile/Grid","gridx/mobile/LazyLoad","dojox/mobile/Heading","dojox/mobile/View","dojox/mobile/ScrollableView","dojox/mobile/compat","dojox/mobile/TabBar"],function(_1,_2,_3,_4,_5,_6,_7){var _8=[{field:"Artist",width:"46%",title:"Name"},{field:"Year",width:"18%",title:"Price"}];_2(function(){_4.parse();grid.columns=_8;grid.setStore(new _3({target:"../tests/support/JsonData.js"}));});});
//>>built
define("idx/app/_HashHandlerMixin",["dojo/_base/declare","dojo/_base/declare","dojo/_base/lang","dojo/hash","dojo/io-query","dojo/dom","dijit/registry","dojo/_base/connect"],function(_1,_2,_3,_4,_5,_6,_7,_8){var _9=_1("idx.app._HashHandlerMixin",[],{constructor:function(_a){},_setupHashHandler:function(){var _b=this;var _c=false;function _d(_e){try{_e=_e||_4();if(!_e){return;}_c=true;var _f=_5.queryToObject(_e);var _10=_f.context;if(_10&&_6.isDescendant(_6.byId(_10),_6.byId(_b.id+_b.CONTAINER_ID_TOP))){_7.byId(_b.id+_b.CONTAINER_ID_TOP).selectChild(_10);}else{return;}var _11=_f.tab;if(_11&&_6.isDescendant(_6.byId(_11),_6.byId(_10))){_7.byId(_10).selectChild(_11);}if(_7.byId(_11).isLoaded==true){delete _f.context;delete _f.tab;_7.byId(_11).context.onNavStateChanged(_f);}}finally{_c=false;}};function _12(_13){var _14={};if(_7.byId(_13).isLoaded==true){_14=_7.byId(_13).context._navState||{};}return _14;};var _15=_7.byId(this.id+this.CONTAINER_ID_TOP);this.connect(_15,"selectChild",function(_16){if(_c){return;}var _17={};_17.context=_7.byId(_16).id;_17.tab=_7.byId(_16).selectedChildWidget.id;_17=_3.mixin(_17,_12(_7.byId(_16).selectedChildWidget.id));_4(_5.objectToQuery(_17));});var _18=_7.byId(_b.id+_b.CONTAINER_ID_TOP).getChildren();for(var i=0;i<_18.length;i++){(function(_19){_b.connect(_19,"selectChild",function(tab){if(_c){return;}var h={context:_7.getEnclosingWidget(_7.byId(tab).domNode.parentNode).id,tab:_7.byId(tab).id};h=_3.mixin(h,_12(_7.byId(tab).id));_4(_5.objectToQuery(h));});})(_18[i]);}_8.subscribe("/dojo/hashchange",_3.hitch(this,function(_1a){_d(_1a);}));setTimeout(function(){_d(_4());},0);},_createItemForHash:function(_1b){var _1c=_2.safeMixin(_1b,{_navState:"",setNavState:_3.hitch(_1b,function(_1d){this._navState=_1d;var h={context:this.containerId,tab:this.id};h=_3.mixin(h,_1d);_4(_5.objectToQuery(h));}),onNavStateChanged:_3.hitch(_1b,function(_1e){this._navState=_1e;})});var _1f=_1b.onLoad;_1c.onLoad=function(w){_1f.call(_1c,w);var _20=_5.queryToObject(_4())||{};if(_20&&_20.context&&_20.tab&&_20.context===_1c.containerId&&_20.tab===_1c.id){delete _20["context"];delete _20["tab"];w.context.onNavStateChanged(_20);}};return _1c;}});return _9;});
//>>built
define("idx/form/_FocusManager",["dijit/focus","dojo/_base/window","dojo/window","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/declare","dojo/_base/lang","dijit/registry"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){_1._onTouchNode=function(_a,by){var _b=_a;if(this._clearActiveWidgetsTimer){clearTimeout(this._clearActiveWidgetsTimer);delete this._clearActiveWidgetsTimer;}var _c=[];try{while(_a){var _d=_5.get(_a,"dijitPopupParent");if(typeof _a.dijitPopupParent=="object"){_a=_a.dijitPopupParent;}else{if(_d){_a=_9.byId(_d)?_9.byId(_d).domNode:_4.byId(_d);}else{if(_a.tagName&&_a.tagName.toLowerCase()=="body"){if(_a===_2.body()){break;}_a=_3.get(_a.ownerDocument).frameElement;}else{var id=_a.getAttribute&&_a.getAttribute("widgetId"),_e=id&&_9.byId(id);if(_e&&!(by=="mouse"&&_e.get("disabled"))){if(!_e._isValidFocusNode||_e._isValidFocusNode(_b)){_c.unshift(id);}}_a=_a.parentNode;}}}}}catch(e){}this._setStack(_c,by);};return _1;});
//>>built
define("idx/widget/_EventTriggerMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/_base/lang","dojo/dom","dojo/request/iframe","dojo/mouse","dojo/on","dojo/window","dijit/_MenuBase"],function(_1,_2,_3,_4,_5,_6,_7,on,_8,_9){var _a={},_b={};return _2("idx.widget._EventTriggerMixin",null,{_bindings:null,_hoverTimer:null,hoverDuration:_9.prototype.popupDelay,constructor:function(){this._bindings=[];},_addEventTrigger:function(_c,_d,_e,_f){_c=_5.byId(_c);if(!_c){require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Invalid triggerNode parameter.");return;}var _10=_4.hitch(this,function(_11){var _12={triggerNode:_c,eventName:_d,event:_11,additionalData:_f};if(!_e||_e(_12)){this._onTrigger(_12);}});var _13=function(_14){return {type:"hover",pageX:_14.pageX,pageY:_14.pageY,screenX:_14.screenX,screenY:_14.screenY,clientX:_14.clientX,clientY:_14.clientY};};var _15={triggerNode:_c,connectHandles:[]};if(_d=="hover"){_15.hoverDuration=this.hoverDuration;_15.hoverTimer=null;}_15.bindFunction=function(){var _16;if(_c.tagName=="IFRAME"){try{var _17=_6.doc(_c);_16=_17?_17.body:null;}catch(e){require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Error accessing body of document within iframe. "+e);}}else{_16=_c;}if(!_16){require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Unable to determine node to attach event listener(s) to.");return;}if(_d=="hover"){var _18=null;_15.connectHandles.push(on(_16,_7.enter,_4.hitch(this,function(_19){_18=_13(_19);if(_15.hoverTimer){clearTimeout(_15.hoverTimer);}_15.hoverTimer=setTimeout(function(){_10(_18);},_15.hoverDuration);})));_15.connectHandles.push(on(_16,_7.leave,_4.hitch(this,function(_1a){if(_15.hoverTimer){clearTimeout(_15.hoverTimer);_15.hoverTimer=null;}_18=undefined;})));_15.connectHandles.push(on(_16,"mousemove",function(_1b){_18=_13(_1b);}));}else{_15.connectHandles.push(on(_16,_d,function(_1c){_10(_1c);}));}};_15.unbindFunction=function(){_1.forEach(_15.connectHandles,function(_1d){_1d.remove();});if(_15.hoverTimer){clearTimeout(_15.hoverTimer);_15.hoverTimer=null;}};if(_c.tagName==="IFRAME"){_15.iframeOnLoadHandler=function(_1e){try{_15.unbindFunction();}catch(e){}_15.bindFunction();};if(_c.addEventListener){_c.addEventListener("load",_15.iframeOnLoadHandler,false);}else{_c.attachEvent("onload",_15.iframeOnLoadHandler);}}this._bindings.push(_15);_15.bindFunction();},_onTrigger:function(_1f){},_removeEventTriggers:function(_20){if(_20){_20=_5.byId(_20);}for(var i=this._bindings.length-1;i>=0;i--){var _21=this._bindings[i];if(!_20||(_20===_21.triggerNode)){_21.unbindFunction();if(_21.iframeOnLoadHandler){if(_21.triggerNode.removeEventListener){_21.triggerNode.removeEventListener("load",_21.iframeOnLoadHandler,false);}else{_21.triggerNode.detachEvent("onload",_21.iframeOnLoadHandler);}}this._bindings.splice(i,1);}}}});});
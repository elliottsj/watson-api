//>>built
define("idx/widget/TypeAhead",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/html","dojo/_base/connect","dojo/_base/xhr","dojo/window","dojo/query","dojo/keys","dijit/popup","dijit/_Widget","dijit/_TemplatedMixin","idx/util","idx/resources"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){var _10;var _11=_1("idx.widget.TypeAhead",[_c],{connectedNode:"",isShowing:false,type:"store",store:null,labelAttr:"name",valueAttr:"value",queryOptions:{ignoreCase:true},url:"",encode:false,polling:true,_pollingTimer:null,pollingInterval:500,_lastValue:"",_popupWidget:null,closable:false,persist:false,_previousRequest:null,timeout:3000,cacheEnabled:true,_cachedMap:[],_blurTimer:null,blurInterval:300,_handlers:[],method:"POST",constructor:function(){this._handlers=[];this._cachedMap=[];},buildRendering:function(){this.inherited(arguments);this._popupWidget=new _10({onClick:_2.hitch(this,this._onClick),onClose:_2.hitch(this,this._onClose),id:this.id+"_popup",closable:this.closable,dir:this.dir});},postCreate:function(){this.inherited(arguments);var _12=this.connectedNode=this.getNodeById(this.connectedNode);this.attachHandlers(_12);},startup:function(){if(this._started){return;}this.inherited(arguments);this._popupWidget.startup();},attach:function(id){var _13=this.getNodeById(id);if(!_13||(this.connectedNode==_13)){return;}this.detach();this.attachHandlers(_13);this.connectedNode=_13;},attachHandlers:function(_14){if(_14){this._handlers.push(_6.connect(_14,"onkeyup",this,"_onInputKeyup"));this._handlers.push(_6.connect(_14,"onblur",this,"_onBlur"));this._handlers.push(_6.connect(_14,"onkeydown",this,"_onInputKeyDown"));this._handlers.push(_6.connect(window,"onresize",this,"hideResults"));if(!_e.isFF){this._handlers.push(_6.connect(this._popupWidget.domNode,"onmousedown",this,function(){this._popupScrollbarClicked=true;}));}}},getNodeById:function(id){if(!id){return null;}return (id.nodeName&&(id.nodeType==1))?id:_5.byId(id);},detach:function(){this.clearResults();this._lastValue="";_3.forEach(this._handlers,_6.disconnect);this.clearCache();this.clearPollingTimer();this.connectedNode=null;},_onInputKeyup:function(e){var key=e.keyCode;var dk=_a;var _15=!((key==dk.UP_ARROW)||(key==dk.DOWN_ARROW)||(key==dk.LEFT_ARROW)||(key==dk.RIGHT_ARROW));var _16=e.target.value;if(!this.polling&&_15&&(_16!=this._lastValue)){this.loadSuggestions(_16);}},_onInputKeyDown:function(e){var key=e.keyCode;var dk=_a;switch(key){case dk.ENTER:this.abortRequest();this._onExecute();this._lastValue=e.target.value;break;case dk.PAGE_UP:case dk.UP_ARROW:this.clearPollingTimer();this._onKeyUpArrow();break;case dk.PAGE_DOWN:case dk.DOWN_ARROW:this.clearPollingTimer();this._onKeyDownArrow();break;case dk.LEFT_ARROW:case dk.RIGHT_ARROW:this.clearPollingTimer();break;case dk.ESCAPE:this.setDisplayedValue(this._lastValue);this.hideResults();break;default:if(this.polling&&(this._pollingTimer==null)){this._onStartPolling(true);}break;}},_onStartPolling:function(_17){var _18=this;if(!_17&&(_18._pollingTimer==null)){return;}_18._pollingTimer=setTimeout(function(){var _19=_18.connectedNode.value;if(_18._lastValue!=_19){_18.loadSuggestions(_19);}_18._onStartPolling(false);},_17?0:_18.pollingInterval);},loadSuggestions:function(_1a){this._lastValue=_1a;if(_2.trim(_1a)==""){this.abortRequest();this.clearResults();this._lastValue="";return;}if(this.cacheEnabled){var _1b=this.loadFromCache(_1a);if(_1b){this.renderResults(_1b,true);return;}}if(this.store){this.loadStoreSuggestions(_1a);}else{this.remoteLoadSuggestions(_1a);}},remoteLoadSuggestions:function(_1c){if(this.encode){_1c=encodeURIComponent(_1c);}var _1d=this.getContentParam(_1c);var _1e={url:this.url,content:_1d,load:_2.hitch(this,function(_1f){this.renderResults(_1f,false);}),timeout:this.timeout};this.abortRequest();this._previousRequest=(this.method.toLowerCase()=="post")?_7("POST",_1e):_7("GET",_1e);},loadStoreSuggestions:function(_20){var _21=this,_22=this.store,_23=this.labelAttr,_24=this.valueAttr;var _25=[],_26={};_26[_23]=_20+"*";var _27={query:_26,queryOptions:this.queryOptions,onItem:function(_28,_29){var obj={label:_28[_23][0],value:_28[_24][0]};_25.push(obj);},onComplete:function(_2a,_2b){var _2c=_21.jsonToHtml(_25);_21.renderResults(_2c,false);}};var _2d=this.store.fetch(_27);},getContentParam:function(_2e){return {"prefix":_2e};},abortRequest:function(){var _2f=this._previousRequest;if(_2f){_2f.canceled=true;_2f.ioArgs.xhr.abort();}},loadFromCache:function(_30){var _31=this._cachedMap;for(var i=_31.length-1;i>=0;i--){var _32=_31[i][0];if(_32==_30){return _31[i][1];}}return false;},renderResults:function(_33,_34){this.clearResults();var _35=(this.type.toLowerCase()=="json")?this._jsonToHtml(_33):_33;var _36=this._popupWidget.render(_35);if(_36){this.showResults();this._popupWidget.attachHandlers();}if(this.cacheEnabled&&!_34){this._cachedMap.push([this._lastValue,_33]);}},_jsonToHtml:function(_37){var _38=null;try{_38=_4.fromJson(_37);}catch(e){return;}return this.jsonToHtml(_38);},jsonToHtml:function(_39){var _3a=["<table class='typeAheadTable'><tbody>"];for(var i=0,len=_39.length;i<len;i++){_3a.push("<tr class='");_3a.push((i%2==0)?"typeAheadTableRow":"typeAheadTableRow typeAheadTableRowOdd");_3a.push("'><td class='typeAheadTableCell' value='");_3a.push(_39[i].value);_3a.push("'>");_3a.push(_39[i].label);_3a.push("</td></tr>");}_3a.push("</tbody></table>");return _3a.join("");},clearCache:function(){this._cachedMap=[];},clearResults:function(){this.hideResults();this._popupWidget.clearList();},hideResults:function(){_b.close(this._popupWidget);this.isShowing=false;_5.style(this.domNode,"display","none");},showResults:function(){if(this._popupWidget.domNode.firstChild){var _3b=_b.open({popup:this._popupWidget,around:this.connectedNode});this.isShowing=true;this._popupWidget.setWidth(_5.marginBox(this.connectedNode).w);this._popupWidget.adjustScrollBar();}},_onKeyUpArrow:function(){this._onKeyUpDownArrow(-1);},_onKeyDownArrow:function(){this._onKeyUpDownArrow(1);},_onKeyUpDownArrow:function(_3c){if(!this.isShowing){this.showResults();}else{var pw=this._popupWidget;pw.selectNextNode(_3c);var sn=pw._selectedNode;var snf=sn?sn.firstChild:null;if(sn&&snf&&_5.attr(snf,"value")){this.setDisplayedValue(_5.attr(snf,"value"));}else{this.setDisplayedValue(this._lastValue);}}},_onBlur:function(){if(this.isShowing){this._blurTimer=setTimeout(_2.hitch(this,function(){this._blurTimer=null;if(this.persist){return;}if(!this._popupScrollbarClicked){this.hideResults();}else{this.connectedNode.focus();}this._popupScrollbarClicked=false;}),this.blurInterval);}this.clearPollingTimer();this.onBlur();},onBlur:function(){},clearPollingTimer:function(){if(this._pollingTimer!=null){clearTimeout(this._pollingTimer);this._pollingTimer=null;}},_onClick:function(e){var sn=this._popupWidget._selectedNode;if(sn&&sn.firstChild){this.setDisplayedValue(_5.attr(sn.firstChild,"value"));}this.hideResults();this.onClick(e);},onClick:function(e){},_onExecute:function(){this.hideResults();setTimeout(_2.hitch(this,this.onExecute));},onExecute:function(){},_onClose:function(){this.hideResults();},setDisplayedValue:function(_3d){this.connectedNode.value=_3d;},getDisplayedValue:function(){return this.connectedNode.value;},clearBlurTimer:function(){if(this._blurTimer!=null){clearTimeout(this._blurTimer);}},_setUrlAttr:function(url){if(this.url!=url){this.detach();this.attachHandlers(this.connectedNode);}this.url=url;},setStore:function(_3e){this.store=_3e;},destroy:function(){this._popupWidget.destroy();_3.forEach(this._handlers,_6.disconnect);this.inherited(arguments);}});_10=_1("idx.widget._TypeAheadPopup",[_c,_d],{templateString:"<div class='idxTypeAhead'></div>",_selectedNode:null,res:null,_handlers:[],constructor:function(){this._handlers=[];},postMixInProperties:function(){this.inherited(arguments);this.res=_f.getResources("idx/widget/TypeAhead",this.lang);},postCreate:function(){this.inherited(arguments);this.connect(this.domNode,"onfocus","_onFocus");},render:function(_3f){this.domNode.innerHTML=_3f;var _40=this.domNode.firstChild;if(!(_40&&_40.tagName=="TABLE")){return false;}var trs=_9("tr",_40);if(trs.length>0){this._showList();return true;}return false;},attachHandlers:function(){var trs=_9("tr",this.domNode.firstChild);var len=trs.length;_3.forEach(trs,function(tr){this._handlers.push(_6.connect(tr,"onmouseover",this,function(e){this._onMouseOver(e,tr);}));this._handlers.push(_6.connect(tr,"onclick",this,function(e){this._onClick(e,tr);}));},this);if(this.closable&&len>0){var _41=_5.create("tr",{className:(len%2==0)?"typeAheadTableRow":"typeAheadTableRow typeAheadTableRowOdd"},trs[len-1],"after");var _42=_5.create("td",{className:"typeAheadTableCell typeAheadCloseNode"},_41);var a=_5.create("a",{href:"javascript:;",title:this.res.idxTypeAhead_close,innerHTML:this.res.idxTypeAhead_close},_42);a.onclick=this.onClose;}},_showList:function(){_5.style(this.domNode,"display","");},selectNextNode:function(_43){if(this.domNode.firstChild){var sn=this._selectedNode;if(!sn){this._selectFirstOrLastNode(_43);}else{var nn=this._getNextNode(_43);this._removeSelectedClass();if(!nn){this._selectedNode=null;}else{this._selectNode(nn);}}}},_getNextNode:function(_44){var _45=this.domNode.firstChild;if(_45!=null){var _46=_9("tr",_45);for(var i=0,len=_46.length;i<len;i++){if(this._selectedNode==_46[i]){return (_44<0)?_46[i-1]:_46[i+1];}}}return null;},_selectFirstOrLastNode:function(_47){var _48=this.domNode.firstChild;if(_48!=null){var _49=_9("tr",_48);var len=_49.length;if(len>0){this._selectNode(_49[(_47<0)?len-1:0]);}}},_selectNode:function(_4a){if(_4a&&(_4a.tagName=="TR")){_5.addClass(_4a,"typeAheadTableRowSelected");this._selectedNode=_4a;this.adjustScrollBar();}},_onMouseOver:function(e,tr){this._removeSelectedClass();this._selectNode(tr);},_onClick:function(e,tr){this._removeSelectedClass();this._selectNode(tr);this.onClick(e);},onClick:function(e){},onClose:function(e){},_onFocus:function(e){},_removeSelectedClass:function(){var sn=this._selectedNode;if(sn){_5.removeClass(sn,"typeAheadTableRowSelected");}},clearList:function(){this._selectedNode=null;_3.forEach(this._handlers,_6.disconnect);_5.empty(this.domNode);},setWidth:function(_4b){_5.marginBox(this.domNode,{w:_4b});},adjustScrollBar:function(){var _4c=this.domNode.firstChild;if(_4c){if(_5.contentBox(this.domNode).h<_5.contentBox(_4c).h){var sn=this._selectedNode;if(sn!=null){_8.scrollIntoView(sn);}}}},destroy:function(){_3.forEach(this._handlers,_6.disconnect);this.inherited(arguments);}});return _11;});
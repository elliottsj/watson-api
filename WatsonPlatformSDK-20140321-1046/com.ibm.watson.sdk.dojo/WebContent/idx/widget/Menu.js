//>>built
require({cache:{"url:idx/widget/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\r\n\t<tbody class=\"dijitReset\">\r\n\t\t<tr data-dojo-attach-point=\"_columnContainerNode\">\r\n\t\t\t<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t\t\t\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t\t\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes,containerNode\">\r\n<!-- this is column 0, which also starts out as the container node so menu items are initially loaded here.\r\n     containerNode changes to point to _columnContainerNode once the widget has initialised, so the whole set of columns is the container.\r\n\t this must be kept in synch with _MenuColumn.html -->\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n","url:idx/widget/templates/_MenuColumn.html":"<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes\">\r\n<!-- this must be kept in synch with column 0 included in Menu.html -->\r\n\t\t</tbody>\r\n\t</table>\r\n</td>"}});define("idx/widget/Menu",["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom-geometry","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/Menu","dijit/MenuItem","dijit/registry","./_MenuOpenOnHoverMixin","dojo/text!./templates/Menu.html","dojo/text!./templates/_MenuColumn.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){var _e={"error":"oneuiErrorMenuItemIcon","warning":"oneuiWarningMenuItemIcon","confirmation":"oneuiConfirmationMenuItemIcon","information":"oneuiInformationMenuItemIcon","success":"oneuiSuccessMenuItemIcon","critical":"oneuiCriticalMenuItemIcon","attention":"oneuiAttentionMenuItemIcon","compliance":"oneuiComplianceMenuItemIcon"};var _8=_3("idx.widget.Menu",[_8,_b],{_containerNodes:null,columnNodes:null,menuForDialog:true,templateString:_c,constructor:function(){this._containerNodes=[];this.columnNodes=[];},childSelector:function(_f){var _10=_a.byNode(_f);return (_2.indexOf(this._containerNodes,_f.parentNode)>=0)&&_10&&_10.focus;},_getNextFocusableChild:function(_11,dir){var _12=null;var _13=this.getChildren();var _14;if(_11!=null){_14=_2.indexOf(_13,_11);if(_14!=-1){_14+=dir;if(_14<0){_14=_13.length-1;}if(_14>=_13.length){_14=0;}}}else{if(_13.length==0){_14=-1;}else{_14=(dir==1)?0:_13.length-1;}}if(_14!=-1){var i=_14;do{if(_13[i].isFocusable()){_12=_13[i];break;}i+=dir;if(i<0){i=_13.length-1;}if(i>=_13.length){i=0;}}while(i!=_14);}return _12;},_moveToColumn:function(dir){if(this.focusedChild){for(var i=0;i<this._containerNodes.length;i++){if(this.focusedChild.domNode.parentNode==this._containerNodes[i]){var _15=i,_16=_5.getMarginBox(this.focusedChild.domNode).t;break;}}}if(_15!=undefined){for(i=_15+dir;i>=0&&i<this._containerNodes.length;i+=dir){var _17=_a.findWidgets(this._containerNodes[i]);var _18=dojo.filter(_17,function(_19){return _19.isFocusable();});if(_18.length>0){var _1a=i;break;}}if(_1a!=undefined){for(i=0;i<_18.length;i++){var _1b=_18[i];var _1c=_5.getMarginBox(_1b.domNode);if(_16>=_1c.t&&_16<=_1c.t+_1c.h-1){this.focusChild(_1b);return true;}else{if(_16<_1c.t){if(i>0){this.focusChild(_18[i-1]);return true;}else{this.focusChild(_1b);return true;}}else{if(i==_18.length-1){this.focusChild(_1b);return true;}}}}}}return false;},_onKeyPress:function(evt){if(evt.ctrlKey||evt.altKey){return;}switch(evt.charOrCode){case this._openSubMenuKey:if(!this._moveToColumn(+1)){this._moveToPopup(evt);}_4.stop(evt);break;case this._closeSubMenuKey:if(!this._moveToColumn(-1)){if(this.parentMenu){if(this.parentMenu._isMenuBar){this.parentMenu.focusPrev();}else{this.onCancel(false);}}}_4.stop(evt);break;}},refresh:function(){var _1d=this.getChildren();for(var i=0;i<_1d.length;i++){this.addChild(_1d[i]);}},buildRendering:function(){this.inherited(arguments);this.containerNode=this._columnContainerNode;},startup:function(){if(this._started){return;}this._started=true;this.inherited(arguments);this.refresh();},addChild:function(_1e,_1f){while(this._containerNodes.length<=(_1e.column||0)){var _20=_6.getCachedTemplate(_d).cloneNode(true);this._attachTemplateNodes(_20,function(n,p){return n.getAttribute(p);});this._columnContainerNode.appendChild(_20);}this.containerNode=this._containerNodes[_1e.column||0];this.inherited(arguments);this.containerNode=this._columnContainerNode;}});_8.createMessageMenuItem=function(_21){var _22="";if(_21){if(_21.timestamp){_22+="‏<span class=\"messageMenuTimestamp messagesContrast\">‎"+_21.timestamp+"‏</span>‎";}if(_21.content){_22+="‏ <span class=\"messageTitles\">‎"+_21.content+"‏</span>‎";}if(_21.messageId){_22+="‏ <span class=\"messagesContrast\">(‎"+_21.messageId+"‏)</span>‎";}}return new _9({label:_22,iconClass:_21&&_21.type&&_e[_21.type]});};var _23=_1.getObject("idx.oneui",true);_23.Menu=_8;return _8;});
//>>built
define("idx/grid/cells",["dojo/_base/lang","idx/main","dojo/_base/declare","dojo/keys","dojo/date/locale","dojo/aspect","dojo/_base/event","dojo/dom-construct","dojo/dom-attr","dojo/dom-geometry","dijit/_base/manager","dijit/form/CheckBox","dijit/form/RadioButton","dojox/grid/cells","../form/Select","../form/CheckBoxSelect","../resources","dojo/i18n!../nls/base","dojo/i18n!./nls/base","dojo/i18n!./nls/cells"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){var _12=_1.getObject("grid.cells",true,_2);_12._Widget=_3("idx.grid.cells._Widget",_e.Cell,{readonly:false,constructor:function(){this.editable=false;this._widgets=[];},formatter:function(_13,_14){var _15=this._getWidget(_14);_15._onChangeActive=false;_15.set("value",_13);_15._lastValueReported=_13;_15._onChangeActive=true;return _15;},apply:function(_16){var _17=this._getWidget(_16);if(_17){var _18=_17.get("value");var _19=this.grid;_19.edit.apply();var _1a=_19.getItem(_16);_19.store.setValue(_1a,this.field,_18);}},_getWidget:function(_1b){var _1c=this._widgets[_1b];if(!_1c){_1c=this._widgets[_1b]=this._createWidget(_1b);}return _1c;},_createWidget:function(_1d){return null;},_resizeWidget:function(_1e){var _1f=this._widgets[_1e];if(_1f){var _20=this.getNode(_1e);var box=_a.getContentBox(_20);_a.getMarginBox(_1f.domNode,{w:box.w-1});}}});_12._Widget.markupFactory=function(_21,_22){_e.Cell.markupFactory(_21,_22);var _23=_1.trim(_9.get(_21,"readonly")||"");if(_23){_22.readonly=(_23.toLowerCase()=="true");}};_12.CheckBox=_12.Checkbox=_3("idx.grid.cells.CheckBox",_12._Widget,{allCheckable:false,labelText:"",formatter:function(_24,_25){var _26=_11.getResources("idx/grid/cells");if(this.allCheckable){if(this._headerWidget&&this._headerWidget.domNode&&!this._headerWidget.domNode.firstChild){this._headerWidget.destroy();delete this._headerWidget;}if(!this._headerWidget){var _27=this;var _28=function(_29){_27.checkAll(_27._headerWidget.checked);_7.stop(_29);};var _2a=function(_2b){_7.stop(_2b);};var _2c=this._headerWidget=new _c({onClick:_28,onMouseDown:_2a,onMouseUp:_2a,title:_26.headerCheckBoxLabel});_9.set(_2c.focusNode,"aria-label",_26.headerCheckBoxLabel);var _27=this;var _2d=this.grid;_2c.own(_6.after(_2d,"onKeyDown",function(_2e){if(_2e.keyCode==_4.SPACE&&_2d.focus.getHeaderIndex()==_27.index){_2c._onClick(_2e);}},true));}var _2f=this.getHeaderNode();if(_2f){var _30=_b.findWidgets(_2f)[0];if(!_30){_8.place(this._headerWidget.domNode,_2f.firstChild,"first");}}if(this._headerWidget.checked!=_24){this._headerWidget.set("checked",this.isAllChecked());}}var _30=this._getWidget(_25);_30.set("checked",(_24&&_24!="false"));return _30;},_createWidget:function(_31){var _32=_11.getResources("idx/grid/cells");var _33=this;var _34=this.grid;var _35=function(_36){_33.apply(_31);setTimeout(function(){_34.focus.findAndFocusGridCell();},0);_7.stop(_36);};var _37=new _c({onClick:_35,title:_32.rowCheckBoxLabel});_9.set(_37.focusNode,"aria-label",_32.rowCheckBoxLabel);_37.own(_6.after(_34,"onKeyDown",function(_38){if(_38.keyCode==_4.SPACE&&_34.focus.isFocusCell(_33,_31)&&_34.focus.getHeaderIndex()<0){_37._onClick(_38);}},true));return _37;},apply:function(_39){var _3a=this._getWidget(_39);if(_3a){var _3b=_3a.checked;var _3c=this.grid;_3c.edit.apply();var _3d=_3c.getItem(_39);_3c.store.setValue(_3d,this.field,_3b);}},checkAll:function(_3e){var _3f=this.grid.rowCount;for(var i=0;i<_3f;i++){var _40=this._widgets[i];if(_40&&_40.checked!=_3e){_40.set("checked",_3e);this.apply(i);}}},isAllChecked:function(){var _41=this.grid.rowCount;for(var i=0;i<_41;i++){var _42=this._widgets[i];if(_42&&!_42.checked){return false;}}return true;}});_12.CheckBox.markupFactory=function(_43,_44){_12._Widget.markupFactory(_43,_44);var _45=_1.trim(_9.get(_43,"allCheckable")||"");if(_45){_44.allCheckable=(_45.toLowerCase()=="true");}};_12.RowSelector=_3("idx.grid.cells.RowSelector",_12.CheckBox,{get:function(_46){return this.grid.selection.isSelected(_46);},formatter:function(){if(!this._selectionChanged){this._selectionChanged=_1.hitch(this,this.render);this.grid.own(_6.after(this.grid,"onSelectionChanged",this._selectionChanged,true));}return this.inherited(arguments);},apply:function(_47){var _48=this._getWidget(_47);if(_48){var _49=_48.checked;if(_49){this.grid.selection.addToSelection(_47);}else{this.grid.selection.deselect(_47);}if(this._headerWidget&&this._headerWidget.checked!=_49){this._headerWidget.set("checked",this.isAllChecked());}}},render:function(){var _4a=true;var _4b=this.grid.rowCount;for(var i=0;i<_4b;i++){var _4c=this._getWidget(i);var _4d=this.get(i);if(_4c&&_4c.checked!=_4d){_4c.set("checked",_4d);}if(!_4d){_4a=false;}}if(this._headerWidget&&this._headerWidget.checked!=_4a){this._headerWidget.set("checked",_4a);}}});_12.RowSelector.markupFactory=function(_4e,_4f){_12.CheckBox.markupFactory(_4e,_4f);};_12.RadioButton=_3("idx.grid.cells.RadioButton",_12.CheckBox,{_selectedIndex:-1,formatter:function(_50,_51){if(_50){this._selectedIndex=_51;}return this.inherited(arguments);},_createWidget:function(_52){var _53=this;var _54=this.grid;var _55=function(_56){_53.apply(_52);setTimeout(function(){_54.focus.findAndFocusGridCell();},0);_7.stop(_56);};var _57=new _d({onClick:_55});_57.own(_6.after(_54,"onKeyDown",function(_58){if(_58.keyCode==_4.SPACE&&_54.focus.isFocusCell(_53,_52)&&_54.focus.getHeaderIndex()<0){_57._onClick(_58);}},true));return _57;},apply:function(_59){var _5a=this._getWidget(_59);if(_5a){var _5b=_5a.checked;var _5c=this.grid;_5c.edit.apply();var _5d=this._selectedIndex;if(_5b&&_5d>=0&&_5d!=_59){var _5e=_5c.getItem(_5d);_5c.store.setValue(_5e,this.field,false);}var _5f=_5c.getItem(_59);_5c.store.setValue(_5f,this.field,_5b);}}});_12.RadioButton.markupFactory=function(_60,_61){_12.CheckBox.markupFactory(_60,_61);};_12.Select=_3("idx.grid.cells.Select",_12._Widget,{store:null,placeHolder:"",formatter:function(_62,_63){var _64=this;setTimeout(function(){_64._resizeWidget(_63);},0);return this.inherited(arguments);},_createWidget:function(_65){var _66=this;var _67=this.grid;var _68=function(_69){_7.stop(_69);};var _6a=function(){_66.apply(_65);setTimeout(function(){_67.focus.findAndFocusGridCell();},0);};var _6b=new _f({store:this.store,placeHolder:this.placeHolder,onClick:_68,onChange:_6a});if(!_6b.toggleDropDown){_6b.toggleDropDown=function(){if(this._isShowingNow){this._hideResultList();}else{this._startSearchAll();}};}_6b.own(_6.after(_67,"onKeyDown",function(_6c){if(_6c.keyCode==_4.SPACE&&_67.focus.isFocusCell(_66,_65)&&_67.focus.getHeaderIndex()<0){_6b.toggleDropDown();}},true));return _6b;},setStore:function(_6d){this.store=_6d;}});_12.Select.markupFactory=function(_6e,_6f){_12._Widget.markupFactory(_6e,_6f);var _70=_1.trim(_9.get(_6e,"store")||"");if(_70){_6f.store=_1.getObject(_70);}var _71=_1.trim(_9.get(_6e,"placeHolder")||"");if(_71){_6f.placeHolder=_71;}};_12.MultiSelect=_3("idx.grid.cells.MultiSelect",_12.Select,{get:function(_72,_73){var _74;var _75=this.grid.store;if(_75.isItem(_73)){_74=_75.getValues(_73,this.field);}return (_74||[]);},apply:function(_76){var _77=this._getWidget(_76);if(_77){var _78=_77.get("value");var _79=this.grid;_79.edit.apply();var _7a=_79.getItem(_76);_79.store.setValues(_7a,this.field,(_78||[]));}},_createWidget:function(_7b){var _7c=this;var _7d=this.grid;var _7e=function(_7f){_7.stop(_7f);};var _80=function(){_7c.apply(_7b);setTimeout(function(){_7d.focus.findAndFocusGridCell();},0);};var _81=new _10({store:this.store,placeHolder:this.placeHolder,onClick:_7e,onChange:_80,"class":"dijitSelectFixedWidth"});if(!_81.toggleDropDown){_81.toggleDropDown=function(){if(this._isShowingNow){this._hideResultList();}else{this._startSearchAll();}};}_81.own(_6.after(_7d,"onKeyDown",function(_82){if(_82.keyCode==_4.SPACE&&_7d.focus.isFocusCell(_7c,_7b)&&_7d.focus.getHeaderIndex()<0){_81.toggleDropDown();}},true));return _81;}});_12.MultiSelect.markupFactory=function(_83,_84){_12.Select.markupFactory(_83,_84);};_12.Text=_3("idx.grid.cells.Text",_e.Cell,{textClass:"",placeHolder:"&nbsp;",applyOnBlur:false,get:function(_85,_86){var _87;var _88=this.grid.store;if(_88.isItem(_86)){_87=_88.getValue(_86,this.field);}return (_87||"");},formatter:function(_89){var _8a=this.textClass;if(!_89){_89=this.placeHolder;_8a=(_8a?_8a+" ":"")+"idxGridPlaceHolder";}return "<div class='"+_8a+"'>"+_89+"</div>";},formatNode:function(_8b,_8c,_8d){this.inherited(arguments);if(_8b&&this.applyOnBlur&&this.editable){var _8e=this;this._handle=_6.after(_8b,"onblur",function(){setTimeout(function(){if(_8e.grid.edit.isEditCell(_8d,_8e.index)){_8e.grid.edit.apply();}},100);if(_8e._handle){_8e._handle.remove();delete _8e._handle;}},true);}},destroy:function(){if(this._handle){this._handle.remove();delete this._handle;}this.inherited(arguments);}});_12.Text.markupFactory=function(_8f,_90){_e.Cell.markupFactory(_8f,_90);var _91=_1.trim(_9.get(_8f,"textClass")||"");if(_91){_90.textClass=_91;}var _92=_1.trim(_9.get(_8f,"placeHolder")||"");if(_92){_90.placeHolder=_92;}var _93=_1.trim(_9.get(_8f,"applyOnBlur")||"");if(_93){_90.applyOnBlur=(_93.toLowerCase()=="true");}};_12.DateTime=_3("idx.grid.cells.DateTime",_12.Text,{selector:"",formatLength:"medium",formatter:function(_94){if(_94){arguments[0]=_5.format(new Date(_94),{selector:this.selector,formatLength:this.formatLength,fullYear:true});}return this.inherited(arguments);}});_12.DateTime.markupFactory=function(_95,_96){_12.Text.markupFactory(_95,_96);var _97=_1.trim(_9.get(_95,"selector")||"");if(_97){_96.selector=_97;}var _98=_1.trim(_9.get(_95,"formatLength")||"");if(_98){_96.formatLength=_98;}};_12.Empty=_3("idx.grid.cells.Empty",_e.Cell,{formatter:function(){return "";}});_12.Empty.markupFactory=function(_99,_9a){_e.Cell.markupFactory(_99,_9a);};return _12;});
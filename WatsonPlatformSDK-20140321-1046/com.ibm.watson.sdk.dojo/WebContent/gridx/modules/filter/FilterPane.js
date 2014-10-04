//>>built
require({cache:{"url:gridx/templates/FilterPane.html":"<ul class=\"dojoxGridxFilterPaneForm\">\n\t<li><label>Column</label></li>\n\t<li name=\"sltColumn\">\n\t\t<div dojoType=\"dijit.form.Select\" style=\"width:100%;\"></div>\n\t</li>\n\t<li><label>Condition</label></li>\n\t<li name=\"sltCondition\">\n\t\t<div dojoType=\"dijit.form.Select\"style=\"width:100%;\"></div>\n\t</li>\n\t<li><label>Value</label></li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneTextWrapper\">\n\t\t<input type=\"text\" dojoType=\"dijit.form.TextBox\" intermediateChanges=\"true\"\n\t\t style=\"width:100%;\"/>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneComboWrapper\">\n\t\t<input type=\"text\" dojoType=\"dijit.form.ComboBox\" \n\t\t\tintermediateChanges=\"true\" autoComplete=\"false\" queryExpr=\"*${0}*\" \n\t\t\tdropDownClass=\"gridx.modules.filter.DistinctComboBoxMenu\"\n\t\t\tstyle=\"width:100%;\"/>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneNumberWrapper\">\n\t\t<input type=\"text\" dojoType=\"dijit.form.NumberTextBox\" intermediateChanges=\"true\" style=\"width:100%;\"/>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneDateWrapper\">\n\t\t<div dojoType=\"dijit.form.DateTextBox\" intermediateChanges=\"true\" style=\"width: 100%\"></div>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneDateRangeWrapper\">\n\t\t<div dojoType=\"dijit.form.DateTextBox\" style=\"width:44%; float: left;\" intermediateChanges=\"true\"></div>\n\t\t<div style=\"width:10%; text-align: center; float: left;\">to</div>\n\t\t<div dojoType=\"dijit.form.DateTextBox\" style=\"width:44%; float: right;\" intermediateChanges=\"true\"></div>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneTimeWrapper\">\n\t\t<div dojoType=\"dijit.form.TimeTextBox\" style=\"width: 100%\" intermediateChanges=\"true\"></div>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneTimeRangeWrapper\">\n\t\t<div dojoType=\"dijit.form.TimeTextBox\" style=\"width:44%; float: left;\" intermediateChanges=\"true\"></div>\n\t\t<div style=\"text-align: center; float: left; width: 10%;\">to</div>\n\t\t<div dojoType=\"dijit.form.TimeTextBox\" style=\"width:44%; float: right;\" intermediateChanges=\"true\"></div>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneRadioWrapper\">\n\t\t<span style=\"width:49%; float:left;\">\n\t\t\t<div dojoType=\"dijit.form.RadioButton\" checked=\"true\"></div><label for=\"\">True</label>\n\t\t</span>\n\t\t<span style=\"width:49%; float: right;\">\n\t\t\t<div dojoType=\"dijit.form.RadioButton\"></div><label for=\"\">False</label>\n\t\t</span>\n\t</li>\n\t\n\t<li class=\"dojoxGridxFilterPaneFieldWrapper dojoxGridxFilterPaneSelectWrapper\">\n\t\t<div dojoType=\"dijit.form.Select\" style=\"width: 100%\"></div>\n\t</li>\n</ul>\n"}});define("gridx/modules/filter/FilterPane",["dojo/_base/kernel","dijit","dojo/text!../../templates/FilterPane.html","dijit/layout/ContentPane","dojo/data/ItemFileReadStore","dijit/form/Select","dijit/form/TextBox","dijit/form/DateTextBox","dijit/form/TimeTextBox","dijit/form/RadioButton","dijit/form/NumberTextBox","dijit/form/ComboBox","dojox/html/ellipsis","dojo/store/util/QueryResults","./DistinctComboBoxMenu","./Filter","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/html","dojo/query"],function(_1,_2,_3){return _1.declare("gridx.modules.filter.FilterPane",[_2.layout.ContentPane],{content:_3,sltColumn:null,sltCondition:null,grid:null,title:"Rule",postCreate:function(){this.inherited(arguments);this._initFields();this._initSltCol();this.connect(this.sltColumn,"onChange","_onColumnChange");this.connect(this.sltCondition,"onChange","_onConditionChange");},getData:function(){var _4=this._getValue(),_5=this.sltCondition.get("value");if(_4&&(_5!=="range"||(_4.start&&_4.end))){return {colId:this.sltColumn.get("value"),condition:_5,value:_4,type:this._getType()};}else{return null;}},setData:function(_6){if(_6===null){return;}this.sltColumn.set("value",_6.colId,null);this._onColumnChange();this.sltCondition.set("value",_6.condition,null);this._onConditionChange();this._setValue(_6.value);},close:function(){var ac=this._getContainer();if(ac.getChildren().length===4){ac._contentBox.w+=dojox.html.metrics.getScrollbar().w;}if(this===ac.selectedChildWidget){var i=_1.indexOf(ac.getChildren(),this);if(i>0){ac.selectChild(ac.getChildren()[i-1]);}}ac.removeChild(this);_1.toggleClass(ac.domNode,"dojoxGridxFilterSingleRule",ac.getChildren().length===1);this.grid.filterBar._filterDialog._updateAccordionContainerHeight();},onChange:function(){},_getContainer:function(){return _2.byNode(this.domNode.parentNode.parentNode.parentNode);},_initFields:function(){this.sltColumn=_2.byNode(_1.query("li>table",this.domNode)[0]);this.sltCondition=_2.byNode(_1.query("li>table",this.domNode)[1]);var _7=this._fields=[this.tbSingle=_2.byNode(_1.query(".dojoxGridxFilterPaneTextWrapper > .dijitTextBox",this.domNode)[0]),this.tbNumber=_2.byNode(_1.query(".dojoxGridxFilterPaneNumberWrapper > .dijitTextBox",this.domNode)[0]),this.comboText=_2.byNode(_1.query(".dojoxGridxFilterPaneComboWrapper > .dijitComboBox",this.domNode)[0]),this.sltSingle=_2.byNode(_1.query(".dojoxGridxFilterPaneSelectWrapper > .dijitSelect",this.domNode)[0]),this.dtbSingle=_2.byNode(_1.query(".dojoxGridxFilterPaneDateWrapper > .dijitDateTextBox",this.domNode)[0]),this.dtbStart=_2.byNode(_1.query(".dojoxGridxFilterPaneDateRangeWrapper > .dijitDateTextBox",this.domNode)[0]),this.dtbEnd=_2.byNode(_1.query(".dojoxGridxFilterPaneDateRangeWrapper > .dijitDateTextBox",this.domNode)[1]),this.ttbStart=_2.byNode(_1.query(".dojoxGridxFilterPaneTimeRangeWrapper > .dijitTimeTextBox",this.domNode)[0]),this.ttbEnd=_2.byNode(_1.query(".dojoxGridxFilterPaneTimeRangeWrapper > .dijitTimeTextBox",this.domNode)[1]),this.rbTrue=_2.byNode(_1.query(".dojoxGridxFilterPaneRadioWrapper .dijitRadio",this.domNode)[0]),this.rbFalse=_2.byNode(_1.query(".dojoxGridxFilterPaneRadioWrapper .dijitRadio",this.domNode)[1])];this.rbTrue.domNode.nextSibling.htmlFor=this.rbTrue.id;this.rbFalse.domNode.nextSibling.htmlFor=this.rbFalse.id;var _8="rb_name_"+Math.random();this.rbTrue.set("name",_8);this.rbFalse.set("name",_8);_1.forEach(_7,function(_9){this.connect(_9,"onChange","_onValueChange");},this);},_initSltCol:function(){var _a=[{label:"Any Column",value:""}],fb=this.grid.filterBar,_b=this.sltColumn;_1.forEach(this.grid.columns(),function(_c){if(!_c.isFilterable()){return;}_a.push({value:_c.id,label:_c.name()});},this);_b.addOption(_a);},_initCloseButton:function(){var _d=this._buttonWidget;var _e=_1.create("span",{className:"dojoxGridxFilterPaneCloseButton",innerHTML:"<img src=\""+this._blankGif+"\"/>",title:"Close"},_d.domNode,"first");this.connect(_e,"onclick","close");_1.addClass(_d.titleTextNode,"dojoxEllipsis");},_onColumnChange:function(){var _f=this.grid.filterBar._getConditionOptions(this.sltColumn.get("value"));var slt=this.sltCondition;if(slt.options&&slt.options.length){slt.removeOption(slt.options);}slt.addOption(_1.clone(_f));this._updateTitle();this.onChange();},_onConditionChange:function(){this._updateValueField();this._updateTitle();this.onChange();},_onValueChange:function(){this._updateTitle();this.onChange();},_getDataType:function(){var _10=this.sltColumn.get("value");var _11="string";if(_10!==""){_11=this.grid.column(_10).dataType();}return _11;},_getType:function(){var _12={"string":"Text",number:"Number",date:"Date",time:"Time","boolean":"Radio"};var _13=_12[this._getDataType()];if("range"===this.sltCondition.get("value")){_13+="Range";}return _13;},_updateTitle:function(){if(!this._buttonWidget){return;}var _14,_15=this._getValue(),_16=this._getType(),_17=this.sltCondition.get("value"),_18=this._buttonWidget.titleTextNode;if(_15&&(_17!=="range"||(_15.start&&_15.end))){_14=this.sltColumn.get("displayedValue")+" "+this.grid.filterBar._getRuleString(_17,_15,_16);}else{_14="Rule "+(_1.indexOf(this._getContainer().getChildren(),this)+1);}_18.innerHTML=_14;_18.title=_14.replace(/<\/?span[^>]*>/g,"").replace("&nbsp;"," ");},_needComboBox:function(){var _19=this.sltColumn.get("value");return this._getType()==="Text"&&!!_19&&this.grid._columnsById[_19].field;},_updateValueField:function(){var _1a=this._getType(),_1b=this.sltColumn.get("value");var _1c=this._needComboBox();_1.forEach(["Text","Combo","Date","Number","DateRange","Time","TimeRange","Select","Radio"],function(k){_1.removeClass(this.domNode,"dojoxGridxFilterPane"+k);},this);_1.addClass(this.domNode,"dojoxGridxFilterPane"+(_1c?"Combo":_1a));var _1d=this.sltCondition.get("value")==="isEmpty";_1.forEach(this._fields,function(f){f.set("disabled",_1d);});if(_1c){if(!this._dummyCombo){this._dummyCombo=new _2.form.ComboBox({store:this.grid.store});}var col=this.grid._columnsById[_1b];_1.mixin(this.comboText,{store:this.grid.store,searchAttr:col.field,fetchProperties:{sort:[{attribute:col.field,descending:false}]}});}},_getValue:function(){var _1e=this._getType(),_1f=this._needComboBox();switch(_1e){case "Text":return (_1f?this.comboText:this.tbSingle).get("value")||null;case "Number":return this.tbNumber.get("value")||null;case "Select":return this.sltSingle.get("value")||null;case "Date":return this.dtbSingle.get("value")||null;case "DateRange":return {start:this.dtbStart.get("value"),end:this.dtbEnd.get("value")};case "Time":return this.dtbSingle.get("value")||null;case "TimeRange":return {start:this.ttbStart.get("value"),end:this.ttbEnd.get("value")};case "Radio":return !!this.rbTrue.get("checked");default:return null;}},_setValue:function(_20){if(!_20){return;}var _21=this._getType(),_22=this._needComboBox();switch(_21){case "Text":(_22?this.comboText:this.tbSingle).set("value",_20);break;case "Number":this.tbNumber.set("value",_20);break;case "Select":this.sltSingle.set("value",_20);break;case "Date":this.dtbSingle.set("value",_20);break;case "DateRange":this.dtbStart.set("value",_20.start);this.dtbEnd.set("value",_20.end);break;case "Time":this.dtbSingle.set("value",_20);break;case "TimeRange":this.ttbStart.set("value",_20.start);this.ttbEnd.set("value",_20.end);break;case "Radio":this.rbTrue.set("checked",true);break;}},uninitialize:function(){if(this._dummyCombo){this._dummyCombo.destroyRecursive();}}});});
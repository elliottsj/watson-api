//>>built
require({cache:{"url:idx/form/templates/DropDownBox.html":"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\"\r\n\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint='_aroundNode,stateNode,oneuiBaseNode'\r\n\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"/\r\n\t></div\r\n\t></div\r\n\t><div class='dijitReset dijitInline oneuiIcon'\r\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\" ${_buttonInputDisabled}/\r\n\t></div\r\n\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class=\"dijitValidationIcon\"><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t></div></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>"}});define("idx/form/_DateTimeTextBox",["dojo/_base/declare","dojo/_base/lang","dojo/i18n","dojo/date","dojo/date/locale","dojo/date/stamp","dijit/_base/wai","dijit/form/RangeBoundTextBox","dijit/form/ValidationTextBox","dijit/_HasDropDown","./TextBox","dojo/text!./templates/DropDownBox.html","dojo/i18n!./nls/_DateTimeTextBox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){new Date("X");return _1("idx.form._DateTimeTextBox",[_8,_a],{templateString:_c,hasDownArrow:false,openOnClick:true,regExpGen:_5.regexp,datePackage:"dojo.date",compare:function(_d,_e){var _f=this._isInvalidDate(_d);var _10=this._isInvalidDate(_e);return _f?(_10?0:-1):(_10?1:_4.compare(_d,_e,this._selector));},forceWidth:true,format:function(_11,_12){return _11?this.dateLocaleModule.format(_11,_12):"";},"parse":function(_13,_14){return this.dateLocaleModule.parse(_13,_14)||(this._isEmpty(_13)?null:undefined);},serialize:function(val,_15){if(val.toGregorian){val=val.toGregorian();}return _6.toISOString(val,_15);},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(_16){var _17=_16.datePackage?_16.datePackage+".Date":"Date";this.dateClassObj=_2.getObject(_17,false);this.value=new this.dateClassObj("");this.datePackage=_16.datePackage||this.datePackage;this.dateLocaleModule=_2.getObject(this.datePackage+".locale",false);this.regExpGen=this.dateLocaleModule.regexp;this._invalidDate=idx.form._DateTimeTextBox.prototype.value.toString();},postMixInProperties:function(){this._nlsResources=_3.getLocalization("idx.form","_DateTimeTextBox",this.lang);this.inherited(arguments);},buildRendering:function(){this.inherited(arguments);if(!this.hasDownArrow){this._buttonNode.style.display="none";}if(this.openOnClick||!this.hasDownArrow){this._buttonNode=this.oneuiBaseNode;this.oneuiBaseClass+=" dijitComboBoxOpenOnClick";}},_setConstraintsAttr:function(_18){_18.selector=this._selector;_18.fullYear=true;var _19=_6.fromISOString;if(typeof _18.min=="string"){_18.min=_19(_18.min);}if(typeof _18.max=="string"){_18.max=_19(_18.max);}this.inherited(arguments,[_18]);},_isInvalidDate:function(_1a){return !_1a||isNaN(_1a)||typeof _1a!="object"||_1a.toString()==this._invalidDate;},_isEmpty:function(_1b){return (this.trim?/^\s*$/:/^$/).test(_1b)||(_1b&&_1b.toString()==this._invalidDate);},_setValueAttr:function(_1c,_1d,_1e){if(_1c!==undefined){if(typeof _1c=="string"){_1c=_6.fromISOString(_1c);}if(this._isInvalidDate(_1c)){_1c=null;}if(_1c instanceof Date&&!(this.dateClassObj instanceof Date)){_1c=new this.dateClassObj(_1c);}}this.inherited(arguments,[_1c,_1d,_1e]);if(this.dropDown){this.dropDown.set("value",_1c,false);}},_set:function(_1f,_20){if(_1f=="value"&&this.value instanceof Date&&this.compare(_20,this.value)==0){return;}this.inherited(arguments);},_setDropDownDefaultValueAttr:function(val){this.dropDownDefaultvalue=this._isInvalidDate(val)?new this.dateClassObj():val;},openDropDown:function(_21){if(this.dropDown){this.dropDown.destroy();}var _22=_2.getObject(this.popupClass,false),_23=this,_24=this.get("value");this.dropDown=new _22({autoFocus:false,onChange:function(_25){idx.form._DateTimeTextBox.superclass._setValueAttr.call(_23,_25,true);},id:this.id+"_popup",dir:_23.dir,lang:_23.lang,value:_24,currentFocus:!this._isInvalidDate(_24)?_24:this.dropDownDefaultValue,constraints:_23.constraints,filterString:_23.filterString,datePackage:_23.datePackage,isDisabledDate:function(_26){return !_23.rangeCheck(_26,_23.constraints);}});this.inherited(arguments);},_getDisplayedValueAttr:function(){return this.textbox.value;},_setDisplayedValueAttr:function(_27,_28){this._setValueAttr(this.parse(_27,this.constraints),_28,_27);},_onDropDownMouseUp:function(){this.inherited(arguments);if((!this.dropDown.focus)||(!this.dropDown.autoFocus)){setTimeout(_2.hitch(this,"focus"),0);}}});});
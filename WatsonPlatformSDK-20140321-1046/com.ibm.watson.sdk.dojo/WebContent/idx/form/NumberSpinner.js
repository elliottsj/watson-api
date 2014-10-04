//>>built
require({cache:{"url:idx/form/templates/Spinner.html":"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"  dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\r\n\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"presentation\" dojoAttachPoint='stateNode,oneuiBaseNode'\r\n\t\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\" dojoAttachPoint=\"upArrowNode\"\r\n\t\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\t${_buttonInputDisabled} /\r\n\t\t\t\t></div\r\n\t\t\t></div\r\n\t\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\" dojoAttachPoint=\"downArrowNode\" \r\n\t\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\" ${_buttonInputDisabled}/\r\n\t\t\t\t></div\r\n\t\t\t></div\r\n\t\t></div\r\n\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputNode\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n\t\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\" role=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\t/\r\n\t\t></div\r\n\t></div\r\n\t><div id=\"${id}_unit\" class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class='dijitValidationIcon'><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t></div></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>\r\n"}});define("idx/form/NumberSpinner",["dojo/_base/declare","dojo/_base/lang","dojo/_base/event","dojo/dom-style","dojo/dom-class","dojo/keys","dijit/_base/wai","idx/widget/HoverHelpTooltip","dijit/form/_Spinner","dijit/form/NumberTextBox","./_CssStateMixin","./_CompositeMixin","./TextBox","dojo/text!./templates/Spinner.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){var _f=_2.getObject("idx.oneui.form",true);return _f.NumberSpinner=_1("idx.form.NumberSpinner",[_9,_a.Mixin,_c,_b],{instantValidate:false,templateString:_e,baseClass:"oneuiNumberSpinnerWrap",oneuiBaseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"inputNode":"dijitInputContainer","upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},postCreate:function(){this.inherited(arguments);if(this.instantValidate){this.connect(this,"_onFocus",function(){if(this._hasBeenBlurred&&(!this._refocusing)){this.validate(true);}});this.connect(this,"_onInput",function(){this.validate(true);});this._getPatternAttr(this.constraints);}else{this.connect(this,"_onFocus",function(){if(this.message&&this._hasBeenBlurred&&(!this._refocusing)){this.displayMessage(this.message);}});}this._resize();},refocus:function(){this._refocusing=true;this.focus();this._refocusing=false;},adjust:function(val,_10){var tc=this.constraints,v=isNaN(val),_11=!isNaN(tc.max),_12=!isNaN(tc.min);if(v&&_10!=0){val=(_10>0)?_12?tc.min:_11?tc.max:0:_11?this.constraints.max:_12?tc.min:0;}var _13=val+_10;if(v||isNaN(_13)){return val;}if(_11&&(_13>tc.max)){_13=tc.max;}if(_12&&(_13<tc.min)){_13=tc.min;}return _13;},_setUnitAttr:function(){this.inherited(arguments);_7.setWaiState(this.upArrowNode,"describedby",this.id+"_unit");_7.setWaiState(this.downArrowNode,"describedby",this.id+"_unit");},displayMessage:function(_14,_15){if(_14){if(!this.messageTooltip){this.messageTooltip=new _8({connectId:[this.iconNode],label:_14,position:this.tooltipPosition,forceFocus:false});}else{this.messageTooltip.set("label",_14);}if(this.focused||_15){var _16=_4.get(this.iconNode,"visibility")=="hidden"?this.oneuiBaseNode:this.iconNode;this.messageTooltip.open(_16);}}else{this.messageTooltip&&this.messageTooltip.close();}},_isEmpty:function(){var v=this.get("value");return (v!==undefined)&&isNaN(v);},_onKeyPress:function(e){if((e.charOrCode==_6.HOME||e.charOrCode==_6.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){var _17=this.constraints[(e.charOrCode==_6.HOME?"min":"max")];if(typeof _17=="number"){this._setValueAttr(_17,false);}_3.stop(e);}},_onInputContainerEnter:function(){_5.toggle(this.oneuiBaseNode,"dijitSpinnerInputContainerHover",true);},_onInputContainerLeave:function(){_5.toggle(this.oneuiBaseNode,"dijitSpinnerInputContainerHover",false);}});});
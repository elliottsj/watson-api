//>>built
require({cache:{"url:idx/form/templates/CheckBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\"\r\n\t><div class=\"dijit dijitReset dijitInline\" role=\"presentation\" dojoAttachPoint=\"stateNode,oneuiBaseNode\"\r\n\t\t><input\r\n\t\t\t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\r\n\t\t\tclass=\"dijitReset dijitCheckBoxInput\"\r\n\t\t\tdojoAttachPoint=\"focusNode\"\r\n\t\t\trole=\"checkbox\"\r\n\t\t\taria-checked=\"false\"\r\n\t\t\tdojoAttachEvent=\"onclick:_onClick\"\r\n\t/></div\r\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"\r\n\t\t><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label\r\n\t></div\r\n\t><div class='dijitReset dijitInline dijitValidationContainer' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class=\"dijitValidationIcon\"><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t></div></div\r\n></div>"}});define("idx/form/CheckBox",["dojo/_base/declare","dojo/_base/lang","dijit/form/CheckBox","./_CssStateMixin","./_CompositeMixin","./_ValidationMixin","dojo/text!./templates/CheckBox.html"],function(_1,_2,_3,_4,_5,_6,_7){var _8=_2.getObject("idx.oneui.form",true);return _8.CheckBox=_1("idx.form.CheckBox",[_3,_4,_5,_6],{instantValidate:true,baseClass:"idxCheckBoxWrap",oneuiBaseClass:"dijitCheckBox",labelAlignment:"horizontal",templateString:_7,postCreate:function(){this._event={"input":"onChange","blur":"_onBlur","focus":"_onFocus"};this.inherited(arguments);},_isEmpty:function(){return !this.get("checked");},_onBlur:function(_9){this.mouseFocus=false;this.inherited(arguments);},_setDisabledAttr:function(){this.inherited(arguments);this._refreshState();},_setLabelAlignmentAttr:null,_setFieldWidthAttr:null,_setLabelWidthAttr:null});});
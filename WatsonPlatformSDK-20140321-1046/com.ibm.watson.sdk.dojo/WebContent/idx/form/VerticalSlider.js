//>>built
require({cache:{"url:idx/form/templates/VerticalSlider.html":"<div id=\"widget_${id}\" class=\"idxComposite dijitReset dijitLeft dijitInline\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"><label id=\"${id}_label\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\"\r\n\t><table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachPoint='stateNode,oneuiBaseNode' dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\r\n\trole=\"presentation\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t\t><td class='dijitReset'></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td dojoAttachPoint=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\r\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"><!--#5629--></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"\r\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\r\n\t\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t></table\r\n\t><div class='dijitValidationContainer' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div>\r\n\t</div\r\n\t></div\r\n></div>"}});define("idx/form/VerticalSlider",["dojo/_base/declare","dojo/_base/lang","dojo/dom-style","dijit/_base/wai","dijit/form/VerticalSlider","./_CssStateMixin","./_ValidationMixin","./_CompositeMixin","dojo/text!./templates/VerticalSlider.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){var _a=_2.getObject("idx.oneui.form",true);return _a.VerticalSlider=_1("idx.form.VerticalSlider",[_5,_7,_8,_6],{templateString:_9,instantValidate:true,oneuiBaseClass:"dijitSlider",baseClass:"idxSliderWrapV",cssStateNodes:{incrementButton:"dijitSliderIncrementButton",decrementButton:"dijitSliderDecrementButton",focusNode:"dijitSliderThumb"},postCreate:function(){this._event={"input":"_setValueAttr","blur":"_onBlur","focus":"_onFocus"};this.inherited(arguments);this._resize();},startup:function(){this.inherited(arguments);setTimeout(_2.hitch(this,function(){var _b=_3.get(this.domNode,"height");_3.set(this.oneuiBaseNode,"height",_b+"px");}));},_setLabelAttr:function(_c){this.inherited(arguments);_4.setWaiState(this.focusNode,"labelledby",this.id+"_label");},_setFieldWidthAttr:null});});
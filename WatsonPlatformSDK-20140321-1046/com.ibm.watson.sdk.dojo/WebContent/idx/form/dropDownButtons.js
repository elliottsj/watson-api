//>>built
define("idx/form/dropDownButtons",["dojo/_base/lang","idx/main","dojo/dom-class","dijit/form/DropDownButton"],function(_1,_2,_3,_4){var _5=_1.getObject("form.dropDownButtons",true,_2);var _6=_4.prototype;var _7=_6.openDropDown;var _8=_6.closeDropDown;if(_7){_6.openDropDown=function(){var _9=_7.apply(this,arguments);if(this._opened){_3.add(this.domNode,"idxDropDownOpen");}return _9;};}if(_8){_6.closeDropDown=function(_a){var _b=_8.apply(this,arguments);_3.remove(this.domNode,"idxDropDownOpen");return _b;};}return _5;});
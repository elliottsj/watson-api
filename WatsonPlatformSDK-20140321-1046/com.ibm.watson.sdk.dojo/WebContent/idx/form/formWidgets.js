//>>built
define("idx/form/formWidgets",["dojo/_base/lang","idx/main","dojo/dom-attr","dijit/form/_FormWidget","../string"],function(_1,_2,_3,_4,_5){var _6=_1.getObject("form.formWidgets",_2);dojo.extend(_4,{accessKey:"",_setAccessKeyAttr:function(_7){this.accessKey=_7;if(_5.nullTrim(_7)){if((this.focusNode)&&(this.focusNode.tagName=="INPUT")){_3.set(this.focusNode,"accessKey",_7);}}}});return _6;});
//>>built
define("idx/form/_RadioButtonSetItem",["dojo/_base/declare","dojo/_base/array","dojo/dom-attr","dojo/dom-construct","dijit/_Widget","dijit/_CssStateMixin","dijit/_TemplatedMixin","idx/form/_InputListItemMixin","dijit/form/RadioButton"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _1("idx.form._RadioButtonSetItem",[_5,_6,_7,_8],{templateString:"<div class='dijitReset ${baseClass}'><label for='${_inputId}' dojoAttachPoint='labelNode'></label></div>",baseClass:"idxRadioButtonSetItem",postMixInProperties:function(){this.focusNode=new _9({id:this._inputId,name:this.name});this.inherited(arguments);},postCreate:function(){_4.place(this.focusNode.domNode,this.domNode,"first");this.inherited(arguments);},_changeBox:function(){if(this.get("disabled")||this.get("readOnly")){return;}_2.forEach(this.parent.options,function(_a){_a.selected=false;});this.option.selected=true;this.parent.set("value",this.parent._getValueFromOpts());this.parent.focusChild(this);}});});
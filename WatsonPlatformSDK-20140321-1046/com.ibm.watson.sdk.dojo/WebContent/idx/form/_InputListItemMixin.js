//>>built
define("idx/form/_InputListItemMixin",["dojo/_base/declare","dojo/_base/lang"],function(_1,_2){return _1("idx.form._InputListItemMixin",null,{widgetsInTemplate:true,option:null,parent:null,disabled:false,readOnly:false,postCreate:function(){this.inherited(arguments);this.focusNode.onClick=_2.hitch(this,"_changeBox");this.labelNode.innerHTML=this.option.label;this._updateBox();},_updateBox:function(){this.focusNode.set("checked",!!this.option.selected);},_setDisabledAttr:function(_3){this.disabled=_3;this.focusNode.set("disabled",this.disabled);},_setReadOnlyAttr:function(_4){this.readOnly=_4;this.focusNode.set("readOnly",_4);},focus:function(){this.focusNode.focus();}});});
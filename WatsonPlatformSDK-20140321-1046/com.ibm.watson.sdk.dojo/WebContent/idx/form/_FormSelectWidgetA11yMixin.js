//>>built
define("idx/form/_FormSelectWidgetA11yMixin",["dojo/_base/array","dojo/_base/declare"],function(_1,_2){return _2("idx.form._FormSelectWidgetA11yMixin",[],{_updateSelection:function(){this.inherited(arguments);_1.forEach(this._getChildren(),function(_3){_3.domNode.removeAttribute("aria-selected");},this);}});});
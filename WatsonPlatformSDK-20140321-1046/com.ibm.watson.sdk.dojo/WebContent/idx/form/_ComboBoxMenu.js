//>>built
define("idx/form/_ComboBoxMenu",["dojo/_base/declare","dojo/_base/event","dojo/dom-class","dojo/query","dijit/form/_ComboBoxMenu"],function(_1,_2,_3,_4,_5){return _1("idx.form._ComboBoxMenu",[_5],{_onMouseUp:function(_6){if(!this.readOnly){this.inherited(arguments);}},_onMouseDown:function(_7,_8){_2.stop(_7);if(this._hoveredNode){this.onUnhover(this._hoveredNode);this._hoveredNode=null;}this._isDragging=true;var _9=_8;this._setSelectedAttr(_9);if(_9&&_9.parentNode==this.containerNode){this.onMouseDown(_9);}},onMouseDown:function(_a){_3.add(_a,"dijitMenuItemActive");},onUnMouseDown:function(_b){_4(".dijitMenuItemActive",this.domNode).removeClass("dijitMenuItemActive");}});});
//>>built
define("idx/bus/_BusMixin",["dojo/_base/declare"],function(_1){return _1("idx.bus._BusMixin",[],{constructor:function(){},postCreate:function(){var _2=this.get("id");this._busTopic="idx.widget."+_2;},_idx_getBusTopic:function(){return this._busTopic;}});});
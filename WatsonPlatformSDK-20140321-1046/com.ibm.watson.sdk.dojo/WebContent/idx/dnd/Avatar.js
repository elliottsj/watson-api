//>>built
define("idx/dnd/Avatar",["dojo/main","dojo/dnd/common","dojo/string","dojo/i18n!./nls/Avatar"],function(_1,_2,_3,_4){_1.declare("idx.dnd.Avatar",null,{constructor:function(_5){this.manager=_5;this.construct();},construct:function(){var a=_1.create("div",{"class":"idxDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_6=this.manager.source,_7,_8=_1.create("div",{"class":"dropIndicator dijitInline"},a),_9=_1.create("div",{"class":"idxDndAvatarBody dijitInline",style:{opacity:0.9}},a),_a=this._generateText(),_b=(this.manager.copy?(_a===1?_4.copyOneText:_3.substitute(_4.copyText,{num:"<span class=\"itemNumber\">"+_a+"</span>"})):(_a===1?_4.moveOneText:_3.substitute(_4.moveText,{num:"<span class=\"itemNumber\">"+_a+"</span>"}))),_c=_1.create("span",{"class":"dndType",innerHTML:_b},_9);this.node=a;},destroy:function(){_1.destroy(this.node);this.node=false;},update:function(){_1[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"idxDndAvatarCanDrop");_1.query(("idxDndAvatarBody itemNumber"),this.node).forEach(function(_d){_d.innerHTML=this._generateText();},this);},_generateText:function(){var _e=0;_1.forEach(this.manager.nodes,function(_f){_e+=_1.query(".dijitLeaf",_f).length;});return _e;}});return idx.dnd.Avatar;});
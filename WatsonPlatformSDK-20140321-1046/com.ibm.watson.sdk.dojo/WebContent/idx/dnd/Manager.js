//>>built
define("idx/dnd/Manager",["dojo/main","dojo/dnd/Manager","./Avatar"],function(_1,_2,_3){var _4=_1.declare("idx.dnd.Manager",[_2],{makeAvatar:function(){return new _3(this);}});idx.dnd._manager=null;_4.manager=idx.dnd.manager=function(){if(!idx.dnd._manager){idx.dnd._manager=new idx.dnd.Manager();}return idx.dnd._manager;};return _4;});
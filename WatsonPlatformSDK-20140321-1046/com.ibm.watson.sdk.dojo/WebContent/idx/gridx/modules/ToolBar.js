//>>built
define("idx/gridx/modules/ToolBar",["dojo/_base/declare","dojo/_base/lang","dijit/Toolbar","../core/_Module","./Bar"],function(_1,_2,_3,_4){return _1(_4,{name:"toolBar",required:["bar"],constructor:function(_5,_6){this._def=_2.mixin(_6,{bar:"top",row:0,col:0,pluginClass:_3,className:"gridxBarToolBar"});},getAPIPath:function(){return {toolBar:this};},preload:function(){this.grid.bar.defs.push(this._def);},load:function(){var t=this,_7=t.grid.bar;_7.loaded.then(function(){t.widget=_7.plugins.top[0][0];t.domNode=t.widget.domNode;t.loaded.callback();});}});});
//>>built
define("gridx/tests/support/stores/ut_tree_columnar",["dojo","dojo/data/ItemFileWriteStore","../../core/model/AsyncTreeCache","../../core/Core","../../modules/Tree"],function(_1,_2,_3,_4,_5){var _6=9973;var _7=function(_8){var a=8887;var c=9643;var m=8677;_6=(a*_6+c)%m;var _9=Math.floor(_6/m*_8);return _9;};var _a="0,1,2,3, ,4,5,6,7, ,8,9,a,b, ,c,d,e,f, ,g,h,i,j, ,k,l,m,n, ,k,o,p,q, ,r,s,t,u, ,v,w,x,y, ,z".split(",");var _b=function(){var _c=_7(50),i,_d=[];for(i=0;i<_c;++i){_d.push(_a[_7(_a.length)]);}return _d.join("");};var _e=function(){return new Date(_7(10000000000000));};var _f=function(_10,_11){return {id:_10+"-"+(_11+1),number:_7(10000),string:_b(),date:_e().toDateString(),time:_e().toTimeString().split(" ")[0],bool:_7(10)<5};};var _12=function(_13,_14,_15,_16){var i,_17,res=[];var _18=_7(_16);for(i=0;i<_18;++i){_17=_f(_13,i);res.push(_17);if(_14<_15){_17.children=_12(_17.id,_14+1,_15,_16);}}return res;};var _19=function(_1a){var i,res={range:[],id:[]},_1b=function(a){return typeof a==="number"&&a>=0;},_1c=function(a){return a&&typeof a.start==="number"&&a.start>=0;},f=function(a){if(_1c(a)){res.range.push(a);}else{if(_1b(a)){res.range.push({start:a,count:1});}else{if(_1.isArrayLike(a)){for(i=a.length-1;i>=0;--i){if(_1b(a[i])){res.range.push({start:a[i],count:1});}else{if(_1c(a[i])){res.range.push(a[i]);}else{if(_1.isString(a)){res.id.push(a[i]);}}}}}else{if(_1.isString(a)){res.id.push(a);}}}}};if(_1a&&(_1a.index||_1a.range||_1a.id)){f(_1a.index);f(_1a.range);if(_1.isArrayLike(_1a.id)){for(i=_1a.id.length-1;i>=0;--i){res.id.push(_1a.id[i]);}}else{if(_1a.id!==undefined){res.id.push(_1a.id);}}}else{f(_1a);}if(!res.range.length&&!res.id.length&&this.size()<0){res.range.push({start:0,count:1});}return res;};var _1d=new _2({data:{identifier:"id",label:"id",items:_12("item",1,3,10)}});var _1e=[{id:"id",field:"id",expandField:"children"},{id:"number",field:"number"}];var _1f=function(){var _20=new _4();_20.reset({store:_1d,structure:_1e,cacheClass:_3,cacheSize:1,pageSize:1,modules:[_5]});_20._loadModules(new _1.Deferred());return _20;};var _21=function(_22,_23){_1.forEach(_22,function(_24){var s=[];for(var i=0;i<_23;++i){s.push("  ");}s.push(_1d.getValue(_24,"id"));if(_24.children){_21(_24.children,_23+1);}});};_1d.fetch({start:0,onComplete:function(_25){_21(_25,0);}});var v=function(t,_26,_27,_28,idx){var _29=_26.tree.getRowInfoByVisualIndex(_27,0);t.is(_28,_29.parentId);t.is(idx,_29.start);t.is(1,_29.count);};var _2a=function(_2b,_2c,_2d,_2e){return function(t){var d=new doh.Deferred();var _2f=_1f();var i,f=_1.partial(v,t,_2f);var _30=function(id){if(id[0]==="-"){return _2f.tree.collapse(id.substring(1));}else{return _2f.tree.expand(id);}};(new _1.DeferredList(_1.map(_2b,_30))).then(function(){try{for(i=0;i<_2d.length;++i){f.apply(0,_2d[i]);}(new _1.DeferredList(_1.map(_2c,_30))).then(function(){try{for(i=0;i<_2e.length;++i){f.apply(0,_2e[i]);}d.callback(true);}catch(e){d.errback(e);}});_2f._uninit();}catch(e){d.errback(e);}});return d;};};var _31=[{name:"a",funcs:[{name:"aa",timeout:5000,runTest:_2a([],["item-1"],[[0,"",0],[1,"",1]],[[0,"",0],[1,"item-1",0],[2,"item-1",1],[3,"item-1",2],[4,"item-1",3],[5,"item-1",4],[6,"",1]])},{name:"bb",timeout:5000,runTest:_2a([],["item-1","item-2"],[[0,"",0],[1,"",1],[2,"",2]],[[0,"",0],[1,"item-1",0],[2,"item-1",1],[3,"item-1",2],[4,"item-1",3],[5,"item-1",4],[6,"",1],[7,"item-2",0],[8,"item-2",1],[9,"item-2",2],[10,"item-2",3],[11,"item-2",4],[12,"item-2",5],[13,"item-2",6],[14,"item-2",7],[15,"item-2",8],[16,"",2]])},{name:"cc",timeout:5000,runTest:_2a([],["item-1","item-1-1"],[[0,"",0],[1,"",1],[2,"",2],[3,"",3]],[[0,"",0],[1,"item-1",0],[2,"item-1-1",0],[3,"item-1-1",1],[4,"item-1-1",2],[5,"item-1-1",3],[6,"item-1-1",4],[7,"item-1-1",5],[8,"item-1-1",6],[9,"item-1-1",7],[10,"item-1",1],[11,"item-1",2],[12,"item-1",3],[13,"item-1",4],[14,"",1],[15,"",2],[16,"",3]])},{name:"dd",timeout:5000,runTest:_2a(["item-1","item-1-1"],["-item-1","item-1"],[[0,"",0],[1,"item-1",0],[2,"item-1-1",0],[3,"item-1-1",1],[4,"item-1-1",2],[5,"item-1-1",3],[6,"item-1-1",4],[7,"item-1-1",5],[8,"item-1-1",6],[9,"item-1-1",7],[10,"item-1",1],[11,"item-1",2],[12,"item-1",3],[13,"item-1",4],[14,"",1],[15,"",2],[16,"",3]],[[0,"",0],[1,"item-1",0],[2,"item-1-1",0],[3,"item-1-1",1],[4,"item-1-1",2],[5,"item-1-1",3],[6,"item-1-1",4],[7,"item-1-1",5],[8,"item-1-1",6],[9,"item-1-1",7],[10,"item-1",1],[11,"item-1",2],[12,"item-1",3],[13,"item-1",4],[14,"",1],[15,"",2],[16,"",3]])},{name:"ee",timeout:5000,runTest:_2a(["item-1","item-2","item-3","item-2-2","-item-2"],["item-2"],[[0,"",0],[1,"item-1",0],[2,"item-1",1],[3,"item-1",2],[4,"item-1",3],[5,"item-1",4],[6,"",1],[7,"",2],[8,"item-3",0],[9,"item-3",1],[10,"item-3",2],[11,"item-3",3],[12,"item-3",4],[13,"item-3",5],[14,"item-3",6],[15,"",3]],[[0,"",0],[1,"item-1",0],[2,"item-1",1],[3,"item-1",2],[4,"item-1",3],[5,"item-1",4],[6,"",1],[7,"item-2",0],[8,"item-2",1],[9,"item-2-2",0],[10,"item-2-2",1],[11,"item-2-2",2],[12,"item-2-2",3],[13,"item-2",2],[14,"item-2",3],[15,"item-2",4],[16,"item-2",5],[17,"item-2",6],[18,"item-2",7],[19,"item-2",8],[20,"",2],[21,"item-3",0],[22,"item-3",1],[23,"item-3",2],[24,"item-3",3],[25,"item-3",4],[26,"item-3",5],[27,"item-3",6],[28,"",3]])},{name:"ff",timeout:5000,runTest:_2a(["item-1","item-1","item-1"],["-item-1","-item-1"],[[0,"",0],[1,"item-1",0],[2,"item-1",1],[3,"item-1",2],[4,"item-1",3],[5,"item-1",4],[6,"",1],[7,"",2],[8,"",3]],[[0,"",0],[1,"",1],[2,"",2],[3,"",3]])},{name:"gg",timeout:5000,runTest:_2a(["item-1","item-2","-item-1","item-2-1"],["item-1","item-2","-item-1","item-2-1","-item-2"],[[0,"",0],[1,"",1],[2,"item-2",0],[3,"item-2-1",0],[4,"item-2-1",1],[5,"item-2-1",2],[6,"item-2-1",3],[7,"item-2-1",4],[8,"item-2-1",5],[9,"item-2-1",6],[10,"item-2-1",7],[11,"item-2-1",8],[12,"item-2",1],[13,"item-2",2],[14,"item-2",3],[15,"item-2",4],[16,"item-2",5],[17,"item-2",6],[18,"item-2",7],[19,"item-2",8],[20,"",2],[21,"",3]],[[0,"",0],[1,"",1],[2,"",2],[3,"",3]])},{name:"hh",timeout:5000,runTest:_2a(["item-1","item-1-2"],["item-1-1"],[[0,"",0],[1,"item-1",0],[2,"item-1",1],[3,"item-1-2",0],[4,"item-1-2",1],[5,"item-1-2",2],[6,"item-1-2",3],[7,"item-1-2",4],[8,"item-1-2",5],[9,"item-1-2",6],[10,"item-1-2",7],[11,"item-1",2],[12,"item-1",3],[13,"item-1",4],[14,"",1],[15,"",2],[16,"",3]],[[0,"",0],[1,"item-1",0],[2,"item-1-1",0],[3,"item-1-1",1],[4,"item-1-1",2],[5,"item-1-1",3],[6,"item-1-1",4],[7,"item-1-1",5],[8,"item-1-1",6],[9,"item-1-1",7],[10,"item-1",1],[11,"item-1-2",0],[12,"item-1-2",1],[13,"item-1-2",2],[14,"item-1-2",3],[15,"item-1-2",4],[16,"item-1-2",5],[17,"item-1-2",6],[18,"item-1-2",7],[19,"item-1",2],[20,"item-1",3],[21,"item-1",4],[22,"",1],[23,"",2],[24,"",3]])}]}];var _32=function(ts){doh.register(ts.name,ts.funcs);};_32(_31[0]);});
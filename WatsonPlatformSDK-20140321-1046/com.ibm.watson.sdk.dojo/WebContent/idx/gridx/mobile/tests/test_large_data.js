//>>built
define("idx/gridx/mobile/tests/test_large_data",["dojo/domReady","dojo/store/Memory","dojox/mobile/parser","gridx/mobile/tests/support/data","dojox/mobile/Heading","dojox/mobile/View","dojox/mobile/ScrollableView","dojox/mobile/TabBar","dojox/mobile/compat","gridx/mobile/Grid"],function(_1,_2,_3,_4){function _5(_6,_7){var _8="normal",f=_7.field,_9=100000,_a=-1,_b=[],_c=[];var _d=["Lib1","Lib2","Lib3","Lib4","Lib5","Lib6"];_d.forEach(function(_e){var t=_6[_e].time;if(_9>t){_9=t;_b.length=0;_b.push(_e);}else{if(_9==t){_b.push(_e);}}if(_a<t){_a=t;_c.length=0;_c.push(_e);}else{if(_a==t){_c.push(_e);}}});if(_c.indexOf(f)>=0){_8="slower";}if(_b.indexOf(f)>=0){_8="faster";}return "<span class=\""+_8+"\">"+_6[f].time+" ms | "+_6[f].found+" found</span>";};var _f=[{field:"selector",width:"150px",title:"Selectors",cssClass:"selector"},{field:"Lib1",width:"100px",title:"Lib1",formatter:_5},{field:"Lib2",width:"100px",title:"Lib2",formatter:_5},{field:"Lib3",width:"100px",title:"Lib3",formatter:_5},{field:"Lib4",width:"100px",title:"Lib4",formatter:_5},{field:"Lib5",width:"100px",title:"Lib5",formatter:_5},{field:"Lib6",width:"100px",title:"Lib6",formatter:_5}];_1(function(){_3.parse();grid.columns=_f;grid.setStore(new _2({data:_4.large}));});});
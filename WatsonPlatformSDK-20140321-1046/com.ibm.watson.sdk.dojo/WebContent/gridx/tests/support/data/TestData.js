//>>built
define("gridx/tests/support/data/TestData",[],function(){var _1=9973;var _2=function(_3){var a=8887;var c=9643;var m=8677;_1=(a*_1+c)%m;var _4=Math.floor(_1/m*_3);return _4;};var _5="0,1,2,3, ,4,5,6,7, ,8,9,a,b, ,c,d,e,f, ,g,h,i,j, ,k,l,m,n, ,k,o,p,q, ,r,s,t,u, ,v,w,x,y, ,z".split(",");var _6=function(){var _7=_2(50),i,_8=[];for(i=0;i<_7;++i){_8.push(_5[_2(_5.length)]);}return _8.join("");};var _9=function(){return new Date(_2(10000000000000));};var _a=function(_b){return {id:_b+1,number:_2(10000),string:_6(),date:_9().toDateString(),time:_9().toTimeString().split(" ")[0],bool:_2(10)<5};};return {getData:function(_c){_c=_c||100;var _d={identifier:"id",label:"id",items:[]};for(var i=0;i<_c;++i){_d.items.push(_a(i));}return _d;},layouts:[[{id:"id",field:"id",name:"Identity"},{id:"number",field:"number",name:"Number"}],[{id:"id",field:"id",name:"Identity"},{id:"number",field:"number",name:"Number"},{id:"string",field:"string",name:"String"}],[{id:"id",field:"id",name:"Identity"},{id:"number",field:"number",name:"Number"},{id:"string",field:"string",name:"String"},{id:"date",field:"date",name:"Date"},{id:"time",field:"time",name:"Time"},{id:"bool",field:"bool",name:"Boolean"}],[{id:"id",field:"id",name:"Identity",dataType:"number"},{id:"number",field:"number",name:"Number",dataType:"number"},{id:"string",field:"string",name:"String",dataType:"string"},{id:"date",field:"date",name:"Date",dataType:"date"},{id:"time",field:"time",name:"Time",dataType:"time"},{id:"bool",field:"bool",name:"Boolean",dataType:"boolean"}],[{id:"number",field:"number",name:"Number"},{id:"string",field:"string",name:"String"},{id:"date",field:"date",name:"Date"},{id:"time",field:"time",name:"Time"},{id:"bool",field:"bool",name:"Boolean"}]]};});
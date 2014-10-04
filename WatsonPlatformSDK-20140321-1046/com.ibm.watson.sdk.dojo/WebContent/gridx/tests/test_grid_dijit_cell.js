//>>built
require(["dojo/date/locale","dijit/form/DateTextBox","dijit/form/TimeTextBox","dijit/form/NumberTextBox","gridx/Grid","gridx/core/model/AsyncCache","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){var _b=function(){return ["<div dojoType='dijit.form.DateTextBox' class='dojoxGridxHasGridCellValue'></div>",].join("");};var _c=function(){return ["<div dojoType='dijit.form.TimeTextBox' class='dojoxGridxHasGridCellValue'></div>",].join("");};var _d=function(_e,_f,_10){var t=_1.parse(_f,{selector:"time",timePattern:"HH:mm:ss"});_10.timeBox.set("value",t);};var _11=function(d){res=_1.format(d,{selector:"date",datePattern:"yyyy/M/d"});return res;};var _12=function(d){res=_1.format(d,{selector:"time",timePattern:"hh:mm:ss"});return res;};var _13=[{field:"id",name:"Index"},{field:"Download Date",name:"Date",decorator:_b,widgetsInCell:true,editable:true,dataType:"date",storePattern:"yyyy/M/d",formatter:"MMMM d, yyyy",editable:true,editor:_2,editorArgs:{fromEditor:_11}},{field:"Last Played",name:"Last Played (editable)",width:"100px",decorator:_c,widgetsInCell:true,setCellValue:_d,dataType:"time",storePattern:"HH:mm:ss",formatter:"hh:mm a",editor:_3},{field:"Year",name:"Year (editable)",dataType:"number",width:"100px",editable:true,editor:_4}];grid=new _5({id:"grid",cacheClass:_6,store:_8({dataSource:_7,size:100}),structure:_13,modules:[_9.Focus,_9.CellDijit,_9.Edit,_9.VirtualVScroller]});grid.placeAt("gridContainer");grid.startup();});
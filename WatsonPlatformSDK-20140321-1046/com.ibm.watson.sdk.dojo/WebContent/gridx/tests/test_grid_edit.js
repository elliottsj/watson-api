//>>built
require(["dojo/date/locale","dijit/form/DateTextBox","dijit/form/TimeTextBox","dijit/form/NumberTextBox","gridx/Grid","gridx/core/model/AsyncCache","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){var _b=function(d){res=_1.format(d,{selector:"date",datePattern:"yyyy/M/d"});return res;};var _c=function(d){res=_1.format(d,{selector:"time",timePattern:"hh:mm:ss"});return res;};var _d=[{field:"id",name:"Index"},{field:"Genre",name:"Genre",editable:true},{field:"Artist",name:"Artist",editable:true},{field:"Year",name:"Year (editable)",dataType:"number",width:"100px",editable:true,editor:_4},{field:"Album",name:"Album",editable:true},{field:"Name",name:"Name",editable:true},{field:"Length",name:"Length",editable:true},{field:"Track",name:"Track",editable:true},{field:"Composer",name:"Composer",editable:true},{field:"Download Date",name:"Date",editable:true,dataType:"date",storePattern:"yyyy/M/d",editor:_2,editorArgs:{fromEditor:_b}},{field:"Last Played",name:"Last Played (editable)",width:"100px",dataType:"time",storePattern:"HH:mm:ss",formatter:"hh:mm a",editable:true,editor:_3,editorArgs:{fromEditor:_c}}];grid=new _5({id:"grid",cacheClass:_6,store:_8({dataSource:_7,size:100}),structure:_d,modules:[_9.Focus,_9.CellDijit,_9.Edit,_9.VirtualVScroller]});grid.placeAt("gridContainer");grid.startup();window.beginEdit2_3=function(){grid.edit.begin("2","3");};window.applyEdit2_3=function(){grid.edit.apply("2","3");};window.cancelEdit2_3=function(){grid.edit.cancel("2","3");};window.isEditing2_3=function(){alert(grid.edit.isEditing("2","3"));};window.setEditor3=function(){grid.edit.setEditor(3,_2);};var tp=new _a({});tp.placeAt("ctrlPane");tp.addTestSet("Core Functions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: beginEdit2_3\">Begin edit cell(2,3)</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: applyEdit2_3\">Apply edit cell(2,3)</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: cancelEdit2_3\">Cancel edit cell(2,3)</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: isEditing2_3\">Is cell(2,3) editing</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: setEditor3\">set the 3rd column editor to a DateTextBox</div><br/>"].join(""));tp.startup();});
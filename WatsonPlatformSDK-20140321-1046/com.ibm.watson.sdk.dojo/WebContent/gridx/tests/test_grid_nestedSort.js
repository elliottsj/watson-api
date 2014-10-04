//>>built
require(["gridx/Grid","gridx/core/model/AsyncCache","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/TestPane","gridx/modules/NestedSort","gridx/modules/VirtualVScroller","gridx/modules/Focus","doh"],function(_1,_2,_3,_4,_5,_6,_7,_8){grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),modules:[_7,{moduleClass:_6,preSort:[{colId:"2",descending:true},{colId:"4",descending:false}]},_8],structure:_3.layouts[0]});grid.placeAt("gridContainer");grid.startup();var tp=new _5({});tp.placeAt("ctrlPane");tp.addTestSet("Core Functions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testSort\">Sort via API</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testClear\">Clear sort</div><br/>",].join(""));tp.startup();});function testSort(){var d=[{colId:"id",descending:true},{colId:"Artist",descending:false},{colId:"Name",descending:false}];grid.nestedSort.sort(d);};function testClear(){grid.nestedSort.clear();};
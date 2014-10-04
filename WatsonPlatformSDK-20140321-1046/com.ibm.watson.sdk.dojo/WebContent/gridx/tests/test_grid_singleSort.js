//>>built
require(["dojo","doh","gridx/Grid","gridx/core/model/AsyncCache","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6,_7,_8){var _9=[{field:"id",name:"Index",dataType:"number"},{field:"Genre",name:"Genre"},{field:"Artist",name:"Artist"},{field:"Year",name:"Year",dataType:"number"},{field:"Album",name:"Album (unsortable)",sortable:false},{field:"Name",name:"Name"},{field:"Composer",name:"Composer"},{field:"Download Date",name:"Date"},{field:"Last Played",name:"Last Played"},{name:"Summary Genre and Year",formatter:function(_a){return _a.Genre+"_"+_a.Year;},sortFormatted:true}];grid=new _3({id:"grid",store:_6({dataSource:_5,size:100}),structure:_9,cacheClass:_4,modules:[_7.VirtualVScroller,{moduleClass:_7.SingleSort,preSort:{colId:"2",descending:true}}],modelExtensions:[_7.FormatSorter]});grid.placeAt("gridContainer");grid.startup();var tp=new _8({});tp.placeAt("ctrlPane");tp.addTestSet("Sort actions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testSort\">Sort 3rd column</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testClear\">Clear sort</div><br/>",""].join(""));tp.startup();});function testSort(){grid.sort.sort("3",false);doh.t(grid.column("3",true).isSorted(),"testSort() error!");};function testColumnSortAPI(){grid.column("4",true).sort(false);doh.t(grid.column("4",true).isSorted(),"testColumnSortAPI() error!");};function testClear(){grid.sort.clear();};
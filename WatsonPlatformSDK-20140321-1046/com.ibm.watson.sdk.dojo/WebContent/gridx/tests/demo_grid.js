//>>built
require(["gridx/Grid","gridx/core/model/SyncCache","gridx/core/model/SyncTreeCache","gridx/core/model/AsyncCache","gridx/core/model/AsyncTreeCache","gridx/tests/support/data/MusicData","gridx/tests/support/data/TestData","gridx/tests/support/data/TreeColumnarTestData","gridx/tests/support/data/TreeNestedTestData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/stores/JsonRestStore","gridx/tests/support/stores/Memory","gridx/tests/support/stores/TreeJsonRestStore","gridx/tests/support/stores/HugeStore","gridx/tests/support/modules","gridx/tests/support/GridConfig"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){var _11={"music store":{defaultCheck:true,store:_a({dataSource:_6,size:100}),layouts:{"layout 1":_6.layouts[3],"layout 2":_6.layouts[0]}},"test store":{store:_c({dataSource:_7,size:100}),layouts:{"layout 1":_7.layouts[0],"layout 2":_7.layouts[1]}},"server store":{isServerSide:true,store:_b({path:"./support/stores",size:10000}),layouts:{"layout 1":_7.layouts[0]},onChange:function(_12,cfg){if(_12){cfg.getHandle("cache","Asynchronous Cache").set("checked",true);}}},"huge server store":{isServerSide:true,store:_e({path:"./support/stores",size:10000000}),layouts:{"layout 1":_7.layouts[1]},onChange:function(_13,cfg){if(_13){cfg.getHandle("cache","Asynchronous Cache").set("checked",true);}cfg.getHandle("attr","vscrollerLazyScroll").set("checked",_13);}},"tree columnar store":{store:_a({dataSource:_8,maxLevel:3,maxChildrenCount:10}),layouts:{"layout 1":_8.layouts[0]},onChange:function(_14,cfg){cfg.getHandle("mod","tree").set("checked",_14);}},"tree store nested":{store:_a({dataSource:_9,maxLevel:3,maxChildrenCount:10}),layouts:{"layout 1":_9.layouts[0]},onChange:function(_15,cfg){cfg.getHandle("mod","tree").set("checked",_15);cfg.getHandle("attr","treeNested").set("checked",_15);}}};var _16={"Asynchronous Cache":{defaultCheck:true,cache:_4},"Synchronous Cache":{cache:_2},"Asynchronous Tree Cache":{cache:_5},"Synchronous Tree Cache":{cache:_3}};var _17={autoWidth:{"true":true},autoHeight:{"true":true},vscrollerLazyScroll:{"true":true},treeNested:{"true":true},columnLockCount:{"1":1,"2":2,"3":3,"4":4},paginationInitialPage:{"2":2},paginationInitialPageSize:{"12":12}};var _18={"Make formatted columns sortable":_f.FormatSorter};var _19={"vertical scroll":{virtual:_f.VirtualVScroller,"non virtual":_f.VScroller},focus:{"default":_f.Focus},persistence:{"default":_f.Persist},sort:{single:_f.SingleSort,nested:_f.NestedSorting},"export CSV":{"default":_f.ExportCSV},"print":{"default":_f.Printer},"column lock":{"default":_f.ColumnLock},"row header":{"defalt":_f.RowHeader},"indirect selection":{"defalt":_f.IndirectSelection},"row select":{basic:_f.SelectRow,extended:_f.ExtendedSelectRow},"column select":{basic:_f.SelectColumn,extended:_f.ExtendedSelectColumn},"cell select":{basic:_f.SelectCell,extended:_f.ExtendedSelectCell},"row move api":{"default":_f.MoveRow},"column move api":{"default":_f.MoveColumn},"row dnd":{"default":_f.DndRow},"column dnd":{"default":_f.DndColumn},"pagination api":{"default":_f.Pagination},"pagination bar":{"default":_f.PaginationBar},"filter api":{"default":_f.Filter},"filter bar":{"default":_f.FilterBar},"cell dijit":{"default":_f.CellDijit},"edit":{"default":_f.Edit},"tree":{"default":_f.Tree,onChange:function(_1a,cfg){if(_1a){cfg.getHandle("cache","Asynchronous Tree Cache").set("checked",true);}}}};function _1b(_1c){_1d();_1c.id="grid";window.grid=new _1(_1c);window.grid.placeAt("gridContainer");window.grid.startup();document.getElementById("tutor").style.display="none";};function _1d(){if(window.grid){window.grid.destroy();window.grid=null;}document.getElementById("tutor").style.display="";};var cfg=new _10({stores:_11,caches:_16,gridAttrs:_17,modules:_19,modelExts:_18,onCreate:_1b,onDestroy:_1d},"gridConfig");cfg.startup();});
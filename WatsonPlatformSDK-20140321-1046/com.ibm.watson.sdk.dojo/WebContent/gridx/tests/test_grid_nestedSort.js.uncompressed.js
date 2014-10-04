//>>built
require([
	'gridx/Grid',
	'gridx/core/model/AsyncCache',
	'gridx/tests/support/data/MusicData',
	'gridx/tests/support/stores/ItemFileWriteStore',
	'gridx/tests/support/TestPane',
	'gridx/modules/NestedSort',
	'gridx/modules/VirtualVScroller',
	'gridx/modules/Focus',
	"doh"
], function(Grid, Cache, dataSource, storeFactory, TestPane, NestedSort, VirtualVScroller, focus){

	grid = new Grid({
		id: 'grid',
		cacheClass: Cache,
		store: storeFactory({
			dataSource: dataSource, 
			size: 100
		}),
		modules: [
			VirtualVScroller,
			{
				moduleClass: NestedSort,
				preSort: [{colId: '2', descending: true}, {colId: '4', descending: false}]
			},
			focus
		],
		structure: dataSource.layouts[0]
	});
	grid.placeAt('gridContainer');
	grid.startup();
	
	//Test buttons
	var tp = new TestPane({});
	tp.placeAt('ctrlPane');

	tp.addTestSet('Core Functions', [
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick: testSort">Sort via API</div><br/>',
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick: testClear">Clear sort</div><br/>',
	].join(''));

	tp.startup();
});

function testSort(){
	var d = [{colId: 'id', descending: true}, {colId: 'Artist', descending: false}, {colId: 'Name', descending: false}];
	grid.nestedSort.sort(d);

//	d = grid.nestedSorting.getSortData();
//	//shoudl be  [{colId: '1', descending: true}, {colId: '3', descending: false}, {colId: '6', descending: false}];
//	doh.t(d[0].colId == '1' && d[0].descending, 'getSortData()[0] inconsistent!');
//	doh.t(d[1].colId == '3' && !d[1].descending, 'getSortData()[1] inconsistent!');
//	doh.t(d[2].colId == '6' && !d[2].descending, 'getSortData()[2] inconsistent!');
}
function testClear(){
	grid.nestedSort.clear();
}



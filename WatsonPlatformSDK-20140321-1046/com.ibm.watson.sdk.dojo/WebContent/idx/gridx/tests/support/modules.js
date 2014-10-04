define([
	'../../core/model/extensions/FormatSort',
	'../../modules/Focus',
	'../../modules/VScroller',
	'../../modules/ColumnResizer',
	'../../modules/VirtualVScroller',
	'../../modules/SingleSort',
	'../../modules/NestedSort',
	'../../modules/ColumnLock',
	'../../modules/select/Row',
	'../../modules/select/Column',
	'../../modules/select/Cell',
	'../../modules/extendedSelect/Row',
	'../../modules/extendedSelect/Column',
	'../../modules/extendedSelect/Cell',
	'../../modules/move/Row',
	'../../modules/move/Column',
	'../../modules/dnd/Row',
	'../../modules/dnd/Column',
	'../../modules/AutoScroll',
	'../../modules/pagination/Pagination',
	'../../modules/pagination/PaginationBar',
	'../../modules/pagination/PaginationBarDD',
	'../../modules/filter/Filter',
	'../../modules/filter/FilterBar',
	'../../modules/CellWidget',
	'../../modules/Edit',
	'../../modules/RowHeader',
	'../../modules/IndirectSelect',
	'../../modules/Persist',
	'../../modules/exporter/Exporter',
	'../../modules/exporter/CSV',
	'../../modules/exporter/Table',
	'../../modules/Printer',
	'../../modules/Menu',
	'../../modules/Dod',
	'../../modules/TitleBar',
	'../../modules/Tree',
	'../../modules/RowLock',
	'../../modules/ToolBar'
], function(FormatSort, 
	Focus, VScroller, ColumnResizer, VirtualVScroller,
	SingleSort, NestedSort, ColumnLock,
	SelectRow, SelectColumn, SelectCell,
	ExtendedSelectRow, ExtendedSelectColumn, ExtendedSelectCell,
	MoveRow, MoveColumn,
	DndRow, DndColumn, AutoScroll,
	Pagination,
	PaginationBar, PaginationBarDD,
	Filter, FilterBar,
	CellWidget, Edit,
	RowHeader, IndirectSelect,
	Persist, Exporter, CSV, Table, Printer,
	Menu, Dod, TitleBar, Tree, RowLock, ToolBar){
return {
	FormatSort: FormatSort,
	Focus: Focus,
	VScroller: VScroller,
	ColumnResizer: ColumnResizer, 
	VirtualVScroller: VirtualVScroller,
	SingleSort: SingleSort,
	NestedSort: NestedSort,
	ColumnLock: ColumnLock,
	SelectRow: SelectRow,
	SelectColumn: SelectColumn,
	SelectCell: SelectCell,
	ExtendedSelectRow: ExtendedSelectRow,
	ExtendedSelectColumn: ExtendedSelectColumn,
	ExtendedSelectCell: ExtendedSelectCell,
	MoveRow: MoveRow,
	MoveColumn: MoveColumn,
	DndRow: DndRow,
	DndColumn: DndColumn,
	AutoScroll: AutoScroll,
	Pagination: Pagination,
	PaginationBar: PaginationBar,
	PaginationBarDD: PaginationBarDD,
	Filter: Filter,
	FilterBar: FilterBar,
	CellWidget: CellWidget,
	Edit: Edit,
	RowHeader: RowHeader,
	IndirectSelect: IndirectSelect,
	Persist: Persist,
	Exporter: Exporter,
	ExportCSV: CSV,
	ExportTable: Table,
	Printer: Printer,
	Menu: Menu,
	Dod: Dod,
	TitleBar: TitleBar,
	Tree: Tree,
	RowLock: RowLock,
	ToolBar: ToolBar
};
});


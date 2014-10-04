//>>built
require({cache:{
'url:idx/gridx/templates/Grid.html':"<div class=\"gridx\" role=\"grid\" tabindex=\"0\" aria-readonly=\"true\" aria-label=\"grid\"\n\t><div class=\"gridxHeader\" role=\"presentation\" data-dojo-attach-point=\"headerNode\"></div\n\t><div class=\"gridxMain\" role=\"presentation\" data-dojo-attach-point=\"mainNode\"\n\t\t><div class=\"gridxBodyEmpty\" role=\"alert\" tabindex=\"-1\" data-dojo-attach-point=\"emptyNode\"></div\n\t\t><div class=\"gridxBody\" role=\"presentation\" data-dojo-attach-point=\"bodyNode\"></div\n\t\t><div class=\"gridxVScroller\" data-dojo-attach-point=\"vScrollerNode\" tabindex=\"-1\"\n\t\t\t><div style='width: 1px;'></div\n\t\t></div\n\t></div\n\t><div class=\"gridxFooter\" data-dojo-attach-point=\"footerNode\"\n\t\t><div class=\"gridxHScroller\"\n\t\t\t><div class=\"gridxHScrollerInner\" data-dojo-attach-point=\"hScrollerNode\" tabindex=\"-1\"\n\t\t\t\t><div style=\"width:1px; height: 1px;\"></div\n\t\t\t></div\n\t\t></div\n\t></div\n\t><span data-dojo-attach-point=\"lastFocusNode\" tabindex=\"0\"></span\n></div>\n"}});
define("idx/gridx/Grid", [
	"dojo/_base/kernel",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/sniff",
	"dojo/on",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"dojo/_base/query",
	"dojox/html/metrics",
	"dijit/_WidgetBase",
	"dijit/_FocusMixin",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/Grid.html",
	"./core/Core",
	"./core/model/extensions/Query",
	"./core/_Module",
	"./modules/Header",
	"./modules/Body",
	"./modules/VLayout",
	"./modules/HLayout",
	"./modules/VScroller",
	"./modules/HScroller",
	"./modules/ColumnWidth",
	"./modules/Focus"
], function(kernel, declare, array, lang, has, on, domClass, domGeometry, query, metrics,
	_WidgetBase, _FocusMixin, _TemplatedMixin, template,
	Core, Query, _Module, Header, Body, VLayout, HLayout, VScroller, HScroller, ColumnWidth, Focus){

	var forEach = array.forEach,
		dummyFunc = function(){};

	return declare('gridx.Grid', [_WidgetBase, _TemplatedMixin, _FocusMixin, Core], {
		// summary:
		//		Gridx is a highly extensible widget providing grid/table functionalities. 
		// description:
		//		Gridx is much smaller, faster, more reasonable designed, more powerful and more flexible 
		//		compared to the old dojo DataGrid/EnhancedGrid.
		
		templateString: template,

		coreModules: [
			//Put default modules here!
			Header,
			Body,
			VLayout,
			HLayout,
			VScroller,
			HScroller,
			ColumnWidth,
			Focus
		],

		coreExtensions: [
			//Put default extensions here!
			Query
		],
	
		postCreate: function(){
			// summary:
			//		Override to initialize grid modules
			// tags:
			//		protected extension
			var t = this;
			t.inherited(arguments);
			t._eventFlags = {};
			t.modules = t.coreModules.concat(t.modules || []);
			t.modelExtensions = t.coreExtensions.concat(t.modelExtensions || []);
			domClass.toggle(t.domNode, 'gridxRtl', !t.isLeftToRight());
			t.lastFocusNode.setAttribute('tabIndex', t.domNode.getAttribute('tabIndex'));
			t._initEvents(t._compNames, t._eventNames);
			t._init();
			//resize the grid when zoomed in/out.
			t.connect(metrics, 'onFontResize', function(){
				t.resize();
			});
		},
	
		startup: function(){
			// summary:
			//		Startup this grid widget
			// tags:
			//		public extension
			if(!this._started){
				this.inherited(arguments);
				this._deferStartup.callback();
			}
		},
	
		destroy: function(){
			// summary:
			//		Destroy this grid widget
			// tags:
			//		public extension
			this._uninit();
			this.inherited(arguments);
		},

	/*=====
		// autoHeight: Boolean
		//		If true, the grid's height is determined by the total height of the rows in current body view,
		//		so that there will never be vertical scroller bar. And when scrolling the mouse wheel over grid body,
		//		the whole page will be scrolled. Note if this is false, only the grid body will be scrolled.
		autoHeight: false,
		// autoWidth: Boolean
		//		If true, the grid's width is determined by the total width of the columns, so that there will
		//		never be horizontal scroller bar.
		autoWidth: false,
	=====*/

		
		resize: function(changeSize){
			// summary:
			//		Resize the grid using given width and height.
			// tags:
			//		public
			// changeSize: Object?
			//		An object like {w: ..., h: ...}.
			//		If omitted, the grid will re-layout itself in current width/height.
			var t = this, ds = {};
			if(changeSize){
				if(t.autoWidth){
					changeSize.w = undefined;
				}
				if(t.autoHeight){
					changeSize.h = undefined;
				}
				domGeometry.setMarginBox(t.domNode, changeSize);
			}
			t._onResizeBegin(changeSize, ds);
			t._onResizeEnd(changeSize, ds);
		},

		//Private-------------------------------------------------------------------------------
		_onResizeBegin: function(){},
		_onResizeEnd: function(){},
	
		_escapeId: function(id){
            return String(id).replace(/\\/g, "\\\\");
        },
        
		//event handling begin
		_compNames: ['Cell', 'HeaderCell', 'Row', 'Header'],
	
		_eventNames: [
			'Click', 'DblClick', 
			'MouseDown', 'MouseUp', 
			'MouseOver', 'MouseOut', 
			'MouseMove', 'ContextMenu',
			'KeyDown', 'KeyPress', 'KeyUp'
		],
	
		_initEvents: function(objNames, evtNames){
			var t = this;
			forEach(objNames, function(comp){
				forEach(evtNames, function(event){
					var evtName = 'on' + comp + event;
					t[evtName] = t[evtName] || dummyFunc;
				});
			});
		},
	
		_connectEvents: function(node, connector, scope){
			for(var t = this,
					m = t.model,
					eventName,
					eventNames = t._eventNames,
					len = eventNames.length,
					i = 0; i < len; ++i){
				eventName = eventNames[i];
				m._cnnts.push(on(node, eventName.toLowerCase(), lang.hitch(scope, connector, eventName)));
			}
		},
	
		_isConnected: function(eventName){
			return this[eventName] !== dummyFunc;
		},
		//event handling end

		_isCopyEvent: function(evt){
			// summary:
			//		On Mac Ctrl+click also opens a context menu. So call this to check ctrlKey instead of directly call evt.ctrlKey
			//		if you need to implement some handler for Ctrl+click.
			return has("mac") ? evt.metaKey : evt.ctrlKey;
		}
	});
});

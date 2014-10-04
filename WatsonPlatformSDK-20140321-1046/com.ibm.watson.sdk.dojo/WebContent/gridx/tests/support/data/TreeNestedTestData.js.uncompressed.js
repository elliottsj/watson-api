//>>built
define("gridx/tests/support/data/TreeNestedTestData", [], function(){
	var seed = 9973;

	var randomNumber = function(range){
		var a = 8887;
		var c = 9643;
		var m = 8677;
		seed = (a * seed + c) % m;
		var res = Math.floor(seed / m * range);
		return res;
	};

	var chars = "0,1,2,3, ,4,5,6,7, ,8,9,a,b, ,c,d,e,f, ,g,h,i,j, ,k,l,m,n, ,k,o,p,q, ,r,s,t,u, ,v,w,x,y, ,z".split(',');
	var randomString = function(){
		var len = randomNumber(50), i, str = [];
		for(i = 0; i < len; ++i){
			str.push(chars[randomNumber(chars.length)]);
		}
		return str.join('');
	};

	var randomDate = function(){
		return new Date(randomNumber(10000000000000));
	};

	var generateItem = function(parentId, index, level){
		return {
			id: parentId + "-" + (index + 1),
			number: level <= 1 ? randomNumber(10000) : undefined,
			string: level <= 2 ? randomString() : undefined,
			date: level <= 3 ? randomDate().toDateString() : undefined,
			time: randomDate().toTimeString().split(' ')[0],
			bool: randomNumber(10) < 5
		};
	};

	var generateLevel = function(parentId, level, maxLevel, maxChildrenCount){
		var i, item, res = [];
		var childrenCount = randomNumber(maxChildrenCount);
		for(i = 0; i < childrenCount; ++i){
			item = generateItem(parentId, i, level);
			res.push(item);
			if(level < maxLevel){
				item['level' + (level - 1) + 'Child'] = generateLevel(item.id, level + 1, maxLevel, maxChildrenCount);
			}
		}
		return res;
	};

	return {
		getData: function(maxLevel, maxChildrenCount){
			return {
				identifier: 'id', 
				label: 'id', 
				items: generateLevel('item', 1, maxLevel, maxChildrenCount)
			};
		},
		
		layouts: [
			[
				{id: 'number', name: 'number', field: 'number', expandField: 'level0Child', nestedLevel: 0},
				{id: 'string', name: 'string', field: 'string', expandField: 'level1Child', nestedLevel: 1},
				{id: 'date', name: 'date', field: 'date', expandField: 'level2Child', nestedLevel: 2},
				{id: 'time', name: 'time', field: 'time'},
				{id: 'bool', name: 'bool', field: 'bool'},
				{id: 'id', name: 'id', field: 'id'}
			]
		]
	};
});
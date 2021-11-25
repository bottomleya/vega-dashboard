/**
 * Sorts a column containing sectional indexes delimited by multiple full-stops '.' (e.g. IPv4 Address)
 */


jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"section-pre": function ( a ) {
		var i, item;
		var m;
		var x;

		if (!a) {
			return 0
		}
		
		x = "";

		a = a.replace(/<[\s\S]*?>/g, "");
		
		m = a.split(".");
		
		for(i = 0; i < m.length; i++) {
			item = m[i];

			if(item.length == 1) {
				x += "00" + item;
			}
			else if(item.length == 2) {
				x += "0" + item;
			}
			else {
				x += item;
			}
		}

		return x;
	},

	"section-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"section-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
});

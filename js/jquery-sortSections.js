/**
 * Sorts a column containing IP addresses (IPv4 and IPv6) or IPv4 address and port delimited by ':' in typical dot
 * notation / colon. This can be most useful when using DataTables for a
 * networking application, and reporting information containing IP address.
 *
 *  @name IP addresses 
 *  @summary Sort IP addresses numerically
 *  @author Dominique Fournier
 *  @author Brad Wasson
 *  @author Peter Vilhan
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'ip-address', targets: 0 }
 *       ]
 *    } );
 */


jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"ip-address-pre": function ( a ) {
		var i, item;
		var m, n, t;
		var x, xa;

		if (!a) {
			return 0
		}

		a = a.replace(/<[\s\S]*?>/g, "");
		
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

	"ip-address-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"ip-address-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
});

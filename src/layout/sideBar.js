
define(function(require, exports, module) {

	function sideBar(options) {
		this.ct = options.container; 
		this.render();
	}

	sideBar.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="side-container">', 
					'<div class="calendar-wrap"></div>', 
					'<div class="clock-wrap">',
						'<object height="180" width="180" align="center" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0">',
				            '<object type="application/x-shockwave-flash" data="./style/clock.swf" style="width:250px; height:250px;opacity:0.5;">',
				        '</object>',
					'</div>',
				'</div>'
			].join(''); 

			this.el = $(tpl).appendTo(ct); 

		}
	}

	module.exports = sideBar; 

})
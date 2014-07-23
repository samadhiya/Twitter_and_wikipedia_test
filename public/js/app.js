$(document).ready(function() {
	var pageX = 0;
	var pageY = 0;

	$('#postlist').textHighlighter({
		onBeforeHighlight: function(range) {
			$('#postlist').getHighlighter().removeHighlights();
            return true;
		},
	    onAfterHighlight: function(highlights, range) {
			$('.tooltip').css('top', pageY - 205).slideDown('fast');
			$('.tooltiparrow').css('left', pageX - 30);
			$.getJSON('/api/wiki/' + range, function(jd) {
				$('.tooltipinner').html(jd.content);			
			}); 
	    }	
	});

	$('.wrapper').bind('mousemove',function(e){ 
		pageX = e.pageX - this.offsetLeft;
		pageY = e.pageY - this.offsetTop;
		$("#log").text("e.pageX: " + pageX + ", e.pageY: " + pageY); 
	}); 

});
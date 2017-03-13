$(function() {

	$('#url-btn').click(function(e) {

		var self = $(this);

		e.preventDefault();
		var url = $('#url').val();

		self.addClass('disabled');
		
		$.get('/api/shorten', {url: url}, function (data) {

			self.removeClass('disabled');
			
			if(data.message) {
				$('#shortenUrl').removeClass('bg-success').addClass('bg-danger').html(data.message);
			} else {
				$('#shortenUrl').removeClass('bg-danger').addClass('bg-success').html(data.short);
			}
			
		});
	});

});
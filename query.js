
$( document ).ready(function(){
	
	$.get("ratings.php", function(data){
			
		$("#output").text(data);
	
	});

});

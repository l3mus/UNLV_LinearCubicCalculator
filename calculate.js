jQuery(document).ready(function($){
	
	//Allow only floats in box
	$('.assumption_box').keypress(function(event) {
	  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
	  }
	});
	
	$('.num_boxes').keypress(function(event) {
	  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
	  }
	});
	
	//Boxes with custom dimensions
	$('.assumption_box').on('input',function() {
	   id = $(this).attr('id');
	   var length = 0;
	   var width = 0;
	   var height = 0; 
	   var cubic_feet = 0;
	   var linear_feet = 0;
	   var total = 0;
	   switch(id) {
		  case 'inpt_flat_file_1':
		   length = 16;
		   width = 20;
		   height = $(this).val();
		   console.log(height);
		   input_id = 'flat_file_1';
		   break;
		   
		   case 'inpt_flat_file_2':
		   length = 36;
		   width = 48;
		   height = $(this).val();
		   input_id = 'flat_file_2';
		   break;
		   
		   case 'inpt_flat_file_3':
		   length = 30;
		   width = 24;
		   height = $(this).val();
		   input_id = 'flat_file_3';
		   break;
		   
		   case 'inpt_hanging_folder':
		   length = $(this).val();
		   width = 16;
		   height = 9;
		   input_id = 'hanging_folder';
		   break;
		   
		   case 'inpt_custom_container_length_1':
		   case 'inpt_custom_container_width_1':
		   case 'inpt_custom_container_height_1':
		   length = $('#inpt_custom_container_length_1').val();
		   width  = $('#inpt_custom_container_width_1').val();
		   height = $('#inpt_custom_container_height_1').val();
		   input_id = 'custom_container_1';
		   break;
		   
		   case 'inpt_custom_container_length_2':
		   case 'inpt_custom_container_width_2':
		   case 'inpt_custom_container_height_2':
		   length = $('#inpt_custom_container_length_2').val();
		   width  = $('#inpt_custom_container_width_2').val();
		   height = $('#inpt_custom_container_height_2').val();
		   input_id = 'custom_container_2';
		   break;
		   
		   case 'inpt_custom_container_length_3':
		   case 'inpt_custom_container_width_3':
		   case 'inpt_custom_container_height_3':
		   length = $('#inpt_custom_container_length_3').val();
		   width  = $('#inpt_custom_container_width_3').val();
		   height = $('#inpt_custom_container_height_3').val();
		   input_id = 'custom_container_3';
		   break;
	   }
		num = $('#' + input_id).val(); 
		
	    calculateAndDisplay(length,width,height,num,input_id);
	});

	$('.num_boxes').on('input', function() {  
	   num = $(this).val(); // get the current value of the input field.
	   id = $(this).attr('id');
	   var length = 0;
	   var width = 0;
	   var height = 0; 
	   switch(id) {
		   case 'standard_record_storage_carton':
		   length = 15.5;
		   width = 12.5;
		   height = 10.25;
		   break;
		   
		   case 'letter_document_box':
		   length = 12.25;
		   width = 5;
		   height = 10.25;
		   break;
		   
		   case 'slim_letter_document_box':
		   length = 12.25;
		   width = 2.5;
		   height = 10.25;
		   break;
		   
		   case 'legal_document_box':
		   length = 15.25;
		   width = 5;
		   height = 10.25;
		   break;
		   
		   case 'slim_legal_document_box':
		   length = 15.25;
		   width = 2.5;
		   height = 10.25;
		   break;
		   
		   case '7_legal_document_box':
		   length = 15.25;
		   width = 7;
		   height = 10.25;
		   break;
		   
		   case 'oversize_box_1':
		   length = 31;
		   width = 24;
		   height = 3;
		   break;
		   
		   case 'oversize_box_2':
		   length = 4;
		   width = 20;
		   height = 16;
		   break;
		   
		   case 'flat_file_1':
		   length = 16;
		   height =  $('#inpt_flat_file_1').val();
		   width = 20;
		   break;
		   
		   case 'flat_file_2':
		   length = 36;
		   width = 48;
		   height = $('#inpt_flat_file_2').val();
		   break;
		   
		   case 'flat_file_3':
		   length = 30;
		   width = 24;
		   height =  $('#inpt_flat_file_3').val();
		   break;
		   
		   case 'roll_1':
		   length = 34;
		   height = 3;
		   width = 3;
		   break;
		   
		   case 'roll_2':
		   length = 34;
		   height = 4;
		   width = 4;
		   break;
		   
		   case 'hanging_folder':
		   length = $('#inpt_hanging_folder').val();
		   height = 16;
		   width = 9;
		   break;
		   
		   case 'custom_container_1':
		   length = $('#inpt_custom_container_length_1').val();
		   width = $('#inpt_custom_container_width_1').val();
		   height =  $('#inpt_custom_container_height_1').val();
		   break;
		   
		   case 'custom_container_2':
		   length = $('#inpt_custom_container_length_2').val();
		   width = $('#inpt_custom_container_width_2').val();
		   height =  $('#inpt_custom_container_height_2').val();
		   break;
		   
		   case 'custom_container_3':
		   length = $('#inpt_custom_container_length_3').val();
		   width = $('#inpt_custom_container_width_3').val();
		   height =  $('#inpt_custom_container_height_3').val();
		   break;
	   }
	   calculateAndDisplay(length,width,height,num,id);
	});//End update boxes
	
	function calculateAndDisplay(length,width,height,num,id){
		var cubic_feet = 0;
		var linear_feet = 0;
	    var total = 0;
	    var total_lf = 0;
	    //do calculations
		cubic_feet = ((length/12) * (width/12) * (height/12)) * num;
		linear_feet = (width/12) * num;
		
		//display calculation
	    $('#lbl_' + id).html(cubic_feet.toFixed(4));
	    $('#lbl_' + id + "_lf").html(linear_feet.toFixed(4));
		
		//calculate total
		total = getTotal();
		total_lf = getLFTotal();
		
		//display total
		$('#lbl_total').html(total.toFixed(4));
		$('#lbl_total_lf').html(total_lf.toFixed(4));
		
		return;
	}
	//calculate total for cubic feet
	function getTotal(){
		var total = 0.0;
		var sum = 0.0;
		$('.results').each(function() {
			sum =  parseFloat($(this).html());
			if(!isNaN(sum))
				total += sum;
		});
		return total;
	}
	//Calculate total for linear feet
	function getLFTotal(){
		var total = 0.0;
		var sum = 0.0;
		$('.results_lf').each(function() {
			sum =  parseFloat($(this).html());
			if(!isNaN(sum))
				total += sum;
		});
		return total;
	}
}); //End Document
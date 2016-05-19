jQuery(document).ready(function($){
	
	//Allow only floats in box
	$(document).on('keypress', '.num_boxes', function(event) {
	  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.charCode !== 32) && (event.charCode != 0) && (event.which < 48 || event.which > 57) ) {
		event.preventDefault();
	  }
	}).on('keydown', function(e) {
	   if (e.keyCode==8)
		 $('element').trigger('keypress');
	 });
	//Allow only floats in box
	$(document).on('keypress', '.assumption_box', function(event) {
	  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.charCode !== 32) && (event.charCode != 0) && (event.which < 48 || event.which > 57) ) {
		event.preventDefault();
	  }
	}).on('keydown', function(e) {
	   if (e.keyCode==8)
		 $('element').trigger('keypress');
	 });
	
	$("#btn_clear_all").on('click', function(event){
		
		$('div').filter(function() {
			return parseInt(this.id.replace('custom_container',''),10) > 1;
		}).remove();
		
		$(':input').val('');
		$('label[class*="results"]').html('0.0000');
		$('#lbl_total').html('0.0000');
		$('#lbl_total_lf').html('0.0000');

	});
	
	//Add Custom Container 
	$('#btn_add_custom_container').click(function() {
		//Find last Custom Container Created
		var $div = $('div[id^="custom_container"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;
		
		var $custom_container = $div.clone().prop('id', 'custom_container'+num );
		$custom_container.find(".table").html('<div class="cell custom_title" id="left">' +
							'<lable>Custom Container ' + num + '<br>' +
							'(<input type ="Text" id="inpt_custom_container_length_'  + num + '" placeholder="0.0" type="number" class="assumption_box"> x '  + 
							'<input type ="Text" id="inpt_custom_container_width_' + num + '" placeholder="0.0" type="number" class="assumption_box"> x ' +
							'<input type ="Text" id="inpt_custom_container_height_' + num + '" placeholder="0.0" type="number" class="assumption_box">)</lable>'  + 
							'</div>' +
							'<div class="cell" id="middle">' +
								'<input type ="Text" id="custom_container_' + num + '" placeholder="0.0" type="number"  class="num_boxes">' +
							'</div>' +
							'<div class="cell" id="right">'+
								'<label id = "lbl_custom_container_' + num + '" class="results">0.0000</label>' + 
							'</div>' +
							'<div class="cell" id="right">' +
								'<label id = "lbl_custom_container_' + num +  '_lf" class="results_lf">0.0000</label>' + 
							'</div>');
		$div.after( $custom_container);

	});
	$(document).on('input', '.assumption_box, .num_boxes',function() {
		
	   //Match Id to use this function for both assumption_box and num_boxes
	   id = $(this).attr('id').replace('inpt_', '').replace('length_', '').replace('width_', '').replace('height_', '');
	   num = $("#" + id).val(); // get the current value of the input field.
	   console.log("HERE");
	   console.log(id);
	   var length = 0;
	   var width = 0;
	   var height = 0; 
	   var custom_container_number = 1;
	   if(id.match(/\d+$/))	var custom_container_number = id.match(/\d+$/)[0];
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
		   height = 9;
		   width = 16;
		   break;
		   
		   case 'custom_container_' + custom_container_number:
		   length = $('#inpt_custom_container_length_' + custom_container_number).val();
		   width = $('#inpt_custom_container_width_' + custom_container_number).val();
		   height =  $('#inpt_custom_container_height_' + custom_container_number).val();
		   break;
	   }
	   calculateAndDisplay(length,width,height,num,id);
	});//End update boxes
	
	function calculateAndDisplay(length,width,height,num,id){
		var cubic_feet = 0;
		var linear_feet = 0;
		
	    //do calculations
		cubic_feet = ((length/12) * (width/12) * (height/12)) * num;
		linear_feet = (width/12) * num;
		
		//display calculation
	    $('#lbl_' + id).html(cubic_feet.toFixed(4));
	    $('#lbl_' + id + "_lf").html(linear_feet.toFixed(4));
		
		
		//display total
		$('#lbl_total').html(getTotal().toFixed(4));
		$('#lbl_total_lf').html(getLFTotal().toFixed(4));
		
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
	/*$(document).ready(function () {

    function exportTableToCSV($table, filename) {

        var $rows = $table.find('tr:has(td)'),

            // Temporary delimiter characters unlikely to be typed by keyboard
            // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

            // actual delimiter characters for CSV format
            colDelim = '","',
            rowDelim = '"\r\n"',

            // Grab text from table into CSV formatted string
            csv = '"' + $rows.map(function (i, row) {
                var $row = $(row),
                    $cols = $row.find('td');

                return $cols.map(function (j, col) {
                    var $col = $(col),
                        text = $col.text();

                    return text.replace(/"/g, '""'); // escape double quotes

                }).get().join(tmpColDelim);

            }).get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim) + '"',

            // Data URI
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this)
            .attr({
            'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    }

    // This must be a hyperlink
    $(".export").on('click', function (event) {
        // CSV
        exportTableToCSV.apply(this, [$('#dvData>table'), 'export.csv']);
        
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
});*/
}); //End Document
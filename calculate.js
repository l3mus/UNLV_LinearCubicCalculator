jQuery(document).ready(function($){
	
	//Allow only floats in box
	$(document).on('keypress', '.num_boxes, .assumption_box',function(event) {
	  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.charCode !== 32) && (event.charCode != 0) && (event.which < 48 || event.which > 57) ) {
		event.preventDefault();
	  }
	});
	
	$("#btn_clear_all").on('click', function(event){
		
		//Remove Custom Containers
		$('div').filter(function() {
			return parseInt(this.id.replace('custom_container',''),10) > 1;
		}).remove();
		
		//Clear All Values
		$(':input').val('');
		$('#lbl_total,#lbl_total_lf,label[class*="results"]').html('0.0000');
		return false;
	});
	
	//Add Custom Container 
	$('#btn_add_custom_container').click(function() {
		//Find last Custom Container Created
		var $div = $('div[id^="custom_container"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;
		
		var $custom_container = $div.clone().prop('id', 'custom_container'+num );
		$custom_container.find(".table").html('<div class="cell custom_title" id="left">' +
							'<lable  class="type">Custom Container ' + num + '<br>' +
							'(<input type ="Text" name="inpt_custom_container_length_'  + num + '" id="inpt_custom_container_length_'  + num + '" placeholder="0.0" type="number" class="assumption_box"> x '  + 
							'<input type ="Text" name="inpt_custom_container_width_' + num + '" id="inpt_custom_container_width_' + num + '" placeholder="0.0" type="number" class="assumption_box"> x ' +
							'<input type ="Text" name="inpt_custom_container_height_' + num + '" id="inpt_custom_container_height_' + num + '" placeholder="0.0" type="number" class="assumption_box">)</lable>'  + 
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
		return false;
	});
	$(document).on('input', '.assumption_box, .num_boxes',function() {
	   //Match Id to use this function for both assumption_box and num_boxes
	   var id = $(this).attr('id').replace('inpt_', '').replace('length_', '').replace('width_', '').replace('height_', '');
	   var  num = $("#" + id).val(); // get the current value of the input field.
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
		   width = 20;
		   height =  $('#inpt_flat_file_1').val();
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
		   width = 3;
		   height = 3;
		   break;
		   
		   case 'roll_2':
		   length = 34;
		   width = 4;
		   height = 4;
		   break;
		   
		   case 'hanging_folder':
		   length = $('#inpt_hanging_folder').val();
		   width = 16;
		   height = 9;
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
		
	    //Calculations
		cubic_feet = ((length/12) * (width/12) * (height/12)) * num;
		linear_feet = (width/12) * num;
		
		//Display calculation
	    $('#lbl_' + id).html(cubic_feet.toFixed(4));
	    $('#lbl_' + id + "_lf").html(linear_feet.toFixed(4));
		
		
		//Display total
		$('#lbl_total').html(getTotal().toFixed(4));
		$('#lbl_total_lf').html(getLFTotal().toFixed(4));
		
		return;
	}
	//Calculate total for cubic feet
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
	// This must be a hyperlink
	$("#btn_download").on('click', function (event) {
		// CSV
		downloadCSV({ filename: "lc-report.csv" });
		
		// IF CSV, don't do event.preventDefault() or return false
		// We actually need this to be a typical hyperlink
	});
	function downloadCSV(args) {  
		var data, filename, link, i;
		var label,input ;
		var csvContent = "data:text/csv;charset=utf-8,";
		
		var data = [
			["Collection Name:", $('#collection_name').val(), "Collection ID:", $('#collection_id').val()],
			["Types of containers (L(in) x W(in) x H(in))","Number of containers","Cubic Feet","Linear Feet"],
		];

		//Get column by column 
		
		//Add Labels to data
		$('.type').each(function() {
			input = $(this).find("input");
			label = $(this).html();
			input.each(function(info,index){
				
				label = label.replace($(this)[0].outerHTML, $(this)[0].value);
			});
			
			//Format data 
			label = label.replace(/(<br>)*/g, '').replace('<b>',' ').replace('</b>',' ').replace('\n', "").replace(/\s+/g,' ').trim();
			data.push([label]);
		});
		
		//Add number of containers
		i = 2; 
		$('.num_boxes').each(function(info,index) {
			data[i].push($(this).val());
			i++;
		});
		
		//Add Cubic Feet
		i = 2; 
		$('.results').each(function(info,index) {
			data[i].push($(this).html());
			i++;
		});
		
		//Add Linear Feet
		i = 2; 
		$('.results_lf').each(function(info,index) {
			data[i].push($(this).html());
			i++;
		});
		
		//Add totals
		data[i].push(['',$("#lbl_total").html(),$("#lbl_total_lf").html(),]);
		
		//turn data array into cvs comma seperated list
		data.forEach(function(infoArray, index){

		   dataString = infoArray.join(",");
		   csvContent += index < data.length ? dataString+ "\n" : dataString;

		}); 

		filename = args.filename || 'export.csv';

		//Create downloand link
		var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		if (navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, filename);
		} else {
			link = document.createElement("a");
			if (link.download !== undefined) { // feature detection
				// Browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob);
				link.setAttribute("href", url);
				link.setAttribute("download", filename);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				
			}
		}
	}
}); //End Document
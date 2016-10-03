jQuery(document).ready(function($){
	
	//Allow only floats in box
	$(document).on('keypress', '.num_boxes, .assumption_box',function(event) {
	  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.charCode !== 32) && (event.charCode != 0) && (event.which < 48 || event.which > 57) ) {
		event.preventDefault();
	  }
	});
	
	
	$(document).on('click', '.row:not(:last-child)', function() {
		removeselected();
		$(this).children('.table').addClass("selected");
		return false;
	});
	
	function removeselected(){
		$('.table').filter(function() {
			$(this).removeClass("selected");  
		});
		
	}
	
	$("#btn_clear_all").on('click', function(event){
		
		//Remove Custom Containers
		$('div').filter(function() {
			return parseInt(this.id.replace('custom_container',''),10) > 1;
		}).remove();
		
		//Clear All Values
		$(':input').val('');
		$('.results, .results_lf').html('0.00');
		$('#lbl_total_containers, #lbl_total, #lbl_total_lf').html('0');
		return false;
	});
	
	//Add Custom Container 
	$('#btn_add_custom_container').click(function() {
		//Find last Custom Container Created
		var $top_div = null;
		var $div = $('div[id^="custom_container"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;

		var $custom_container = $div.clone().prop('id', 'custom_container'+num );
		$custom_container.find(".table").html('<div class="cell custom_title" id="left">' +		
							'<button class="btn_remove" target="_blank" ></button>'+
							'<lable  class="type">Custom Container ' + num + '<br>' +
							'(L<input type ="Text" name="inpt_custom_container_length_'  + num + '" id="inpt_custom_container_length_'  + num + '" placeholder="0.0" type="number" class="assumption_box"> x '  + 
							'<b>W</b><input type ="Text" name="inpt_custom_container_width_' + num + '" id="inpt_custom_container_width_' + num + '" placeholder="0.0" type="number" class="assumption_box"> x ' +
							'H<input type ="Text" name="inpt_custom_container_height_' + num + '" id="inpt_custom_container_height_' + num + '" placeholder="0.0" type="number" class="assumption_box">)</lable>'  + 
							'</div>' +
							'<div class="cell" id="middle">' +
								'<input type ="Text" id="custom_container_' + num + '" placeholder="0" type="number"  class="num_boxes">' +
							'</div>' +
							'<div class="cell" id="right">'+
								'<label id = "lbl_custom_container_' + num + '" class="results">0.00</label>' + 
							'</div>' +
							'<div class="cell" id="right">' +
								'<label id = "lbl_custom_container_' + num +  '_lf" class="results_lf">0.00</label>' + 
							'</div>');
		removeselected();
		$div.after( $custom_container);
		return false;
	});
	
	$(document).on('click', '.btn_remove',function() {
		$(this).closest('.row').remove();
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
		   case 'record_storage_carton_1':
		   length = 16.25;
		   width = 13;
		   height = 10.5;
		   break;
		   
		   case 'letter_document_box_1':
		   length = 12.5;
		   width = 2.5;
		   height = 10.25;
		   break;
		   
		   case 'letter_document_box_2':
		   length = 12.5;
		   width = 5;
		   height = 10.25;
		   break;
		   
		   case 'legal_document_box_1':
		   length = 15.5;
		   width = 2.5;
		   height = 10.25;
		   break;
		   
		   case 'legal_document_box_2':
		   length = 15.5;
		   width = 5;
		   height = 10.25;
		   break;
		   
		   case "legal_document_box_3":
		   length = 15.5;
		   width = 7;
		   height = 10.25;
		   break;
		   
		   case 'oversize_document_box_1':
		   length = 13.25;
		   width = 6.5;
		   height = 13;
		   break;
		   
		   case 'oversize_document_box_2':
		   length = 17;
		   width = 6.5;
		   height = 10.25;
		   break;
		     
		   case 'oversize_flat_box_1':
		   length = 20;
		   width = 16.25;
		   height = 3.5;
		   break;
		   
		   case 'oversize_flat_box_2':
		   length = 24.75;
		   width = 20.75;
		   height = 1;
		   break;
		   
		   case 'oversize_flat_box_3':
		   length = 31;
		   width = 24.75;
		   height = 3;
		   break;
		   
		   case 'roll_1':
		   length = 34;
		   width = 3;
		   height = 3;
		   break;
		   
		   case 'roll_2':
		   length = 36;
		   width = 3;
		   height = 3.25;
		   break;
		   
		   case 'roll_3':
		   length = 48;
		   width = 3.75;
		   height = 4;
		   break; 
		   
		   case 'roll_4':
		   length = 34;
		   width = 4;
		   height = 4;
		   break;
		   
		   case 'oversize_flat_folder_1':
		   length = 16;
		   width = 20;
		   height =  $('#inpt_oversize_flat_folder_1').val();
		   break;
		   
		   case 'oversize_flat_folder_2':
		   length = 30;
		   width = 24;
		   height = $('#inpt_oversize_flat_folder_2').val();
		   break;
		   
		   case 'oversize_flat_folder_3':
		   length = 48;
		   width = 35.75;
		   height =  $('#inpt_oversize_flat_folder_3').val();
		   break;
		   
		   case 'vertical_hanging_folder':
		   length =  16; 
		   width = $('#inpt_vertical_hanging_folder').val();
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
	    $('#lbl_' + id).html(cubic_feet.toFixed(2));
	    $('#lbl_' + id + "_lf").html(linear_feet.toFixed(2));
		
		
		//Display total
		$('#lbl_total_containers').html(getTotalContianers().toFixed(0)); 
		$('#lbl_total').html(getTotal().toFixed(2));
		$('#lbl_total_lf').html(getLFTotal().toFixed(2));
		
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
	
	//Calculate total of containers
	function getTotalContianers(){
		var total = 0.0;
		var sum = 0.0;
		$('.num_boxes').each(function() {
			sum =  parseFloat($(this).val());
			if(!isNaN(sum))
				total += sum;
		});
		return total;
	}
	// This must be a hyperlink
	$("#btn_download").on('click', function (event) {
		// CSV
		if($('#collection_name').val() && $('#collection_id').val()){
			 filename = $('#collection_name').val() + "_" + $('#collection_id').val() + "_calculations.csv";
		}else if($('#collection_name').val() && !$('#collection_id').val()){
			 filename = $('#collection_name').val() + "_calculations.csv";
		}else{
			filename = "calc.csv";
		}
		downloadCSV({ filename: filename });
		
		// IF CSV, don't do event.preventDefault() or return false
		// We actually need this to be a typical hyperlink
	});
	function downloadCSV(args) {  
		var data, filename, link, i;
		var label,input ;
		var csvContent = "";
		
				
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var newdate = year + "/" + month + "/" + day;
		var data = [
			["Collection Name:", $('#collection_name').val(), "Collection ID:", $('#collection_id').val(), "Date:", newdate],
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
			value = $(this).val();
			if(!value){
				value = 0;
			}
			data[i].push(value);
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
		data[i].push([$("#lbl_total_containers").html(),$("#lbl_total").html(),$("#lbl_total_lf").html()]);
		
		//turn data array into cvs comma seperated list
		data.forEach(function(infoArray, index){

		   dataString = infoArray.join(",");
		   csvContent += index < data.length ? dataString+ "\n" : dataString;

		}); 
		filename = args.filename || 'export.csv';
		var supportsDownloadAttribute = 'download' in document.createElement('a');

		var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS');
		if(isSafari) {
			alert("When the new window opens: right click on the page and click save as.\nThen, rename your file and add .csv to the end of the file name \n(e.g export.csv) ");
		    window.open('data:text/csv;base64,' + encodeURI(window.btoa(csvContent)));
		} else if(/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			alert("IMPORTANT: Make sure you have an app than can open CSV files (like Microsoft Excel)\n\n" + 
			"When the new window opens, you can open the file on an app that can open CSV files. \n\n" +
			"You have two options for saving your data:\n\n" +
			"click \"Open in\" in Safari to email yourself the CSV or open on an app that can open CSV files\n\n"+
			"OR copy and paste it into a google sheet (in Google Drive)\n\n" +
			"(check the the calculator tips for more information)");
			window.open('data:text/csv;base64,' + encodeURI(window.btoa(csvContent)));
		}else {

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
		
	}
}); //End Document
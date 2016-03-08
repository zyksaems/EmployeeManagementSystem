//Start of Print functionality
    function PrintDiv(divId){
			
    	       //console.log("in print division function")
			   var divToPrint=document.getElementById(divId);
			   newWin= window.open("");
			   newWin.document.write(divToPrint.outerHTML);
			   newWin.print();
			   newWin.close();
	};//End of print 

	
	$(function() {
		
		var employeeids=[];
		$("#table").hide();
		 $("#table1").hide();
		$("#company_work_hours").text(0);
		$("#emp_work_hours").text(0);
		
		$("#print").click(function(){
		    /*function call to print div*/
			PrintDiv("printdiv");
			  
		});
		$("#back").click(function() {
			
			$("#id").val("");
			$( "#id" ).prop( "disabled", false );
			$("#datepicker").val("");
			$("#month").val("");
			$("#week").val("");
			$("#year").val("");
			$("#select").val("");
			$("#res").hide();
			$("#table").hide();
			$("#table1").hide();
			$("#company_work_hours").text(0);
			$("#emp_work_hours").text(0);
			$("#back").hide();
			$("#back_div").hide();
			$("#print").hide();
		});
		/*var index=0;
		
		$("#accordion").accordion({
			 active: index
		});*/
		$("#datepicker").datepicker();
		$("#back").hide();
		$("#print").hide();
		$("#title").hide();
		$("#Employee_Details").hide();
		 
		   var ref=0;
		$( "#fixed1" ).click(function() {
			if(ref==0)
				{
		  $( ".abtlikebox" ).animate({ right: "+0px" }, 200);
				ref=1;
				}
			else
					{
				$( ".abtlikebox" ).animate({ right: "-268px" }, 200);
				       ref=0;
					}
		});
		
	});
	
	/* This function executes when DOM loads completely */
	$(document).ready(function(){
		
		console.log("in admin template ready(function())");
		
		/*function call to apply auto complete functionality to employee id text field*/ 
		autoFillDataToTextField("#id",2);
		
		
		      $("#notificationLink").click(function()
				{
				$("#notificationContainer").fadeToggle(250);
				$("#notification_count").fadeOut("slow");
				return false;
				});

				//Document Click
				$(document).click(function()
				{
				$("#notificationContainer").hide();
				});
				//Popup Click
				$("#notificationContainer").click(function()
				{
				return false
				});
	
		
		
	});// END -- $(document).ready(function())
	
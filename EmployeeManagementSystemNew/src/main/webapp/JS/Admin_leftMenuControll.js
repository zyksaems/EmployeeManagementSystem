
  $(document).ready(function(){
	
	  /*variables to store  link ids*/
	 var anualProductivity_link_id="#anual-productivity-link";
	 
	 /*variables to store  division ids*/
	 var monthlyReportSelect_div_id="#monthly-report-select-div";
	 
	 /*
	  * This method executes when click on anual productivity link
	  */
	 $(anualProductivity_link_id).click(function(){
		 
		/*function call to hide remaining division*/
		 showOneDivision(anualProductivity_link_id);
		 
	 });//END -- $(anualProductivity_link_id).click()
	 
	 /**
	  * This function to display only one
	  * division at a time
	  */
	 function showOneDivision(link_id){
		 
		 (link_id == anualProductivity_link_id)?$(monthlyReportSelect_div_id).show:$(monthlyReportSelect_div_id).hide();
		 
	 };//END -- function showOneDivision(link_id)
	
  });//END -- $(document).ready(function())
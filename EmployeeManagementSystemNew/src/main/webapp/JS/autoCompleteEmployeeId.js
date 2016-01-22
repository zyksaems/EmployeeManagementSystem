

/**
 * This script is for auto complete employee id functionality	
 * and
 * To validate employee id
 * 
 */

	
	/*varibales to store employee ids*/
	var employeeIdsArray=[];
	/*variable to store local value(employee ids string)*/
	var localValue="";
	
	
	function getEmployeeIdsFromLocal(){
		
		localValue=localStorage.getItem("employeeidsarray");
		console.log("local value in second script: "+localValue);
		//console.log("type of local value in second script: "+typeof localValue);		
		employeeIdsArray=localValue.split(',');
		//console.log("employeeIds array: "+employeeIdsArray);
	};
	
	
	
	/**
     *   This function is to fill auto complete data to given text fields
     */
	function autoFillDataToTextField(idOfField,minLengrthOfAutoFill){
		//var id=""+idOfField+"";
		console.log("auto fill commom function executing");
		console.log("field id: "+idOfField+"   min len "+minLengrthOfAutoFill);
	       /**
	         *   This function is to fill auto complete data
	         */
	        $(idOfField).autocomplete(
			    { source: employeeIdsArray, minLength: minLengrthOfAutoFill}
			
	         );// $("#completeAuto").autocomplete
	
	};// END -- autoFillDataToTextField
	
	/**
     *   This function is to validate employee id
     */
	function validateEmployeeId(empId){
		
		var start=0;
		var stop=employeeIdsArray.length;
		for(start;start<stop;start++){			
			if(employeeIdsArray[start] == empId)
				return true;				
		}
		
		return false;		
	
	};// END -- validateEmployeeId(empId)
	
	/**
     *   This function will executes when DOM is completely loaded
     */
	$(document).ready(function(){
		
		/*function call*/
		getEmployeeIdsFromLocal();
		
	});// END -- $(document).ready(function())

	

     
     
     
     
     


  /*This file name is :  ConverWorkingHours.js  */

   /*variables for converting working hours into minutes*/
	   var workedHours;
	   var workedMinutes;
	   
	   /**
	    * This function is to convert working hours in hours formatt to hours and minutes formatt
	    * like (hh : mm)
	    */
	   function convertWorkingHours(wHours){
		       //console.log("in convertWorkingHours(wHours)");
			   workedHours=parseInt(wHours, 10);
			   workedMinutes=Math.round((wHours-workedHours)*60);			
			   //console.log("calculated worked hours: "+workedHours+" "+workedMinutes);
			   return workedHours+":"+workedMinutes
		   
	   }; // END -- convertWorkingHours()
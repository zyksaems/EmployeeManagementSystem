
 /* This file name:  HomePageNoticeBoard.js  */  

  /*This file is to diaplay notices on home page*/


var totalString="";

$(document).ready(function () {
	
	/*function call to display date and time*/
    DisplayCurrentTime();
    
    /*function call to get Notices from backend*/
    getAllNotices();
    
    var NoNotices_msg=" Sorry, No notices to display. ";
    
    /**
     * This function is to  display date and time
     */
    function DisplayCurrentTime() {
	    var dt = new Date();	 
	    var cDate = dt.getDate()+ "-" + (dt.getMonth()+1)  + "-" + dt.getFullYear();
	    $('#timeNow').text(dt.toLocaleTimeString());
	    $("#dateNow").text(cDate);
	    
	    setTimeout(DisplayCurrentTime, 1000);
	    
	};// END -- DisplayCurrentTime()
	
	
    function DisableBackButton() {
		window.history.forward();
	};
  
	DisableBackButton();
	
	window.onload = DisableBackButton;
	window.onpageshow = function(evt) {
		if (evt.persisted)
			DisableBackButton();
	};
	
	window.onunload = function() {
		void (0);
	};
	
	/**
	 * This function is to get all notices from backend
	 */
	 function getAllNotices(){
		  //console.log("......getAllNotices()......");
		  var request = $.ajax({
			  url: "/EmployeeManagementSystemNew/allNotices.do",
			  method: "GET",
			 
			});
			 
			request.done(function(data) {
				//console.log("Notices came");
				setTimeout(getAllNotices,60*1000);
				noticeData=data;
				
				var len=data.length;
				var string="";
				if(len>0){
					for(var i=0;i<len;i++){
						var k=i+1;
						console.log(noticeData[i].notice);
						string=string+"<p>"+k+". "+noticeData[i].notice+" ( posted on :"+noticeData[i].publishedDate+" )"+"</p>";
					}
				}
				else{					
					string="<b>"+NoNotices_msg+"<b>";
				}
				totalString=string;
				//console.log("totalString "+totalString);
				 $("#noticeBoard").html(totalString);
				
				});
			
			    request.fail(function(jqXHR, textStatus ) {
			    	setTimeout(getAllNotices,3000);
				   console.log("failed to retrieve notices(servlwer problem  please see error log in eclipse)");
				});	
			
	}; //  END  --  function getAllNotices()


    
});

	





/*Admin logout functionality*/
  
$("document").ready(function(){
	
	// apply accordian to accordian
	$("#accordion").accordion();
	
    var adminLogout_link_id="#admin-logout-link";
    
    var adminLogout_url="adminLogout.do";
    var applicationName="EmployeeManagementSystemNew";
    
    var homePage_url="home.do";
    
    $(adminLogout_link_id).click(function(){
    	console.log("admin logout");
    	/*$.get("/"+applicationName+"/"+adminLogout_url,"json");*/
    	
    	$.get("/"+applicationName+"/"+adminLogout_url, function( data ) {
			   console.log("logged in  employee ids data: "+data);
			   if(data == 1){
				   
				   window.location.href="/"+applicationName+"/"+homePage_url;
			   }
			},"json");
    	
    });// END -- $(adminLogout_link_id).click()
    
});// END -- $("document").ready()
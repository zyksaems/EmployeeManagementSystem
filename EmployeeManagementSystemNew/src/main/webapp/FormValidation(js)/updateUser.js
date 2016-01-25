 var editEmployeeIndex;
 
 /*Function for getting index of each table row*/
  function editEmployee(index){
	  
	  editEmployeeIndex=index;
  };
  
  
  /*For pagination of Employee Details table*/
  $.fn.pageMe = function(opts){
	    var $this = this,
	        defaults = {
	            perPage: 10,
	            showPrevNext: false,
	            hidePageNumbers: false
	        },
	        settings = $.extend(defaults, opts);
	    
	    var listElement = $this;
	    var perPage = settings.perPage; 
	    var children = listElement.children();
	    var pager = $('.pager');
	    
	    if (typeof settings.childSelector!="undefined") {
	        children = listElement.find(settings.childSelector);
	    }
	    
	    if (typeof settings.pagerSelector!="undefined") {
	        pager = $(settings.pagerSelector);
	    }
	    
	    var numItems = children.size();
	    var numPages = Math.ceil(numItems/perPage);

	    pager.data("curr",0);
	    
	    if (settings.showPrevNext){
	        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
	    }
	    
	    var curr = 0;
	    while(numPages > curr && (settings.hidePageNumbers==false)){
	        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
	        curr++;
	    }
	    
	    if (settings.showPrevNext){
	        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
	    }
	    
	    pager.find('.page_link:first').addClass('active');
	    pager.find('.prev_link').hide();
	    if (numPages<=1) {
	        pager.find('.next_link').hide();
	    }
	  	pager.children().eq(1).addClass("active");
	    
	    children.hide();
	    children.slice(0, perPage).show();
	    
	    pager.find('li .page_link').click(function(){
	        var clickedPage = $(this).html().valueOf()-1;
	        goTo(clickedPage,perPage);
	        return false;
	    });
	    pager.find('li .prev_link').click(function(){
	        previous();
	        return false;
	    });
	    pager.find('li .next_link').click(function(){
	        next();
	        return false;
	    });
	    
	    function previous(){
	        var goToPage = parseInt(pager.data("curr")) - 1;
	        goTo(goToPage);
	    }
	     
	    function next(){
	        goToPage = parseInt(pager.data("curr")) + 1;
	        goTo(goToPage);
	    }
	    
	    function goTo(page){
	        var startAt = page * perPage,
	            endOn = startAt + perPage;
	        
	        children.css('display','none').slice(startAt, endOn).show();
	        
	        if (page>=1) {
	            pager.find('.prev_link').show();
	        }
	        else {
	            pager.find('.prev_link').hide();
	        }
	        
	        if (page<(numPages-1)) {
	            pager.find('.next_link').show();
	        }
	        else {
	            pager.find('.next_link').hide();
	        }
	        
	        pager.data("curr",page);
	      	pager.children().removeClass("active");
	        pager.children().eq(page+1).addClass("active");
	    
	    }
	};/*END of pagination function*/
  
  $("document").ready(function() {
	  	  
	  $('#search').keyup(function()
				{
		            var searchVal=$(this).val();
		            var seachLength=searchVal.length;
		            if(seachLength >=1){
		            	searchTable(searchVal);
		            }
		            else {
		            	console.log("fill data callling");
		            	fillTableData();
		            }
		        
		            console.log("val for search length: "+seachLength);
					
				});
	  
	 /* For showing each field data in Updating form*/
	  function fillTableData(){
		  
		  var table = $('#tablebody');
		  	console.log("table len: "+table);
		  	var i=0;
		  	
		  	table.find('tr').each(function(index, row){
		  		
		  		
		  		$(row).show();
		  		
		  	});
		  	$("#myPager").empty();
		  	$('#tablebody').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:21});
		  	$("#myPager").show();
		  	
	  }/*END of fillTableData()*/
	  
	  /*For searching specific employee*/
	  
	  function searchTable(inputVal)
	  {
	  	var table = $('#tablebody');
	  	
	  	table.find('tr').each(function(index, row)
	  	{
	  		var allCells = $(row).find('td');
	  		if(allCells.length > 0)
	  		{
	  			var found = false;
	  			allCells.each(function(index, td)
	  			{
	  				var regExp = new RegExp(inputVal, 'i');
	  				if(regExp.test($(td).text()))
	  				{
	  					found = true;
	  					return false;
	  				}
	  			});
	  			if(found == true){
	  				
	  				 $(row).show();
	  				 
	  				
	  			}
	  			else
	  				$(row).hide();
	  			
	  			
	  		}
	  	});/*END of searchTable()*/
	  	
	  	console.log("pagination");
	  	$("#myPager").hide();
	  }
			
	  var allEmployeeDetais=[];
	  
	  
	  /*Validation of each field in Edit form*/
	     
	  $('#frm').formValidation({
          framework: 'bootstrap',
       
          icon: {
              valid: 'glyphicon glyphicon-ok',
              invalid: 'glyphicon glyphicon-remove',
              validating: 'glyphicon glyphicon-refresh'
          },
              
          fields: {
          	firstName: {
                  validators: {
                      notEmpty: {
                          message: 'First Name Is Required'
                      },
                      regexp: {
                          regexp: /^[a-zA-Z\s]+$/,
                          message: 'Only Alphabetical Characters Are Allowed'
                      }
                  }
              },
              lastName: {
                  validators: {
                      notEmpty: {
                          message: 'Last Name Is Required'
                      },
                      regexp: {
                          regexp: /^[a-zA-Z\s]+$/,
                          message: 'Only Alphabetical Characters Are Allowed'
                      }
                  }
              } ,
              mobileno: {
                  validators: {
                      notEmpty: {
                          message: 'Mobile No Is Required'
                      },
                      stringLength:{
                    	min:10,
                    	max:10 , 
                    	message:'Mobile No Should Be Of 10 Digits'
                      },
                      regexp: {
                          regexp: /^[789]\d{9}$/,
                          message: 'Enter a Valid Mobile No'
                      }
                  }
              },
              emailid: {
                  validators: {
                      notEmpty: {
                          message: 'Email Address Is Required'
                      },
                      emailAddress: {
                          message: 'Email Address Is Not Valid'
                      }
                  }
              } ,
              designation: {
                  validators: {
                      notEmpty: {
                          message: 'Designation Is Required'
                      },
                      stringLength:{
                    	min:2,
                      	max:25, 
                      message:'Designation should be of 2-25 characters'
                        },
                      regexp: {
                          regexp: /^[a-zA-Z\s]+$/,
                          message: 'Only Alphabetical Characters Are Allowed'
                      }
                      
                  }
              }  ,
              rollid: {
                  validators: {
                      notEmpty: {
                          message: 'Role Id Is Required'
                      },
                      stringLength:{
                      	max:1 ,
                      	message:'Enter only one digit number'
                        },
                      regexp: {
                          regexp: /^[1-4]+$/,
                          message: 'Roll Id should be 1 or 2 or 3 or 4'
                      }
                      
                  }
              },
              status: {
                  validators: {
                      notEmpty: {
                          message: 'Status Is Required'
                      },
                      stringLength:{
                      	max:1  ,
                      	message:'Enter only one digit number'
                        },
                      regexp: {
                          regexp: /^[0-1]+$/,
                          message: 'Status should be 0 or 1'
                      }
                      
                  }
              }  ,
              deptid: {
                  validators: {
                      notEmpty: {
                          message: 'Department Id Is Required'
                      },
                      stringLength:{
                    	min:2,
                      	max:2 , 
                      	message:'Department id should be of one digit or two digit'
                        },
                      regexp: {
                          regexp: /^1[0-4]+$/,
                          message: 'Department Id should be 10 or 11 or 12 or 13 or 14'
                      }
                      
                  }
              }    
             
          }
          
      });/*END-Validation of each field in Edit form*/   
	  
	  /* function call to get employee data */
	   getEmployees();
	  
	   /*Function to get all Employees*/
	  function getEmployees(){
		  console.log("getEmployee()...");
		  var request = $.ajax({
			  url: "/EmployeeManagementSystemNew/getAllEmployeeData.do",
			  method: "GET",
			  dataType: "json"
			});
			 
			request.done(function(data) {
				
				allEmployeeDetais=data;
			     console.log(data);
				 var len = data.length;
				 
				 console.log(len);
	                var txt = "";
	                
	                if(len > 0){
	                	
	                    for(var i=0;i<len;i++){
	                    	 
	                        
	                            txt += " <tr id="+i+"><td>"
	                            +data[i].employeeId+"</td><td>"
	                            +data[i].firstName+"</td><td>"
	                            +data[i].lastName+"</td><td>"
	                            +data[i].dob+"</td><td>"
	                            +data[i].mobileNo+"</td><td>"
	                            +data[i].emailId+"</td><td>"
	                            +data[i].designation+"</td><td>"
	                            +data[i].rollId+"</td><td>"
	                            +data[i].status+"</td><td>"
	                            +data[i].deptId+"</td><td><button type='button' class='btn btn-default btn-info active' onclick='editEmployee("+i+")' " +
	                            		"data-toggle='modal' data-target='#editEmployeeModal'>Edit</button></td><tr>";	                            
	                        
	                    }
	                    if(txt != ""){
	                        $("#table").append("<tbody id='tablebody'>"+txt+"</tbody");
	                        $("button").click(function(){
	                  		  console.log("button clicked");
	                  		  
	                  		fillEditEmployeeForm(editEmployeeIndex);
	                  	
	                  		
	                  	  });
	                    }

	              	  $(function(){
	              		  $('#table').tablesorter(); 
	              		});
	              	  
	              	  $('#tablebody').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:15});
	                }
				else{
					document.getElementById("res").innerHTML="NO MATCH FOUND";
					alert("No Match Found");
				}
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  //alert("failed all");
			});
				
	    };// END -- function getEmployees()
	    
	   /* Function to fill data in edit form*/
	    function fillEditEmployeeForm(index){
	    	
	    	var empObj=allEmployeeDetais[index];
	    	
	    	$("#employee-id").val(empObj.employeeId);
	    	$("#employee-fname").val(empObj.firstName);
	    	$("#employee-lname").val(empObj.lastName);
	    	$("#employee-dob").val(empObj.dob);
	    	$("#employee-mobileno").val(empObj.mobileNo);
	    	$("#employee-emailid").val(empObj.emailId);
	    	$("#employee-designation").val(empObj.designation);
	    	$("#employee-rollid").val(empObj.rollId);
	    	$("#employee-status").val(empObj.status);
	    	$("#employee-deptid").val(empObj.deptId); 
	    	
	    	$("#employee-id-header").text(empObj.employeeId);
	    	
	    };/*END- Function to fill data in edit form*/
	    
	    $("#save-eidit-employee").click(function(){
	    	onSave();
	    });
	    
	   /* Function to save data*/
	    function onSave(){
	    	 var empObj={employeeId:null,firstName:null,lastName:null,dob:null,mobileNo:null,emailId:null,designation:null,rollId:null,status:null,deptId:null};
	    	
	        var employeeId_new=document.getElementById("employee-id").value;
	    	var firstName_new=document.getElementById("employee-fname").value;
	    	var lastName_new=document.getElementById("employee-lname").value;
	    	var dob_new=document.getElementById("employee-dob").value;
	    	var mobileNo_new=document.getElementById("employee-mobileno").value;
	    	var emailId_new=document.getElementById("employee-emailid").value;
	    	var designation_new=document.getElementById("employee-designation").value;
	        var	rollId_new=document.getElementById("employee-rollid").value;
	    	var status_new=document.getElementById("employee-status").value;
	    	var deptId_new=document.getElementById("employee-deptid").value;
	        
	    	empObj={employeeId:employeeId_new,firstName:firstName_new,lastName:lastName_new,dob:dob_new,mobileNo:mobileNo_new,emailId:emailId_new,designation:designation_new,rollId:rollId_new,status:status_new,deptId:deptId_new}; 
	    	  
	    	
	    	
	    	$.ajax({
			        type: "POST",
			        url: "/EmployeeManagementSystemNew/sendObject.do",
			        data:empObj,
			        success: function(msg) {
			            //alert("Updated");
			        },
			        error: function(msg) {
			    
			        
			        }
			    });
	    	
	    };/*END-Function to save data*/
	    
  });// END -- $("document").ready()
  
  
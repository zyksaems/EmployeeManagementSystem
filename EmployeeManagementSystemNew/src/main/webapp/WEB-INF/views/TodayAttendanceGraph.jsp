<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

      <!-- Chart.Js library  -->
     <script src="./chartJS/Chart.js"></script> 
     
     <script src="./JS/TodayAttendancePieChart.js"></script>	
			
     <div class="row">
			     <div class="col-sm-9">
			     
			             <!-- for pie chart -->
			             <div class="row" id="daily-attendance-div">
			                 <div classs="col-sm-1" id="daily-attendance-legend-div">
			                        <br/><br/>
			                        <div class="col-sm-2"></div>
			                        <div class="col-sm-8">
			                            <div class="row pageHeading alert alert-info text-center" ><b><p id="today-attendance-heading"></p></b></div>			                            
			                            <canvas  width="20px" height="20px" id="today-attendance-absent-canvas" style="background-color: #FF3366"></canvas>
                                        <span><b>Absenties</b></span><br>
                                        <canvas  width="20px" height="20px" id="today-attendance-present-canvas" style="background-color: #33CCFF"></canvas>
                                        <span><b>presenties</b></span> 
                                        <p class="text-center" id="today-attendance-info-detils"></p>                                  
			                        </div>
			                        <div class="col-sm-2"></div> 			                       
			                 </div>			       	
			                 <div  class="col-sm-4" ></div>		         
			                 <div  class="col-sm-5" id="pie-holder" >   
		                        <canvas id="pieChart" width="400px" height="400px"  onclick="clickPieChart(event)"></canvas>	
		                        <p class="text-center alert"><b>Note:</b> please click on chart to show details of attendance</p> 
		            	     </div>
                         </div>                       
  					<!-- Showing present employee details  -->
 						<div id="showTableDetails">
 						   <div id="print-today-attendance-present-table">
						   <div class="alert alert-info pageHeading" >			
  						      <p id="listName" class="presentEmployeeDetails text-center"></p>
  						   </div> 
						  <table class="table table-bordered table-striped" id="daily-present-table">    
    					      <thead>
    					          <tr>
      									<td>Employee Id</td>        
        								<td>First Name</td>        
     									<td> Last Name  </td>        
        								<td> In-Time </td>       
        								<td>Out-Time </td>        
        								<td>Working-Hours</td>
      							  </tr>
    				        </thead>  
  					     </table>
  					    </div>  					    
  					     <div class="row">
  					        <div class="col-sm-6"></div>
  					        <div class="col-sm-6">
  					           <button class="btn btn-sm btn-primary" id="show-piechart-back-button">back</button>
  					            <button id="" class='btn btn-sm btn-primary' onclick="PrintDiv('print-today-attendance-present-table');">print</button>
  					        </div>
  					     </div>
					   </div>
 					<!-- Showing absent employee details  -->
					<div id="showAbsentDetails">
					  <div id="print-today-attendance-absent-table">
				          <div class="alert alert-info pageHeading" >
  				            <p id="listName1" class="AbsentEmployeeDetails text-center"></p>
 				          </div>  
    			          <table class="table table-bordered table-striped" id="daily-absent-table">
    				           <thead>
      							  <tr>
       								   <td>Employee Id</td>        
      								   <td>First Name</td>       
        							   <td> Last Name </td>        
      							  </tr>
    			               </thead>  
  				           </table>
  				       </div>
  				        <div class="row">
  					        <div class="col-sm-6"></div>
  					        <div class="col-sm-6">
  					           <button class="btn btn-sm btn-primary" id="show-piechart-back-button2">back</button>
  					           <button id="" class='btn btn-sm btn-primary' onclick="PrintDiv('print-today-attendance-absent-table');">print</button>
  					        </div>
  					     </div> 
  				     </div>
 <jsp:include page="footer.jsp"></jsp:include>
 
 
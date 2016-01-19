<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

 <script src="./JS/TodayAttendancePieChart.js"></script>	
			
     <div class="row">
			     <div class="col-sm-9">
			     
			             <!-- for pie chart -->
			             <div class="row" id="daily-attendance-div">			       			         
			                <div  id="pie-holder"  style="margin-top:%">   
                                <!-- <div class="row pageHeading alert alert-info" style="margin-bottom: 2%" > </div> -->
		                        <canvas id="pieChart" width="400px" height="400px"  style="margin-left: 25%" onclick="clickPieChart(event)"></canvas>	
		                        <div id="pieLegend" class="chart-legend"> </div>		
		            	    </div>
                         </div>
  					<!-- Showing present employee details  -->
 						<div id="showTableDetails">
						   <div class="alert alert-info pageHeading" >			
  						      <p id="listName" class="presentEmployeeDetails"></p>
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
  					     <div class="row">
  					        <div class="col-sm-6"></div>
  					        <div class="col-sm-6">
  					           <button class="btn btn-sm btn-primary" id="show-piechart-back-button">back</button>
  					        </div>
  					     </div>
					   </div>
 					<!-- Showing absent employee details  -->
					<div id="showAbsentDetails">
				       <div class="alert alert-info pageHeading" >
  				          <p id="listName1" class="AbsentEmployeeDetails"></p>
 				       </div>  
    			       <table class="table table-bordered table-striped" id="daily-absent-table">
    				        <thead>
      							<tr>
       								<td>Employee Id</td>        
      								 <td>First Name</td>       
        							<td> Last Name  </td>        
      							</tr>
    			           </thead>  
  				       </table>
  				        <div class="row">
  					        <div class="col-sm-6"></div>
  					        <div class="col-sm-6">
  					           <button class="btn btn-sm btn-primary" id="show-piechart-back-button2">back</button>
  					        </div>
  					     </div> 
  				     </div>
 <jsp:include page="footer.jsp"></jsp:include>
 
 
<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>
			<script src="./JS/weeklyProductivityChart.js"></script>
			    <!-- division for charts and graphs -->
			   
			           <!-- daily attendance div -->
			           <div  id="showChart" >
			           <div class="row">
  					   <div class="col-sm-9">
  					      <!-- for line chart -->
  					     <div style="width: auto;"  id="line-holder">
                               <div class="row pageHeading alert alert-info" >Weekly Productivity</div> 
			                    <div>
				                    <canvas id="lineChart" height="auto" width="auto" style="margin-left: 5%"></canvas> 
			                    </div>			 
		                 </div>
		              
  						<div id="lineLegend" class="chart-legend" > </div>
			               
			    </div> <!-- END -- charts div (col-sm-9) -->
			    <div class="col-sm-1"></div>
			    <!-- This division for displaying forms for graphs -->
			    <div class="col-sm-2">
			         <div id="weekly-productivity-div">
			            <form class="form-vertical" role="form" action="#">
                              <div class="form-group">
                                  <label class=" col-sm-10 control-label" >Enter EmployeeId</label> 
                                  <div class="col-sm-10">
                                     <input type="text" class="form-control" id="employeeId">
                                  </div>
                              </div>            
                              <div class="form-group "  >
                                 <label class=" col-sm-10 control-label" >select Date</label>
                                 <div class="col-sm-10">
                                     <input type="week" class="form-control"  id="weeklyDate">
                                 </div>
                              </div>
                              <div class="form-group "  >
                                 <div class="col-sm-10">
                                   <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  id="showLine">Show</button>
                                 </div>              
                                 <div class="form-group " style="color: red" >
                                   <label class=" col-sm-10 control-label" id="validationMsg"></label>
                                 </div>              
                             </div>           
                          </form>			         
			         </div><!-- End -- weekly productivity form  -->
			    
			    
			    
			    </div><!-- END -- chart's forms div (col-sm-2) -->
			                  
			    
			    </div><!-- END -- division for charts and graphs -->
			
			</div> <!-- END -- (show chart division) -->

		

<!-- </body> -->
<jsp:include page="footer.jsp"></jsp:include>
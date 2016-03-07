<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

      <!-- Chart.Js library  -->
     <script src="./chartJS/Chart.js"></script> 
     
     <script src="./JS/TodayAttendancePieChart.js"></script>	
      <script src="./JS/ConverWorkingHours.js"></script>
     <link rel="stylesheet" type="text/css" href="./CSS/header.css ">
			
     <div class="row">
			     <div class="col-sm-9">
			     
			             <!-- for pie chart -->
			             <div class="row" id="daily-attendance-chart-div">
			                  <div class="col-sm-4"></div>
			                  <div class="col-sm-8">
			                            <div class="row pageHeading alert alert-info text-center" ><b><p id="today-attendance-heading"></p></b></div>	
			                            <div class="row">
			                               <div class="col-sm-6">
			                                   <canvas  width="20px" height="20px" id="today-attendance-absent-canvas" style="background-color: #FF3366"></canvas>
                                               <span><b>Absentees</b></span><br>
                                               <canvas  width="20px" height="20px" id="today-attendance-present-canvas" style="background-color: #33CCFF"></canvas>
                                               <span><b>Presenties</b></span> <br>
                                               <canvas  width="20px" height="20px" id="today-attendance-present-canvas" style="background-color: #D7DF01"></canvas>
                                               <span><b>Leaves</b></span> 
			                               </div>
			                               <div class="col-sm-6">
			                                  <p class="text-center" id="today-attendance-info-detils"></p>   
			                               </div>			                  
			                            </div>		                            			                                                                                                 
			                   </div>
			                   <div  class="col-sm-5"> </div>
			                   <div  class="col-sm-7" id="pie-holder" >   
		                          <canvas id="pieChart" width="400px" height="400px" class="hand" ></canvas>
		                           <p class="alert"><b>Note:</b> please click on chart to show details of attendance</p> 
		            	       </div>			                          			                 
                         </div>  
                         <div class="row" id="attendance-details-tables">
                             <div class="col-sm-4"></div>
                             <div class="col-sm-8">
                                  <div id="print-attendance-table">
						                      <div class="alert alert-info pageHeading" >			
  						                          <strong><p id="details-type-heding" class="text-center"></p></strong>
  						                      </div> 
  						                      <div id="present-table-div">
						                         <table class="table table-bordered table-striped table-hover table-condensed" id="present-table" border="1"></table>
						                      </div>
						                      <div id="absent-table-div">
						                         <table class="table table-bordered table-striped table-hover table-condensed" id="absent-table" border="1"></table>
						                      </div>
						                      <div id="leaves-table-div">
						                         <table class="table table-bordered table-striped table-hover table-condensed" id="leave-table" border="1"></table>
						                      </div>
  					              </div>  	                             
                             </div>  					       
                         </div>
                         <div class="row" id="daily-attendance-buttons-div">
                                <div class="col-sm-7"></div>
                                <div class="col-sm-5">
                                     <br>
  					                 <button class="btn btn-sm btn-primary" id="show-piechart-back-button">Show Graph</button>
  					                 <button id="" class='btn btn-sm btn-primary' id="print-attendance-button" onclick="PrintDiv('print-attendance-table');">Take Print</button>
  					            </div>
                         </div>
		
 				
 <jsp:include page="footer.jsp"></jsp:include>
 
 
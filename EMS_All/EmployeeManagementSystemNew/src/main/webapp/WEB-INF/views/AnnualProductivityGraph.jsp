<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

     <!-- Chart.Js library  -->
     <script src="./chartJS/Chart.js"></script> 
	
	 <script src="./JS/Admin_annualProductivity.js"></script>
	 	
     <div class="row">
			     <div class="col-sm-8" id="grap_div">
			           <div style="width: auto ;" id="bar-holder">
			               <div class="row  pageHeading alert alert-info"><b><p class="text-center" id="monthly-productivity-type-msg"></p></b></div>
			               <canvas id="barChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
		 	  
                       </div>
			     </div>
			     <div class="col-sm-1"></div>
			     <div class="col-sm-3" style="background-color: ">
			    <!--bar chart form (monthly report) -->
                <div ng-show="showMonthlyReportForm" id="monthly-productivity-select-div">
                <div class="row text-center">
                    <!-- <div class="col-sm-1"></div> -->
                    <div class="col-sm-12">
                     <br>
                       <button class="btn btn-primary btn-Text btn-sm" id="overAll-monthly-productivity-button">OverAll</button>
                       <button class="btn btn-primary btn-Text btn-sm" id="individual-monthly-productivity-button">Invidual</button>
                   </div>
                <!--    <div class="col-sm-1"></div> -->
              
               </div>
  
        <form class="form-vertical" role="form" id="individual-monthly-productivity-form">
            <div class="form-group " style="color: red" >              
               <label class=" col-sm-12 control-label text-center" ><b>Individual Productivity</b></label>
           </div>            
           <div class="form-group">
                <label class=" col-sm-12 control-label" >Enter EmployeeId</label> 
              <div class="col-sm-12">
                  <input type="text" class="form-control" maxlength="6" id="monthly-productivity-employeeId" >
              </div>
            </div>            
             <div class="form-group ">
                 <label class=" col-sm-12 control-label" >Enter year</label>
              <div class="col-sm-12">
                     <input type="text" class="form-control"  maxlength="4"  id="individual-monthly-productivity-year">
              </div>
            </div>                        
            <div class="form-group "  >
              <div class="col-sm-12">
                  <br>
                  <button class=" form-control btn btn-info btn-Text btn-Primary-Color"  ng-click="showEmployeeMonthlyReport()" id="show-individual-monthly-productivity-button">Show</button>
              </div>
            </div>
            <div class="form-group "  >
              <div class="col-sm-12">
                  <br>
                  <b><p class="text-center text-danger monthlyErrorMsg" id="individual-monthly-productivity-msg"></p></b>
              </div>
            </div>
            
       </form>
       <form class="form-vertical" role="form" ng-show="!showIndividualMonthlyForm" id="over-all-monthly-productivity-form">
              <div class="form-group " style="color: red" >              
                <label class=" col-sm-12 control-label text-center"><b>Over all Productivity</b></label>
              </div>         
              <div class="form-group ">
                 <label class=" col-sm-12 control-label" >Enter year</label>
                 <div class="col-sm-12">
                     <input type="text" class="form-control"  id="over-all-monthly-productivity-year" maxlength="4" ng-model="AllMonthlyReportYear">
                 </div>
              </div>                        
              <div class="form-group "  >
                 <div class="col-sm-12">
                   <br>
                   <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  id="show-over-all-monthly-productivity-button" ng-click="showAllEmployeeMonthlyReport()">Show</button>
                 </div>
              </div>
              <div class="form-group "  >
                <div class="col-sm-12">
                  <br>
                  <b><p class="text-center text-danger monthlyErrorMsg" id="over-all-monthly-productivity-msg"></p></b>
                </div>
              </div>
            
        </form>
        
        
        <div id="barLegend" class="chart-legend" >
          <div class="col-sm-8">			                            			          
                  <canvas  width="20px" height="20px" id="today-attendance-present-canvas" style="background-color: #FF3366"></canvas>
                  <span><b>Non worked hours</b></span> <br>
                  <canvas  width="20px" height="20px" id="today-attendance-absent-canvas" style="background-color: #33CCFF "></canvas>
                  <span><b>Worked hours</b></span>                                                     
			</div>
        </div>
     </div>
     </div>
     
     </div> <!-- END -- (charts and graphs division) -->			    

<jsp:include page="footer.jsp"></jsp:include>
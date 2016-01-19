<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>
	
	 <script src="./JS/Admin_annualProductivity.js"></script>	
     <div class="row">
			     <div class="col-sm-9">
			           <div style="width: auto ;" id="bar-holder">
			               <div class="row  pageHeading alert alert-info"><b><p class="text-center" id="monthly-productivity-type-msg"></p></b></div>
			               <canvas id="barChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
		 	  
                       </div>
			     </div>
			     <div class="col-sm-1"></div>
			     <div class="col-sm-2" style="background-color: ">
			    <!--bar chart form (monthly report) -->
                <div ng-show="showMonthlyReportForm" id="monthly-productivity-select-div">
                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                     <br>
                       <button class="btn btn-primary btn-Text btn-sm" id="overAll-monthly-productivity-button">OverAll</button>
                       <button class="btn btn-primary btn-Text btn-sm" id="individual-monthly-productivity-button">Invidual</button>
                   </div>
                   <div class="col-sm-1"></div>
              
               </div>
  
        <form class="form-vertical" role="form" ng-show="showIndividualMonthlyForm" id="individual-monthly-productivity-form">
            <div class="form-group " style="color: red" >              
               <label class=" col-sm-12 control-label text-center" >Individual Productivity</label>
           </div>            
           <div class="form-group">
                <label class=" col-sm-12 control-label" >Enter EmployeeId</label> 
              <div class="col-sm-12">
                  <input type="text" class="form-control" id="monthly-productivity-employeeId" ng-model="MonthlyReportEmployeeId">
              </div>
            </div>            
             <div class="form-group ">
                 <label class=" col-sm-12 control-label" >Enter year</label>
              <div class="col-sm-12">
                     <input type="text" class="form-control"  maxlength="4" ng-model="MonthlyReportYear" id="individual-monthly-productivity-year">
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
                  <p class="text-center text-danger monthlyErrorMsg" id="individual-monthly-productivity-msg"></p>
              </div>
            </div>
            
       </form>
       <form class="form-vertical" role="form" ng-show="!showIndividualMonthlyForm" id="over-all-monthly-productivity-form">
              <div class="form-group " style="color: red" >              
                <label class=" col-sm-12 control-label text-center">Over all Productivity</label>
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
                  <p class="text-center text-danger monthlyErrorMsg" id="over-all-monthly-productivity-msg"></p>
                </div>
              </div>
            
        </form>
        
        
        <div id="barLegend" class="chart-legend" ></div>
     </div>
     </div>
     
     </div> <!-- END -- (charts and graphs division) -->			    

<jsp:include page="footer.jsp"></jsp:include>
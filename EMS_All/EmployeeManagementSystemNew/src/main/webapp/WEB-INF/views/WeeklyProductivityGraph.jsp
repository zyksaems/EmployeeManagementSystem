<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

     <!-- Chart.Js library  -->
     <script src="./chartJS/Chart.js"></script> 
     
     <script src="./JS/WeeklyProductivityGraph.js"></script>
			
 <!-- Start of WeeklyProductivity division -->
 
  <div class="row">
			     <div class="col-sm-8" id="grap_div">
			           <div style="width: auto ;" id="line-holder">
			               <div class="row  pageHeading alert alert-info"><b><p class="text-center" id="weekly-productivity-type-msg"></p></b></div>
			               <canvas id="lineChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
		 	  
                       </div>
			     </div>
			     <div class="col-sm-1"></div>
			     <div class="col-sm-3" >
			    <!-- bar chart form (monthly report) -->
                <div id="weekly-productivity-select-div">
                <div class="row text-center">
                  <!--   <div class="col-sm-1"></div> -->
                    <div class="col-sm-12">
                     <br>
                       <button class="btn btn-primary btn-Text btn-sm" id="overAll-weekly-productivity-button">OverAll</button>
                       <button class="btn btn-primary btn-Text btn-sm" id="individual-weekly-productivity-button">Individual</button>
                   </div>
                  <!--  <div class="col-sm-1"></div> -->
              
               </div>
  
        <form class="form-vertical" role="form"  id="individual-weekly-productivity-form">
            <div class="form-group " style="color: red" >              
               <label class=" col-sm-12 control-label text-center" ><b>Individual Productivity</b></label>
           </div>            
           <div class="form-group">
                <label class=" col-sm-12 control-label" >Enter EmployeeId</label> 
              <div class="col-sm-12">
                  <input type="text" class="form-control" id="weekly-productivity-employeeId"  maxlength="6">
              </div>
            </div>            
             <div class="form-group ">
                 <label class=" col-sm-12 control-label" >Enter Week</label>
              <div class="col-sm-12">
                     <input type="week" class="form-control" id="individual-weekly-productivity">
              </div>
            </div>                        
            <div class="form-group "  >
              <div class="col-sm-12">
                  <br>
                  <button class=" form-control btn btn-info btn-Text btn-Primary-Color"   id="show-individual-weekly-productivity-button">Show</button>
              </div>
            </div>
            <div class="form-group "  >
              <div class="col-sm-12">
                  <br>
                  <b><p class="text-center text-danger weeklyErrorMsg" id="individual-weekly-productivity-msg"></p></b>
              </div>
            </div>
            
       </form>
       <form class="form-vertical" role="form" ng-show="!showIndividualWeeklyForm" id="over-all-weekly-productivity-form">
              <div class="form-group " style="color: red" >              
                <label class=" col-sm-12 control-label text-center"><b>Over all Productivity</b></label>
              </div>         
              <div class="form-group ">
                 <label class=" col-sm-12 control-label" >Enter Week</label>
                 <div class="col-sm-12">
                     <input type="week" class="form-control"  id="over-all-weekly-productivity"  ng-model="AllWeeklyReport">
                 </div>
              </div>                        
              <div class="form-group "  >
                 <div class="col-sm-12">
                   <br>
                   <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  id="show-over-all-weekly-productivity-button" ng-click="showAllEmployeeWeeklyReport()">Show</button>
                 </div>
              </div>
              <div class="form-group "  >
                <div class="col-sm-12">
                  <br>
                  <b><p class="text-center text-danger weeklyErrorMsg" id="over-all-weekly-productivity-msg"></p></b>
                </div>
              </div>
            
        </form>
        
        <div id="lineLegend" class="chart-legend" >
           <div class="col-sm-8">			                            			          
                  <canvas  width="20px" height="20px" id="today-attendance-present-canvas" style="background-color: #FF3366"></canvas>
                  <span><b>Non-worked hours</b></span> <br>
                  <canvas  width="20px" height="20px" id="today-attendance-absent-canvas" style="background-color: #33CCFF "></canvas>
                  <span><b>Worked hours</b></span>                                                     
			</div>
        </div>
     </div>
     </div>
     
     </div> <!--  END -- (WeeklyProductivity division) -->

<!-- </body> -->
<jsp:include page="footer.jsp"></jsp:include>
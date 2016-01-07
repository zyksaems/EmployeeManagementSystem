<!DOCTYPE html>
<html>
<head>
  <title>EMS Chart page</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- JQuery  -->
  <script src="./jquery/jquery-2.1.4.js"></script>
  
 <!-- Bootstrap main script(library) file -->
  <link href="./bootstrap/bootstrap.min.css" rel="stylesheet">
  <script src="./bootstrap/bootstrap.min.js"></script> 
  
  <!-- Chart.Js library  -->
  <script src="./chartJS/Chart.js"></script>
  
    <!-- custom css -->
  <link rel="stylesheet" href="./CSS/chart.css">
  
  
  <!-- custom javascript file -->
  <script src="./JS/showGraphs.js"></script>
  
  </head>
  
<body>

    <div class="row">
       <button id="daily-attendance-graph-link">Daily attendance</button>
        <button id="weekly-attendance-graph-link">Weekly attendance</button>
         <button id="monthly-attendance-graph-link">monthly attendance</button>
    
    </div>

<!-- Div for pie charts  -->

<div  id="showChart" >
<div class="row">
  <div class="col-sm-9">
     
     <div  id="pie-holder"  style="margin-top:%">
    
           <div class="row pageHeading alert alert-info" style="margin-bottom: 2%" id="dsdfhsdhfdghfghsghsd"> Daily Attendance </div>
		   <canvas id="pieChart" width="400px" height="400px"  style="margin-left: 25%" onclick="clickPieChart(event)"></canvas>
			
    </div>
    
    <div style="width: auto ;" id="bar-holder">
			<div class="row  pageHeading alert alert-info">Monthly Productivity</div>
			<canvas id="barChart" height="auto" width="auto" style="margin-left: 5%" ></canvas>
		 	  
    </div> 
      <div style="width: auto;"  id="line-holder">
            <div class="row pageHeading alert alert-info" >Weekly Productivity</div>
			<div>
				<canvas id="lineChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
			</div>
			 
		</div>
  </div>
  <div class="col-sm-3" >
  
  <div id="pieLegend" class="chart-legend"> </div>
  <div id="barLegend" class="chart-legend" > </div>
  <div id="lineLegend" class="chart-legend" > </div>
  
  
  
<!--   line chart form  -->
  <div id="showLineChartForm" class="row">
  <div class="col-sm-2"></div>
   <div class="col-sm-10">
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
                     <input type="date" class="form-control"  id="weeklyDate">
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
       </div>
     </div>
  
  </div>  
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
  </div>
  
</body>
</html>

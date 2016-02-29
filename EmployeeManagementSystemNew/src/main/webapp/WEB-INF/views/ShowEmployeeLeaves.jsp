<jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>
    <script src="./JS/ShowEmployeeLeaves.js"></script>
    <link rel="stylesheet" href="./CSS/ShowLeaveDetail.css">
       
               <!--  <div class="col-sm-2"></div> -->
                <div class="col-sm-7 text center" >
                <h1 id="page_title">Leave Details</h1><br />
                <div id="button_position">
                <Button class="btn btn-md btn-primary" id="month_leave_button">Month Leave Dates</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-md btn-primary" id="all_leave_button">All Leave Dates</button><br /><br /><br />
                </div>
                <div id="month_leave_div"> 
                <h3 id="month_leave_title">Month Leave Dates</h3><br />
                <label><b>Month :</b></label>&nbsp;<input type="month" id="month_leaves_input">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-md btn-primary" id="month_leave_submit">submit</button><br /><br />
                <table id="month_leave_table" border='2' class="table table-bordered table-striped">
                <th>S.no</th>
                <th>Leave Date</th>
                <th>Day Type</th>
                </table>  
                 </div>
                 <h3 id="all_leave_title">All Leave Dates</h3><br />
               <table id="all_leave_table" border='2' class="table table-bordered table-striped">
                <th>S.no</th>
                <th>Leave Date</th>
                <th>Day Type</th>
                </table><br />
                <font color="red"><p id="res"></p></font>
                </div>
                <div class="col-sm-3" id="div1">
                 <span id="total_title">Total Number of NonWorked days :</span>&nbsp;&nbsp;<span id="Nonwork_days_count"></span><br /><br />
                 <span id="total_title">Total Number of Leaves  :</span>&nbsp;&nbsp;<span id="leaves_count"></span><br /><br />
                 <span id="total_title">Total Number of absents :</span>&nbsp;&nbsp;<span id="absebts_count"></span>
                 </div>
         
                

<!---------------------------------------------------------------  write all code above this line   -------------------------------------------------------------- -->
     </div>  <!-- End of  "row" -->
     
   </div> <!-- End of  "container-fluid" -->
   
 </body>
 
 </html>
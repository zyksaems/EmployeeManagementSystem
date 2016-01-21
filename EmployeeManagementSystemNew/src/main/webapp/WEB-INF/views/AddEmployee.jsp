<jsp:include page="header.jsp"></jsp:include> 
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

    <script src="./JS/Admin_addEmployee.js"></script>
    <link rel="stylesheet" href="./CSS/Admin_addEmployee.css"> 
    
			         <!-- This division for add employee manually and through excel file-->
			        <div  class="row addEmployeeMainDivision" id="add-employee-main-division" > 
                         <div class="row" >  <!--  id="importEmployeeDataDiv" -->
                              <div class="col-sm-4"></div>
                              <div class="col-sm-4"> 
                                <div class="row"><p class="AddEmpHeadingText">Add employee(s)</p></div> 
                                <div class="row">
                                  <div class="col-sm-1"></div> 
                                  <div class="col-sm-10">
                                     <Button class="btn btn-md btn-primary excelButtton" id="add-employee-excel-button">From excel</Button>
                                     <button class="btn btn-md btn-primary" id="add-employee-manual-button">Manually</button>
                                  </div> 
                                  <div class="col-sm-1">  </div> 
                                </div>                                                                       
                              </div>
                             <div class="col-sm-4"></div>   
                        </div>
                        <!-- Add employee Excel division -->
                        <div  class="row" id="add-employee-excel-div">          
                          <div class="col-md-5"></div>
                          <div class="col-sm-4  selectExcelFileDiv"><br><br>
                                <div class="row"><p class="excelDivHeadingText" >Select Excel file location</p></div> 
                                <div class="row">  
                                     <input type="file" class="btn btn-md btn-default"  id="excel-file-path" value="Browse" />                                     
                                </div> 
                                <div class="row">
                                   <br>
                                   <div class="col-sm-1"></div>
                                   <div class="col-sm-10"><button  class="btn btn-md btn-primary info" id="excel-upload-button">upload</button></div>
                                   <div class="col-sm-1"></div>                                   
                                </div>
                                <div class="row">                              
                                   <p class="ExcelEmployeeSuccessMsg text-danger" id="excel-file-uplaod-success-msg"></p><!-- </div> -->                                  
                                </div>
                            </div>
                            <div class="col-md-3"></div>  
                          <!-- <div class="col-sm-3"></div>  -->  
                        </div> <!--END -- Add employee Excel division -->
                        <br><br>
                        <!-- Add employee manual division -->
                        <div class="row manuallyEnterEmployeeDiv" id="add-employee-manual-div">  
                           <div class="row">
                             <div class="col-sm-1"> </div>
                             <div class="col-sm-3 addSingleEmployeeDiv">                  
                               <!-- <form role="form" action="#"> -->
                               <div class="form-group">
                                  <label for="email">Employee Id:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-id-val" maxlength="30" autocomplete="off" aurequired >
                               </div>
                               <div class="form-group">
                                  <label for="pwd">First Name:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-firstname-val" maxlength="30" autocomplete="off" required>
                               </div>
                               <div class="form-group">
                                  <label for="pwd">Last Name:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-lastname-val" maxlength="30" autocomplete="off" required>
                              </div>                   
                             </div>
                             <div class="col-sm-3 addSingleEmployeeDiv">                      
                                <div class="form-group">
                                  <label for="email">Date of Birth:</label>
                                  <input type="date" class="form-control" id="add-employee-employee-dob-val" maxlength="30" autocomplete="off" required >
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Mobile No:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-mobile-val" maxlength="10" autocomplete="off"  required>
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Email ID:</label>
                                  <input type="email" class="form-control" id="add-employee-employee-email-val" maxlength="30" required>
                                </div>
                             </div>
                             <div class="col-sm-3 addSingleEmployeeDiv">
                                <div class="form-group">
                                  <label for="email">Designation:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-designation-val" maxlength="30" autocomplete="off" required >
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Role ID:</label>
                                  <select class="form-control" id="add-employee-employee-role-val" required>
                                     <option  value="4">4 (SE)</option> 
                                     <option  value="1">1 (MD)</option> 
                                     <option  value="2">2 (TL)</option> 
                                     <option  value="3">3 (SSE)</option>                             
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Department ID:</label>
                                  <select class="form-control" id="add-employee-employee-dept-val" required>
                                    <option value="10">10 (production)</option>                              
                                  </select>        
                                </div>               
                             </div>   
                             <div class="col-sm-2"> </div>
                          </div>
                          <div class="row">
                             <div class="col-sm-4"></div>
                             <div class="col-sm-4">
                               <div class="row">
                                  <button type="submit" class="btn btn-primary" id="add-employee-submit-button">Save Employee</button> 
                               </div>                                 
                               <div class="row">
                                  <p class="ManualEmployeeSuccessMsg text-danger"  id="add-employee-success-message"></p>   
                                </div>                
                             </div>             
                             <div class="col-sm-4"></div>    
                          </div>            
                    </div>  <!--  END -- Add employee manual division -->       
                </div> <!-- END -- add employee main division -->
                
 <jsp:include page="footer.jsp"></jsp:include> 
 
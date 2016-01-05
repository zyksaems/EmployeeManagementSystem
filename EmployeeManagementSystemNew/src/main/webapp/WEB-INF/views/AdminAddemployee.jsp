<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Add employee(s)</title>
    <!-- JQuery  -->
  <script src="./jquery/jquery-2.1.4.js"></script>
  
  <!-- bootstrap javascript file -->
  <script src="./bootstrap/bootstrap.min.js"></script>

  <!-- boottrap css-->
  <link rel="stylesheet" href="./bootstrap/bootstrap.min.css">
  
  
   <script src="./JS/Admin_addEmployee.js"></script>
   <link rel="stylesheet" href="./CSS/Admin_addEmployee.css">
</head>
<body>

     <div class="container">
     
    
         <div  class="row addEmployeeMainDivision" id="add-employee-main-division" > <!-- ng-show="showAddEmployeeMainDiv"       id="section" -->
         <div class="row" >  <!--  id="importEmployeeDataDiv" -->
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                  <p class="AddEmpText">Add employee(s)</p>   <!-- id="AddEmpText" -->           
                  <Button class="btn btn-md btn-primary" id="add-employee-excel-button">From excel</Button>  <!--  id="excelbutton" -->
                  <button class="btn btn-md btn-primary" id="add-employee-manual-button">Manually</button>   <!-- id="manualButton" -->
             </div>
            <div class="col-sm-4"></div>   
        </div>
        <div class="row" id="add-employee-excel-div">   
        
            <div class="col-md-4"></div>
            <div class="col-sm-4  selectExcelFileDiv">
                  <p class="excelDivText" >Select Excel file location</p>  <!-- id="excelDivText" -->
                  <input type="file" class="btn btn-md btn-default"  id="excel-file-path" value="Browse" />              
                  <button  class="btn btn-md btn-primary info" id="excel-upload-button">upload</button>   <!-- id="uploadButton" -->
                  <p class="EmployeeSuccessMsg text-danger" id="excel-file-uplaod-success-msg"></p>
             </div>
            <div class="col-sm-5"></div>   
        </div><br><br>
        <div class="row manuallyEnterEmployeeDiv" id="add-employee-manual-div">  <!--  id="ManuallyEnterDiv" -->
            <div class="row">
                <div class="col-sm-1"> </div>
                <div class="col-sm-3 addSingleEmployeeDiv">                  
                    <form role="form" action="#">
                      <div class="form-group">
                         <label for="email">Employee Id:</label>
                         <input type="text" class="form-control" id="add-employee-employee-id-val" maxlength="30" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd">First Name:</label>
                         <input type="text" class="form-control" id="add-employee-employee-firstname-val" maxlength="30" required>
                      </div>
                      <div class="form-group">
                         <label for="pwd">Last Name:</label>
                         <input type="text" class="form-control" id="add-employee-employee-lastname-val" maxlength="30" required>
                      </div>
                   
               </div>
               <div class="col-sm-3 addSingleEmployeeDiv">
                       
                      <div class="form-group">
                         <label for="email">Date of Birth:</label>
                         <input type="date" class="form-control" id="add-employee-employee-dob-val" maxlength="30" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd">Mobile No:</label>
                         <input type="text" class="form-control" id="add-employee-employee-mobile-val" maxlength="10" required>
                      </div>
                      <div class="form-group">
                         <label for="pwd">Email ID:</label>
                         <input type="email" class="form-control" id="add-employee-employee-email-val" maxlength="30" required>
                      </div>
               </div>
              <div class="col-sm-3 addSingleEmployeeDiv">
                      <div class="form-group">
                         <label for="email">Designation:</label>
                         <input type="text" class="form-control" id="add-employee-employee-designation-val" maxlength="30" required >
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
                      <button type="submit" class="btn btn-primary" ng-click="addEmployee()" id="add-employee-submit-button">Save Employee</button> 
                   </div>                                 
                   <div class="row">
                       <span class="EmployeeSuccessMsg text-danger"  id="add-employee-success-message"></span>   
                    </div>                
              </div>             
              <div class="col-sm-4"></div>    
         </div>            
      </div>         
   </div>
     
     </div>
</body>
</html>
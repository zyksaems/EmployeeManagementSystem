# EmployeeManagementSystem
  EmployeeManagementSystem is a Time Management System by which we can track an employee’s productive
  as well as unproductive time.
  
##  Requirements
     Below are the requirements as described below:
      
      Software	                Version
      Spring	                4.2.1.RELEASE
      Hibernate	                4.3.11.FINAL
      Spring Tool Suite	        3.7.1.RELEASE
      Pivotal TC Server	        3.1.2 Version
      Maven	                    3.3.3 Version
      User Interface	        HTML5,CSS3,JQuery,JavaScript,AngularJs
      Modeling Tool	            StarUML2
      IDE	                    Eclipse Mars 1
      JDK	                    1.7 Version
      Database 	                Oracle 11g

## Database Tables:

    1 . create table department_table(deptid number(6) primary key,deptname varchar2(50) not null)

    2 . create table role_table(roleid number(2) primary key,roletype varchar2(50) not null)

    3 . create table employee_table(employeeid number(6) primary key,firstname varchar2(50) not null,lastname varchar2(50) not null,dob date not null,mobileno varchar2(10) unique,emailid varchar2(50) unique,designation varchar2(30) not null,roleid number(2) references role_table(roleid),status number(1) not null,deptid number(6) references department_table(deptid));

    4 . create table daytype_table(dayindicator number(1) primary key,dayname varchar2(50) not null);

    5 . create table attendance_table(attendanceid number(6) primary key ,employeeid number(6) references employee_table(employeeid) not null,attendancedate date not null,starttime date not null,endtime date null,workinghours number(6,3) null,dayindicator number(1) references daytype_table(dayindicator))

    6 . create table admin_table(adminid number(6) primary key,password varchar2(255) not null)
    
## Modules:

  Here there are two modules:
  
    1.	Attendance Module
    2.	Admin Module
    
## Role of Attendance Module  
  Every employee has to sign-in and sign-up at the time of reporting and leaving the organization accordingly.
  System will store the in-time and out-time of each employee by which we can maintain each employees productive time.
  
## Role for Admin Module

  Only Admin is authorized to generate reports of employees based on their productive and unproductive time.
  Admin can view all the employees’ data. It can add, delete or update the employees’ data. Employee can be added in a bulk wise through excel file or single wise by the Admin. Report generation also done by retrieving 
  data of each employee. Admin can represent the attendance report by daily basis or weekly basis.
  Productivity of employees can be get  by weekly, monthly and yearly basis.

  Change password functionality is also available to admin.

  If password has been forgotten the previous password can be set through emailing to the specified user.
  
## Deployment

  The project can be get from git by the url
  
    https://github.com/zyksaems/EmployeeManagementSystem

  This project can be run by following url
  
    http://localhost:8082/EmployeeManagementSystem/






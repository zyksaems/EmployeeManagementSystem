package com.caprusit.ems.domain;

import java.util.Date;

public class EmployeeForDate {

  private int employeeId;
  private String firstName;
  private String lastName;
  private Date dob;
  private String mobileNo;
  private String emailId;
  private String designation;
  private String roleType;
  private String status;
  private String deptName;

  public int getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(int employeeId) {
    this.employeeId = employeeId;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public Date getDob() {
    return dob;
  }

  public void setDob(Date dob) {
    this.dob = dob;
  }

  public String getMobileNo() {
    return mobileNo;
  }

  public void setMobileNo(String mobileNo) {
    this.mobileNo = mobileNo;
  }

  public String getEmailId() {
    return emailId;
  }

  public void setEmailId(String emailId) {
    this.emailId = emailId;
  }

  public String getDesignation() {
    return designation;
  }

  public void setDesignation(String designation) {
    this.designation = designation;
  }

  public String getRoleType() {
    return roleType;
  }

  public void setRoleType(String roleType) {
    this.roleType = roleType;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getDeptName() {
    return deptName;
  }

  public void setDeptName(String deptName) {
    this.deptName = deptName;
  }

  @Override
  public String toString() {
    return "EmployeeForDate [employeeId=" + employeeId + ", firstName=" + firstName + ", lastName="
        + lastName + ", dob=" + dob + ", mobileNo=" + mobileNo + ", emailId=" + emailId
        + ", designation=" + designation + ", roleType=" + roleType + ", status=" + status
        + ", deptName=" + deptName + "]";
  }

}

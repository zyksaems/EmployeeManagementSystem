package com.caprusit.ems.domain;

public class ProfileImage {

  private int employeeId;
  private String imageString;

  public int getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(int employeeId) {
    this.employeeId = employeeId;
  }

  public String getImageString() {
    return imageString;
  }

  public void setImageString(String imageString) {
    this.imageString = imageString;
  }

  @Override
  public String toString() {
    return "ProfileImage [employeeId=" + employeeId + ", imageString=" + imageString + "]";
  }

}

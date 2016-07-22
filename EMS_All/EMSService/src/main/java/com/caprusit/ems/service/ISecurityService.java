package com.caprusit.ems.service;

import com.caprusit.ems.domain.Admin;
import com.caprusit.ems.domain.ChangePasswordRequest;

public interface ISecurityService {

  public int login(Admin admin);

  int forgotPassword(int adminId, String emailId, String url);

  int changePassword(Admin admin, String newPassword);

  int resetPassword(Admin admin);

  public int changeEmployeePassword(ChangePasswordRequest changePasswordData);

}

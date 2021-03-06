package com.caprusit.ems.service;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.dao.ISecurityDAO;
import com.caprusit.ems.dao.LoginFailedAttemptsDAO;
import com.caprusit.ems.domain.Admin;
import com.caprusit.ems.domain.ChangePasswordRequest;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EncryptedEmployee;
import com.caprusit.ems.utility.EmailUtility;
import com.caprusit.ems.utility.EncryptionUtility;
import com.caprusit.ems.utility.UploadExcelFileUtility;
import com.caprusit.ems.utility.ValidatePasswordUtility;

@Service
public class SecurityServiceImpl implements ISecurityService {

  @Autowired
  private ISecurityDAO securityDAO;

  @Autowired
  private LoginFailedAttemptsDAO loginFailedDAO;

  @Autowired
  IManageUserDAO manageUsaerDAO;

  @Autowired
  private EmailUtility emailUtility;

  @Autowired
  private UploadExcelFileUtility excelFileUtility;

  private Logger logger = Logger.getLogger(SecurityServiceImpl.class);

  /**
   * This method is for administrator login validation Takes admin object returns 1 if password is
   * correct returns 0 if password is wrong returns -1 if admin username is wrong
   */
  @Transactional(rollbackFor = SQLException.class)
  public int login(Admin admin) {

    String currentPassword = null;
    int status = -1;
    Employee e = manageUsaerDAO.findById(admin.getAdminId());
    logger.info("emplotyee :" + e);
    if (e == null)
      return status;
    List<Integer> adminRoleList = securityDAO.getAdminRoleId();
    logger.info("Admin role ids list: " + adminRoleList);
    int blockedStatus = loginFailedDAO.isEmployeeBlocked(admin.getAdminId());
    logger.info(" is user blocked value: " + blockedStatus);
    if (blockedStatus == 1)
      return 3;// means user account is blocked
    else if (e.getStatus().equals("1")) {

      EncryptedEmployee encEmployee = securityDAO.getEmployeeCurrentPassword(admin.getAdminId());

      if (encEmployee != null) {
        currentPassword = EncryptionUtility.decryptPassword(admin.getPassword(),
            encEmployee.getEncryptedPassword());
        if (currentPassword != null) {
          status = 1;
          loginFailedDAO.setDefualtAttemptCount(admin.getAdminId());
        } else {
          status = 0;
          if (loginFailedDAO.checkAttemptsCount(admin.getAdminId()) < 3) {
            loginFailedDAO.incrementAttemptCount(admin.getAdminId());
          } else {
            loginFailedDAO.LockUser(admin.getAdminId());
            String[] details = loginFailedDAO.getMailID(admin.getAdminId());
            String message = "\n\n\n \t Your  Account is blocked due to three wrong password attempts. "
                + " \n\n \t Please select forgot password link in login to activate your account.\n ";
            logger.info("mail details: " + details[2] + "   " + details[0] + " " + details[1]
                + "Account blocked");
            emailUtility.sendMail(details[2], message, details[0] + " " + details[1],
                "Account blocked");
            return 2;// to say that your account blocked and check mails
          }

        }

      }
      status = (status == 1 && adminRoleList.contains(e.getRollId())) ? 10 : status;
      logger.info("login status for admin/employee: " + status);

      return status;
    } else {
      return status;
    }

  }

  /**
   * This method is for forgot password functionality Takes username,email id,url Returns 1 if mail
   * sent to user Returns 0 if mail ID is wrong Returns -1 if username is wrong
   */
  @Transactional(rollbackFor = SQLException.class)
  public int forgotPassword(int adminId, String emailId, String url) {
    int result;
    List<Object> mailInfo = securityDAO.forgotPassword(adminId);
    Object[] data = (Object[]) mailInfo.get(0);
    if (data != null) {
      if (data[1].equals(emailId)) {
        String message = "\n\n\n \t Your  Reset Password  link is  " + url
            + " \n\n\n \t NOTE: This link will expire in "
            + EmsConditions.RESET_PASSSWORD_LINK_VALID_TIME + " minutes";
        emailUtility.sendMail(emailId, message, (String) data[0] + " " + (String) data[2],
            "Forgot Password");
        result = 1;
        logger.info("Mail sent successfully to your  mail id");
      } else {
        result = 0;
        logger.info("Incorrect EmalId");
      }
    } else {
      result = -1;
      logger.info("Incorrect AdminId");
    }
    return result;
  }

  /**
   * This method is for change administrator functionality Takes admin object and new password
   * Returns 1 if password successfully changed Returns 0 if old password is incorrect Returns -1 if
   * any problem occured
   */
  @Transactional(rollbackFor = SQLException.class)
  public int changePassword(Admin admin, String newPassword) {

    EncryptedEmployee encEmployee = securityDAO.getEmployeeCurrentPassword(admin.getAdminId());
    if (encEmployee != null) {
      String oldPassword = EncryptionUtility.decryptPassword(admin.getPassword(),
          encEmployee.getEncryptedPassword());
      if (oldPassword != null) {
        EncryptedEmployee encryptedEmployee = new EncryptedEmployee();
        encryptedEmployee.setEmployeeId(admin.getAdminId());
        encryptedEmployee.setEncryptedPassword(EncryptionUtility.encryptString(newPassword));
        return securityDAO.changeEmployeePassword(encryptedEmployee);
      } else {
        return 0;
      }

    } else
      return -1;

  }

  /**
   * This method is to reset password incase of forgot password Takes admin object Returns 1 on
   * successful reset
   */
  @Transactional(rollbackFor = SQLException.class)
  public int resetPassword(Admin admin) {
    EncryptedEmployee encryptedEmployee = new EncryptedEmployee();
    encryptedEmployee.setEmployeeId(admin.getAdminId());
    encryptedEmployee.setEncryptedPassword(EncryptionUtility.encryptString(admin.getPassword()));
    return securityDAO.changeEmployeePassword(encryptedEmployee);
  }

  /**
   * This method is for change employee functionality This method takes ChangePasswordrequest object
   * Returns 1 if successfully changed Returns 0 if current password is wrong Returns -1 if any
   * problem occurred
   */
  @Transactional(rollbackFor = SQLException.class)
  public int changeEmployeePassword(ChangePasswordRequest changePasswordData) {
    logger.info(
        "in SecurityServiceImpl class -- changeEmployeePassword(ChangePasswordRequest changePasswordData)");
    EncryptedEmployee encEmployee = securityDAO
        .getEmployeeCurrentPassword(changePasswordData.getUserName());
    if (encEmployee == null) {
      logger.info("entered username is not found in database");
      return -1;
    } else if (ValidatePasswordUtility.validatePassword(changePasswordData.getCurrentPassword(),
        encEmployee.getEncryptedPassword())) {
      logger.info("validation ok -- now chaniging employee password");
      encEmployee.setEmployeeId(changePasswordData.getUserName());
      encEmployee.setEncryptedPassword(
          EncryptionUtility.encryptString(changePasswordData.getNewPassword()));
      return securityDAO.changeEmployeePassword(encEmployee);

    } else {
      logger.info("entered password  is not matched with current password");
      return 0;
    }

  }
}

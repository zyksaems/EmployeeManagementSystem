package com.caprusit.ems.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.dao.ISecurityDAO;
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
	IManageUserDAO manageUsaerDAO;
	
	@Autowired
	private EmailUtility emailUtility;

	@Autowired
	private UploadExcelFileUtility excelFileUtility;

	private Logger logger = Logger.getLogger(SecurityServiceImpl.class);

	/**
	 * This method is for administrator login validation
	 * Takes admin object
	 * returns 1 if password is correct
	 * returns 0 if password is wrong
	 * returns -1 if admin username is wrong
	 */
	public int login(Admin admin) {

		String adminCurrentPassword=null;
		int status=-1;
		Employee e=manageUsaerDAO.findById(admin.getAdminId());
		logger.info("emplotyee :"+e);
		if(e.getRollId() == 10){
			EncryptedEmployee encEmployee = securityDAO.getEmployeeCurrentPassword(admin.getAdminId());
 
		      if(encEmployee != null ){
			
			             adminCurrentPassword=EncryptionUtility.decryptPassword(admin.getPassword(), encEmployee.getEncryptedPassword());
			              status = (adminCurrentPassword != null) ? 1 : 0;
		        }

	          	   logger.info("login status for admin: " + status);
		    }
		return status;

	}

	/**
	 * This method is for forgot password functionality
	 * Takes username,email id,url
	 * Returns 1 if mail sent to user
	 * Returns 0 if mail ID is wrong
	 * Returns -1 if username is wrong
	 */
	public int forgotPassword(int adminId, String emailId,String url) {
		int result;
		List<Object> mailInfo = securityDAO.forgotPassword(adminId);
		Object[] data = (Object[]) mailInfo.get(0);
		if (data != null) {
			if (data[1].equals(emailId)) {
				String message="\n\n\n \t Your  Reset Password  link is  " + url + " \n\n\n \t NOTE: This link will expire in 1 minute";
				emailUtility.sendMail(emailId, message, (String) data[0] + " " + (String) data[2],"Forgot Password");
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
	 * This method is for change administrator functionality
	 * Takes admin object and new password
	 * Returns 1 if password successfully changed
	 * Returns 0 if old password is incorrect
	 * Returns -1 if any problem occured
	 */
	public int changePassword(Admin admin,String newPassword) {

		EncryptedEmployee encEmployee=securityDAO.getEmployeeCurrentPassword(admin.getAdminId());
        if(encEmployee != null){
        	String oldPassword=EncryptionUtility.decryptPassword(admin.getPassword(),encEmployee.getEncryptedPassword());
        	if(oldPassword != null){       		
        		EncryptedEmployee encryptedEmployee=new EncryptedEmployee();
        		encryptedEmployee.setEmployeeId(admin.getAdminId());
        		encryptedEmployee.setEncryptedPassword(EncryptionUtility.encryptString(newPassword));
        		return securityDAO.changeEmployeePassword(encryptedEmployee);
        	}
        	else{
        		return 0;
        	}
        	
        }
        else
        	return -1;
		
	}

	/**
	 * This method is to reset password incase of forgot password
	 * Takes admin object
	 * Returns 1 on successful reset
	 */
	public int resetPassword(Admin admin) {
		EncryptedEmployee encryptedEmployee=new EncryptedEmployee();
		encryptedEmployee.setEmployeeId(admin.getAdminId());
		encryptedEmployee.setEncryptedPassword(EncryptionUtility.encryptString(admin.getPassword()));
		return securityDAO.changeEmployeePassword(encryptedEmployee);
	}
	
	/**
	 * This method is for change employee functionality
	 * This method takes ChangePasswordrequest object
	 * Returns 1 if successfully changed
	 * Returns 0 if current password is wrong
	 * Returns -1 if any problem occurred
	 */
	public int changeEmployeePassword(ChangePasswordRequest changePasswordData) {
        logger.info("in SecurityServiceImpl class -- changeEmployeePassword(ChangePasswordRequest changePasswordData)");
        EncryptedEmployee encEmployee=securityDAO.getEmployeeCurrentPassword(changePasswordData.getUserName());
        if(encEmployee == null){
        	logger.info("entered username is not found in database");
              return -1;	
        }
        else if(ValidatePasswordUtility.validatePassword(changePasswordData.getCurrentPassword(), encEmployee.getEncryptedPassword())){
        	logger.info("validation ok -- now chaniging employee password");
        	encEmployee.setEmployeeId(changePasswordData.getUserName());
        	encEmployee.setEncryptedPassword(EncryptionUtility.encryptString(changePasswordData.getNewPassword()));
        	return securityDAO.changeEmployeePassword(encEmployee);
        	
		}
		else{
			logger.info("entered password  is not matched with current password");
			return 0;
		}
		
	}
}

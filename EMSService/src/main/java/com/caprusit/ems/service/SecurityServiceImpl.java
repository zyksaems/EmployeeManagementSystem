package com.caprusit.ems.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.ISecurityDAO;
import com.caprusit.ems.domain.Admin;
import com.caprusit.ems.domain.EncryptedAdmin;
import com.caprusit.ems.utility.EmailUtility;
import com.caprusit.ems.utility.EncryptionUtility;
import com.caprusit.ems.utility.JsonUtility;
import com.caprusit.ems.utility.UploadExcelFileUtility;

@Service
public class SecurityServiceImpl implements ISecurityService {

	@Autowired
	private ISecurityDAO securityDAO;
	@Autowired
	private EmailUtility emailUtility;

	@Autowired
	private UploadExcelFileUtility excelFileUtility;

	private Logger logger = Logger.getLogger(SecurityServiceImpl.class);

	public int login(Admin admin) {

		String adminCurrentPassword=null;
		int status=-1;
		List<Object> adminPasswordList = securityDAO.getAdminCurrentPassword(new EncryptedAdmin(admin.getAdminId()));
 
		if(adminPasswordList != null && adminPasswordList.size() > 0){
			
			adminCurrentPassword=EncryptionUtility.decryptPassword(admin.getPassword(), (byte[])adminPasswordList.get(0));
			status = (adminCurrentPassword != null) ? 1 : 0;
		}

		logger.info("login status for admin: " + status);

		return status;

	}

	public int forgotPassword(int adminId, String emailId,String url) {
		int result;
		List<Object> mailInfo = securityDAO.forgotPassword(adminId);
		Object[] data = (Object[]) mailInfo.get(0);
		if (data != null) {
			if (data[1].equals(emailId)) {
				emailUtility.sendMail(emailId, url, (String) data[0] + " " + (String) data[2]);
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

	public int changePassword(Admin admin,String newPassword) {

		List<Object> oldPaswordList=securityDAO.getAdminCurrentPassword(new EncryptedAdmin(admin.getAdminId()));
        if(oldPaswordList != null && oldPaswordList.size() > 0){
        	String oldPassword=EncryptionUtility.decryptPassword(admin.getPassword(),(byte [])oldPaswordList.get(0));
        	if(oldPassword != null){       		
        		EncryptedAdmin encryptedAdmin=new EncryptedAdmin();
        		encryptedAdmin.setAdminId(admin.getAdminId());
        		encryptedAdmin.setPassword(EncryptionUtility.encryptString(newPassword));
        		return securityDAO.changePassword(encryptedAdmin);
        	}
        	else{
        		return 0;
        	}
        	
        }
        else
        	return -1;
		
	}

	public String uploadEmployeeDetailsExcelFile(InputStream excelInputStream, String fileName) {

		logger.info("in upload file(service)");
		Workbook workbook = null;
		String[] extensionArray = fileName.split("[.]");
		logger.info("arrays isze: " + extensionArray.length);

		try {

			if (extensionArray[1].equals("xls")) {
				workbook = new HSSFWorkbook(excelInputStream);
				logger.info("2003 file");
			} else {
				logger.info("2007 file");
				workbook = new XSSFWorkbook(excelInputStream);
			}

		} catch (IOException e) {
			logger.error(e);
		}
		return excelFileUtility.saveExcelFileData(workbook);
	}

	public int resetPassword(Admin admin) {
		EncryptedAdmin encryptedAdmin=new EncryptedAdmin();
		encryptedAdmin.setAdminId(admin.getAdminId());
		encryptedAdmin.setPassword(EncryptionUtility.encryptString(admin.getPassword()));
		return securityDAO.changePassword(encryptedAdmin);
	}
}

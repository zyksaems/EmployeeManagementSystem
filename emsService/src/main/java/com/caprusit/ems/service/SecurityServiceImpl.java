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
import com.caprusit.ems.utility.EmailUtility;
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

		String adminPass = securityDAO.login(admin);

		int status = (adminPass.equals("notValid")) ? -1 : 0;

		status = (adminPass.equals(admin.getPassword())) ? 1 : status;

		logger.info("login status for admin: " + status);

		return status;

	}

	public String forgotPassword(int adminId, String emailId) {
		String result = "";
		List<Object> mailInfo = securityDAO.forgotPassword(adminId);
			logger.info("value Returned from DAO(securityDAO.forgotPassword(adminId, emailId)):" + mailInfo
					+ "mailinfo size:" + mailInfo.size());
			Object[] data = (Object[]) mailInfo.get(0);
			logger.info("Object arrray:data []" + data);
			if (data != null) {
				logger.info("length og array:" + data.length);
				if (data[1].equals(emailId)) {
					result = "Password sent to  your mail, please check your mail";
					emailUtility.sendMail(emailId, (String)mailInfo.get(1),(String)data[0]+" "+(String)data[2]);
					/*logger.info("mail formatt:   mailId:"+emailId+"      name:"+(String)data[0]+"   "+(String)data[2]+"  password:"+(String)mailInfo.get(1));*/
					logger.info("mail seimt to mail id");
				} else {
					result = "You entered wrong EmailId";
					logger.info("not correct mail");
				}
				
			} else {
				logger.info("incorrecct username");
				result = "You entered wrong AdminID";
			}
		return JsonUtility.convertToJson(result);
	}

	public String changePassword(Admin admin) {
		String msg = securityDAO.changePassword(admin);
		return msg;
	}

	public List<String> getOldPassword(Admin admin) {
		List<String> oldPwd = securityDAO.getOldPassword(admin);
		return oldPwd;
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

}

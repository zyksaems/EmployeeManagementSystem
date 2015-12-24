package com.caprusit.ems.service;

import java.io.InputStream;

import com.caprusit.ems.domain.Admin;

public interface ISecurityService {
	public int login(Admin admin);

	String forgotPassword(int adminId, String emailId, String url);

	int changePassword(Admin admin, String newPassword);
	
	int resetPassword(Admin admin);

	String uploadEmployeeDetailsExcelFile(InputStream excelInputStream,
			String fileName);
}

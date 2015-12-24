package com.caprusit.ems.service;

import java.io.InputStream;

import com.caprusit.ems.domain.Admin;

public interface ISecurityService {
	public int login(Admin admin);

	public String forgotPassword(int adminId, String emailId);

	public int changePassword(Admin admin, String newPassword);

	public String uploadEmployeeDetailsExcelFile(InputStream excelInputStream,
			String fileName);
}

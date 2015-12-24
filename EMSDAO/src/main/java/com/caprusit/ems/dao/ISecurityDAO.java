package com.caprusit.ems.dao;

import java.util.List;

import com.caprusit.ems.domain.EncryptedAdmin;

public interface ISecurityDAO {

	public List<Object> getAdminCurrentPassword(EncryptedAdmin encryptedAdmin);

	public List<Object> forgotPassword(int adminId);

	public int changePassword(EncryptedAdmin encryptedAdmin);

}

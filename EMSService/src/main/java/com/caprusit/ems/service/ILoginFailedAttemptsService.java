package com.caprusit.ems.service;

public interface ILoginFailedAttemptsService {

  int checkAttemptsCount(int adminId);

  void incrementAttemptCount(int adminId);

  int LockUser(int adminId, String url);

  int setDefualtAttemptCount(int adminId);
}

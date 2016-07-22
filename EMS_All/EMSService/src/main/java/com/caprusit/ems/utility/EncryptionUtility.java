package com.caprusit.ems.utility;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.log4j.Logger;

public class EncryptionUtility {

  private static Cipher cipher;
  private static Key secreteKey;

  private static Logger logger = Logger.getLogger(EncryptionUtility.class);

  public static byte[] encryptString(String passwordToEncrypt) {

    byte[] encryptedPassword = null;

    try {

      secreteKey = generateSecreteKey(passwordToEncrypt);

      cipher = Cipher.getInstance("AES");

      cipher.init(Cipher.ENCRYPT_MODE, secreteKey);

      encryptedPassword = cipher.doFinal(passwordToEncrypt.getBytes());

    } catch (Exception e) {

      e.printStackTrace();

    }

    return encryptedPassword;
  }

  public static String decryptPassword(String password, byte[] EncryptedPassword) {

    try {

      secreteKey = generateSecreteKey(password);

      cipher = Cipher.getInstance("AES");

      cipher.init(Cipher.DECRYPT_MODE, secreteKey);

      byte[] decryptedPassword = cipher.doFinal(EncryptedPassword);

      return new String(decryptedPassword);
    } catch (Exception e) {
      logger.error("error while decrypting password: " + e.getMessage());
      // e.printStackTrace();

    }

    return null;
  }

  private static Key generateSecreteKey(String userKey) {

    int userKeyLength = userKey.length();

    int secretetKeyLength = 0;

    secretetKeyLength = (userKeyLength <= 16) ? 16 : (userKeyLength <= 24) ? 24 : 32;

    String secreteKey = createSecreteKeyBasedOnLength(secretetKeyLength, userKey);

    return new SecretKeySpec(secreteKey.getBytes(), "AES");

  }

  private static String createSecreteKeyBasedOnLength(int secreteKeyLength, String key) {

    StringBuffer secreteKeyBuffer = new StringBuffer(key);

    while (secreteKeyBuffer.length() < secreteKeyLength) {

      secreteKeyBuffer.append(key);
    }
    // logger.info("buffer after append: "+secreteKeyBuffer);

    String finalSecreteKey = secreteKeyBuffer.substring(0, secreteKeyLength);
    // logger.info("final secrete key created: "+finalSecreteKey +"\n its length:
    // "+finalSecreteKey.length());
    // logger.info("our calculated length is: "+secreteKeyLength);

    return finalSecreteKey;
  }

}

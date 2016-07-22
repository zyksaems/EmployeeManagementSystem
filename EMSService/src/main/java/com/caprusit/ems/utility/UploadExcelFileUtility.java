package com.caprusit.ems.utility;

import java.util.Date;
import java.util.Iterator;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;

import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EncryptedEmployee;

public class UploadExcelFileUtility {

  @Autowired
  private IManageUserDAO manageUserDAO;

  private Logger logger = Logger.getLogger(UploadExcelFileUtility.class);

  int firstCellNum, lastCellNum, count, exceptionRowNumber = -1, exceptionColNumber = -1;

  // private SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MMM-yyyy");
  private Sheet sheet = null;

  public String saveExcelFileData(Workbook workbook) {

    try {

      // int NoOfSheets = workbook.getNumberOfSheets();
      for (int i = 0; i < 1; i++) {
        sheet = workbook.getSheetAt(i);
        Iterator<Row> rowIterator = sheet.rowIterator();
        while (rowIterator.hasNext()) {
          Row row = rowIterator.next();
          exceptionRowNumber = row.getRowNum();
          int rowNumber = row.getRowNum();
          if (rowNumber != 0) {
            firstCellNum = row.getFirstCellNum();
            lastCellNum = row.getLastCellNum();
            count = 0;
            Employee employee = new Employee();

            for (; firstCellNum <= lastCellNum; firstCellNum++) {

              Cell cell = row.getCell(firstCellNum);

              if (cell != null && (Cell.CELL_TYPE_BLANK != cell.getCellType())) {
                count++;
                System.err.println("cell value: " + cell);
                switch (firstCellNum) {
                case 0:
                  employee.setEmployeeId((int) cell.getNumericCellValue());
                  break;
                case 1:
                  employee.setFirstName(cell.getStringCellValue());
                  break;
                case 2:
                  employee.setLastName(cell.getStringCellValue());
                  break;
                case 3:
                  System.err.println("date of birth(cell): " + cell);

                  try {
                    Date strDate = cell.getDateCellValue();
                    logger.info("Date of birth as String: " + strDate);
                    employee.setDob(strDate);
                  } catch (IllegalStateException exception) {
                    logger.info("exception during getting dob as String type");
                    logger.info(
                        "dob exception class (illegal state exception): " + exception.getClass());
                    exceptionColNumber = cell.getColumnIndex();
                    logger.info("exception row number: " + exceptionRowNumber
                        + " exception column number: " + exceptionColNumber);
                    // exception.printStackTrace();
                    return JsonUtility
                        .convertToJson((exceptionRowNumber + 1) + "." + (exceptionColNumber + 1));
                  }
                  break;
                case 4:
                  employee.setMobileNo(String.valueOf((long) cell.getNumericCellValue()));
                  break;
                case 5:
                  employee.setEmailId(cell.getStringCellValue());
                  break;
                case 6:
                  employee.setDesignation(cell.getStringCellValue());
                  break;
                case 7:
                  employee.setRollId((int) cell.getNumericCellValue());
                  break;
                case 8:
                  employee.setStatus(String.valueOf((int) cell.getNumericCellValue()));
                  break;
                case 9:
                  employee.setDeptId((int) cell.getNumericCellValue());
                  break;
                default:
                  System.out.println("switch default: " + firstCellNum);
                  break;
                }

              } else
                logger.info("null or blank cell");

            }
            System.out.println("employee object: " + employee);
            if (count > 0) {
              int id = manageUserDAO.saveEmployee(employee);
              if (id == 1) {
                EncryptedEmployee encEmp = new EncryptedEmployee();
                encEmp.setEmployeeId(employee.getEmployeeId());
                encEmp.setEncryptedPassword(
                    EncryptionUtility.encryptString(String.valueOf(employee.getEmployeeId())));
                manageUserDAO.saveEncryptedEmployee(encEmp);
              }

            }

          }
          /* workbook.close(); */

        }
      }
    } catch (HibernateException e) {

      logger.error("hibernate exception class: " + e.getCause());
      logger.info("exception line numbers: row: " + (exceptionRowNumber + 1));
      return JsonUtility.convertToJson(String.valueOf(exceptionRowNumber + 1));
    } catch (Exception e) {
      logger.error("exception e : " + e);
      logger.info("exception cause: " + e.getCause());
      logger.info("exception line numbers: row: " + (exceptionRowNumber + 1));
      /* e.printStackTrace(); */
      return JsonUtility.convertToJson(String.valueOf(exceptionRowNumber + 1));
    }

    return JsonUtility.convertToJson("0.0");

  }

}

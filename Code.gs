function doPost(e) {
  try {
    if (!e.postData) {
      throw new Error('No post data');
    }
    
    var sheet = SpreadsheetApp.openById("1nWwaE4AEPipzdQ_c_JOSn1dfc3a7bOYdAltUfNYmsBE").getSheetByName("Sheet1");
    
    var data = JSON.parse(e.postData.contents);
    
    var newRow = [
      data.fullname,
      data.phone,
      data.email,
      data.date,
      data.time,
      data.service
    ];
    
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.message}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

import { google } from "googleapis";
import { orderToSheetRow, spreadsheetHeaders, type OrderRecord } from "@/lib/order";

function getSheetRange(tabName: string, cellRange: string) {
  const escapedTabName = tabName.replace(/'/g, "''");
  return `'${escapedTabName}'!${cellRange}`;
}

const ORDER_STATUS_OPTIONS = [
  "New Order",
  "Order Confirmed",
  "Order Ongoing",
  "Delivered",
  "Cancelled"
];

async function getSheetIdByTitle(args: {
  sheets: ReturnType<typeof google.sheets>;
  spreadsheetId: string;
  tabName: string;
}) {
  const spreadsheet = await args.sheets.spreadsheets.get({
    spreadsheetId: args.spreadsheetId,
    fields: "sheets(properties(sheetId,title))"
  });

  const matchedSheet = spreadsheet.data.sheets?.find(
    (sheet) => sheet.properties?.title === args.tabName
  );

  if (!matchedSheet?.properties?.sheetId && matchedSheet?.properties?.sheetId !== 0) {
    throw new Error(`Could not find a sheet tab named "${args.tabName}".`);
  }

  return matchedSheet.properties.sheetId;
}

async function applyPremiumSheetFormatting(args: {
  sheets: ReturnType<typeof google.sheets>;
  spreadsheetId: string;
  sheetId: number;
}) {
  await args.sheets.spreadsheets.batchUpdate({
    spreadsheetId: args.spreadsheetId,
    requestBody: {
      requests: [
        {
          updateSheetProperties: {
            properties: {
              sheetId: args.sheetId,
              gridProperties: {
                frozenRowCount: 1
              }
            },
            fields: "gridProperties.frozenRowCount"
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: args.sheetId,
              dimension: "COLUMNS",
              startIndex: 0,
              endIndex: 13
            },
            properties: {
              pixelSize: 170
            },
            fields: "pixelSize"
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: args.sheetId,
              dimension: "COLUMNS",
              startIndex: 0,
              endIndex: 1
            },
            properties: {
              pixelSize: 150
            },
            fields: "pixelSize"
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: args.sheetId,
              dimension: "COLUMNS",
              startIndex: 3,
              endIndex: 4
            },
            properties: {
              pixelSize: 140
            },
            fields: "pixelSize"
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: args.sheetId,
              dimension: "COLUMNS",
              startIndex: 7,
              endIndex: 10
            },
            properties: {
              pixelSize: 120
            },
            fields: "pixelSize"
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: args.sheetId,
              dimension: "COLUMNS",
              startIndex: 10,
              endIndex: 13
            },
            properties: {
              pixelSize: 150
            },
            fields: "pixelSize"
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: args.sheetId,
              dimension: "ROWS",
              startIndex: 0,
              endIndex: 1
            },
            properties: {
              pixelSize: 42
            },
            fields: "pixelSize"
          }
        },
        {
          repeatCell: {
            range: {
              sheetId: args.sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 13
            },
            cell: {
              userEnteredFormat: {
                backgroundColorStyle: {
                  rgbColor: {
                    red: 0.06,
                    green: 0.3,
                    blue: 0.22
                  }
                },
                horizontalAlignment: "CENTER",
                verticalAlignment: "MIDDLE",
                wrapStrategy: "WRAP",
                textFormat: {
                  foregroundColorStyle: {
                    rgbColor: {
                      red: 1,
                      green: 1,
                      blue: 1
                    }
                  },
                  fontSize: 10,
                  bold: true
                }
              }
            },
            fields:
              "userEnteredFormat(backgroundColorStyle,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy)"
          }
        },
        {
          repeatCell: {
            range: {
              sheetId: args.sheetId,
              startRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 13
            },
            cell: {
              userEnteredFormat: {
                backgroundColorStyle: {
                  rgbColor: {
                    red: 1,
                    green: 0.985,
                    blue: 0.955
                  }
                },
                verticalAlignment: "MIDDLE",
                wrapStrategy: "WRAP",
                textFormat: {
                  foregroundColorStyle: {
                    rgbColor: {
                      red: 0.18,
                      green: 0.22,
                      blue: 0.27
                    }
                  },
                  fontSize: 10
                }
              }
            },
            fields:
              "userEnteredFormat(backgroundColorStyle,textFormat,verticalAlignment,wrapStrategy)"
          }
        },
        {
          repeatCell: {
            range: {
              sheetId: args.sheetId,
              startRowIndex: 1,
              startColumnIndex: 8,
              endColumnIndex: 10
            },
            cell: {
              userEnteredFormat: {
                numberFormat: {
                  type: "NUMBER",
                  pattern: "\"Rs. \"#,##0"
                },
                horizontalAlignment: "RIGHT",
                textFormat: {
                  bold: true,
                  foregroundColorStyle: {
                    rgbColor: {
                      red: 0.08,
                      green: 0.39,
                      blue: 0.29
                    }
                  }
                }
              }
            },
            fields: "userEnteredFormat(numberFormat,horizontalAlignment,textFormat)"
          }
        },
        {
          repeatCell: {
            range: {
              sheetId: args.sheetId,
              startRowIndex: 1,
              startColumnIndex: 7,
              endColumnIndex: 8
            },
            cell: {
              userEnteredFormat: {
                horizontalAlignment: "CENTER",
                numberFormat: {
                  type: "NUMBER",
                  pattern: "0"
                }
              }
            },
            fields: "userEnteredFormat(horizontalAlignment,numberFormat)"
          }
        },
        {
          repeatCell: {
            range: {
              sheetId: args.sheetId,
              startRowIndex: 1,
              startColumnIndex: 11,
              endColumnIndex: 12
            },
            cell: {
              dataValidation: {
                condition: {
                  type: "ONE_OF_LIST",
                  values: ORDER_STATUS_OPTIONS.map((option) => ({ userEnteredValue: option }))
                },
                strict: true,
                showCustomUi: true
              }
            },
            fields: "dataValidation"
          }
        },
        {
          setBasicFilter: {
            filter: {
              range: {
                sheetId: args.sheetId,
                startRowIndex: 0,
                startColumnIndex: 0,
                endColumnIndex: 13
              }
            }
          }
        }
      ]
    }
  });
}

export async function appendOrderToGoogleSheet(args: {
  sheetId: string;
  tabName: string;
  clientEmail: string;
  privateKey: string;
  order: OrderRecord;
}) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: args.clientEmail,
      private_key: args.privateKey
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });
  const sheetTabId = await getSheetIdByTitle({
    sheets,
    spreadsheetId: args.sheetId,
    tabName: args.tabName
  });
  const headerRange = getSheetRange(args.tabName, "A1:M1");
  const appendRange = getSheetRange(args.tabName, "A:M");
  const existingHeader = await sheets.spreadsheets.values.get({
    spreadsheetId: args.sheetId,
    range: headerRange
  });

  if (!existingHeader.data.values || existingHeader.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: args.sheetId,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: {
        values: [spreadsheetHeaders()]
      }
    });
  }

  await applyPremiumSheetFormatting({
    sheets,
    spreadsheetId: args.sheetId,
    sheetId: sheetTabId
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: args.sheetId,
    range: appendRange,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [orderToSheetRow(args.order)]
    }
  });
}

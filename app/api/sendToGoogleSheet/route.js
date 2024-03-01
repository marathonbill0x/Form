// app/api/sendToGoogleSheet/route.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library'

export async function POST(req, res) {
  try {
    const body = await req.json()
    const {username, packageName, tshirtSize, address, email, subscribe, release } = body
    console.log(release)
    const SCOPES = [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
    ];

    const { key } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY)

    // Authenticate with the Google Sheets API
    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: key,
      scopes: SCOPES,
    });
    let doc;
    console.log(tshirtSize)
    if(release == 1) {
      doc = new GoogleSpreadsheet('14zTvdquPQTNeAqqp3_8oxvpZN0Jp-vvYUJJCsULNhPc', jwt)
    } else if (release == 2){
      doc = new GoogleSpreadsheet('1zJAwOVFTApPr-ykgYe17KCJTmNtBUtkHgsxWbt5J_qg', jwt)
    } else if (release == 3){
      doc = new GoogleSpreadsheet('1G1piSJ8UK50YKEmtqJAB42umCQ9vZxtKk_xM2_VLfWQ', jwt)
    }
    

    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    // Add a row with the form data
    const result = await sheet.addRow({
      Username: username,
      Name: packageName,
      ShirtSize: tshirtSize,
      Address: address,
      Email: email,
      Subscribed: subscribe ? 'Yes' : 'No',
    });

    // Return a JSON response
    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update Google Sheet', details: error.toString() }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
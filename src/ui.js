import {fetchCompanies} from "./api";
import {
  ACCOUNT_EXECUTIVE_FIELD_NAME,
  COMPANIES_TABLE_HEADERS,
  COMPANY_NAME_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  REVENUE_YTD_FIELD_NAME,
  STATUS_FIELD_NAME
} from "./constants";

export const makeTable = async () => {
  const companies = await fetchCompanies();
  // Print result of api call to the developer console
  // Uncomment if you need it for debugging.
  // While this method of logging variables of interest to the console is primitive, but often highly valuable debugging technique
  // console.log(companies);

  // Initialize new array and push a header row
  const companiesToDisplay = [];
  companiesToDisplay.push(COMPANIES_TABLE_HEADERS);

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map(company => {
    const row = [];
    const readableDate = () => { //creates local readable time
      let iso = company[CREATED_AT_FIELD_NAME];      
      const date = new Date(iso);
      return date.getHours() + ":" + date.getMinutes();
    }

    //take the rev number and add a space every 3 integers
    let moneyArr = [];
    const rev = company[REVENUE_YTD_FIELD_NAME].toString();
    let count = 0;
    for (let i = rev.length - 1; i >= 0; i--) { 
      moneyArr.unshift(rev[i]);
      count++;
      if (count % 3 == 0) {
        moneyArr.unshift(" ")
      }
    }

    // let readableDate = company[CREATED_AT_FIELD_NAME].substring(11, 16); //creates universal readable time. May be too simple a solution
    row.push(
      company[COMPANY_NAME_FIELD_NAME],
      company[STATUS_FIELD_NAME],
      readableDate(), //returns readable time instead of api's company[CREATED_AT_FIELD_NAME]
      // readableDate, //returns readable time instead of api's company[CREATED_AT_FIELD_NAME]
      moneyArr.join(''), //returns readable number instead of api's company[REVENUE_YTD_FIELD_NAME]
      company[ACCOUNT_EXECUTIVE_FIELD_NAME]
    );
    companiesToDisplay.push(row);
  });

  // Programmatically create html table
  const table = document.createElement("table");
  document.body.appendChild(table); // Drew the main table node on the document

  companiesToDisplay.forEach(row => {
    const tr = table.insertRow(); //Create a new row

    row.forEach(column => {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};
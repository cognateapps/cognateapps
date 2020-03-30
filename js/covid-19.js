function toTitleCase(in_camelCaseString) {
  var result = in_camelCaseString                         // "ToGetYourGEDInTimeASongAboutThe26ABCsIsOfTheEssenceButAPersonalIDCardForUser456InRoom26AContainingABC26TimesIsNotAsEasyAs123ForC3POOrR2D2Or2R2D"
           .replace(/([a-z])([A-Z][a-z])/g, "$1 $2")           // "To Get YourGEDIn TimeASong About The26ABCs IsOf The Essence ButAPersonalIDCard For User456In Room26AContainingABC26Times IsNot AsEasy As123ForC3POOrR2D2Or2R2D"
           .replace(/([A-Z][a-z])([A-Z])/g, "$1 $2")           // "To Get YourGEDIn TimeASong About The26ABCs Is Of The Essence ButAPersonalIDCard For User456In Room26AContainingABC26Times Is Not As Easy As123ForC3POOr R2D2Or2R2D"
           .replace(/([a-z])([A-Z]+[a-z])/g, "$1 $2")          // "To Get Your GEDIn Time ASong About The26ABCs Is Of The Essence But APersonal IDCard For User456In Room26AContainingABC26Times Is Not As Easy As123ForC3POOr R2D2Or2R2D"
           .replace(/([A-Z]+)([A-Z][a-z][a-z])/g, "$1 $2")     // "To Get Your GEDIn Time A Song About The26ABCs Is Of The Essence But A Personal ID Card For User456In Room26A ContainingABC26Times Is Not As Easy As123ForC3POOr R2D2Or2R2D"
           .replace(/([a-z]+)([A-Z0-9]+)/g, "$1 $2")           // "To Get Your GEDIn Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456In Room 26A Containing ABC26Times Is Not As Easy As 123For C3POOr R2D2Or 2R2D"

           // Note: the next regex includes a special case to exclude plurals of acronyms, e.g. "ABCs"
           .replace(/([A-Z]+)([A-Z][a-rt-z][a-z]*)/g, "$1 $2") // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456In Room 26A Containing ABC26Times Is Not As Easy As 123For C3PO Or R2D2Or 2R2D"
           .replace(/([0-9])([A-Z][a-z]+)/g, "$1 $2")          // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456In Room 26A Containing ABC 26Times Is Not As Easy As 123For C3PO Or R2D2Or 2R2D"

           // Note: the next two regexes use {2,} instead of + to add space on phrases like Room26A and 26ABCs but not on phrases like R2D2 and C3PO"
           .replace(/([A-Z]{2,})([0-9]{2,})/g, "$1 $2")        // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456 In Room 26A Containing ABC 26 Times Is Not As Easy As 123 For C3PO Or R2D2 Or 2R2D"
           .replace(/([0-9]{2,})([A-Z]{2,})/g, "$1 $2")        // "To Get Your GED In Time A Song About The 26 ABCs Is Of The Essence But A Personal ID Card For User 456 In Room 26A Containing ABC 26 Times Is Not As Easy As 123 For C3PO Or R2D2 Or 2R2D"
           .trim();


 // capitalize the first letter
 return result.charAt(0).toUpperCase() + result.slice(1);
}

function CreateTableFromJSON() {
//ajax_get('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole', function(data) {
ajax_get('http://app.cognateapps.in:8080/covid19-api/india', function(data) {
var myResult =data

// EXTRACT VALUE FOR HTML HEADER.
// ('Book ID', 'Book Name', 'Category' and 'Price')
var col = [];
for (var i = 0; i < myResult.length; i++) {
 for (var key in myResult[i]) {
     if (col.indexOf(key) === -1) {
         col.push(key);
     }
 }
}

// CREATE DYNAMIC TABLE.
var table = document.createElement("table");
table.setAttribute("class", "table");

// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

var tr = table.insertRow(-1);                   // TABLE ROW.

for (var i = 0; i < col.length; i++) {
 var th = document.createElement("th");      // TABLE HEADER.
 th.innerHTML = toTitleCase( col[i]);
 tr.appendChild(th);
}

// ADD JSON DATA TO THE TABLE AS ROWS.
for (var i = 0; i < myResult.length; i++) {

 tr = table.insertRow(-1);

 for (var j = 0; j < col.length; j++) {
     var tabCell = tr.insertCell(-1);
     tabCell.innerHTML = myResult[i][col[j]];
 }
}

// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
var divContainer = document.getElementById("showData");
divContainer.innerHTML = "";
divContainer.appendChild(table);
})
}



function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {

              var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };


    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

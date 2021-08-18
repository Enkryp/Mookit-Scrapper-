

/*
// helper func starts (json to csv)

thnx https://gist.github.com/dannypule/48418b4cd8223104c6c92e3016fc0f61 
---------------------------------------------------------------------------------------
*/

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

var headers = {
    name: 'Lecture Name'.replace(/,/g, ''), // remove commas to avoid errors
    week: "Week #",
    link: "Lecture Link"
   
};

// helper func ends

//-----------------------------------------------------------------------------------------------


function fire() {

    // main function-----------------------------
    var weeks = document.getElementsByClassName("weekWrapperTitle");
    var weekLen = weeks.length;
    var weekCur = 0;
    var lecs = document.querySelectorAll("a[href^='#/lecture/']");


    scrap = [];

    for (var i = 0; i < lecs.length; i++) {
        var lec = lecs[i];


        if (weekCur != weekLen - 1) {
            if (lec.compareDocumentPosition(weeks[weekCur + 1]) & Node.DOCUMENT_POSITION_FOLLOWING) {
                ; // 
            } else {
                weekCur += 1;
            }
        }


        var a = 17+ lec.href.search("hello.iitk.ac.in/");

        var b = lec.href.search("/#/lecture/")-a;
        
        var c = "https://d3i96zfsvt175x.cloudfront.net/" + lec.href.substr(a,b)+"/"+ "videos/original/" + lec.href.substr(b+a+11,lec.href.length-b-a-11) + ".mp4"
        let temp = { name: lec.innerHTML.trim(), week: weeks[weekCur].innerHTML, link: c };
        scrap.push(temp);


    }





    //toCSV 



    var itemsFormatted = [];

    // format the data
    scrap.forEach((item) => {
        itemsFormatted.push({
            name: item.name.replace(/,/g, ''), // remove commas to avoid errors,
            week: item.week,
            link: item.link
        });
    });

    var fileTitle = 'scrap'; // or 'my-unique-title'

    exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download




}




//ex

setTimeout(() => {
    var a = document.getElementsByClassName("profileDetailsData");

    var para = document.createElement("A");
    var brk = document.createElement("BR");
    para.innerHTML = "Scrape";
    para.onclick = fire;
    if (a.length == 0) return;
    a[0].appendChild(brk);
    a[0].appendChild(para);
}, 500);




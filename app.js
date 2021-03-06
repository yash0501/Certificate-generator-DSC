const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");

// var currentTime = new Date();
// var month = currentTime.getMonth()+1;
// var day = currentTime.getDate();
// var year = currentTime.getFullYear();
// var dateString= month + "/" + day + "/" + year;



const { PDFDocument, rgb, degrees } = PDFLib;

function leftTimeDisplay(){
  var sec;
  var min;
  var hrs;
  var timeNow = new Date();
  var timeStop = new Date();
  timeStop.setTime(1602336599000);
  var miliSecLeft = timeStop - timeNow;
  var secLeft = parseInt(miliSecLeft/1000);
  var minLeft = parseInt(secLeft/60);
  var hrLeft = parseInt(minLeft/60);
  if(miliSecLeft<0){
    document.getElementById("left").innerText = "Wait for the next workshop. Wishing to see you there";
  }
  else{
    if(secLeft%60<10){
      sec = "0" + secLeft%60;
    }
    else{
      sec = secLeft%60;
    }
    if(minLeft%60<10){
      min = "0" + minLeft%60;
    }
    else{
      min = minLeft%60;
    }
    if(hrLeft<10){
      hrs = "0" + hrLeft;
    }
    else{
      hrs = hrLeft;
    }
    document.getElementById("tleft").innerText = hrs + " : " + min + " : " + sec;
  }
}

  var timeNow = new Date();
  var timeStop = new Date();
  timeStop.setTime(1602336599000);
  var miliSecLeft = timeStop - timeNow;

    if(miliSecLeft>0){
    const { PDFDocument, rgb, degrees } = PDFLib;
    const capitalize = (str, lower = false) =>
      (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase()
      );

    submitBtn.addEventListener("click", () => {
      const val = capitalize(userName.value);

      //check if the text is empty or not
      if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val);
      } else {
        userName.reportValidity();
      }
    });
    submitBtn.addEventListener("click", () => {
      submitBtn.innerText = "Generating Your Certificate";
      submitBtn.style.color = "white";
      submitBtn.style.backgroundColor = "#485998";
    });
    const generatePDF = async (name) => {
      const existingPdfBytes = await fetch("./certificate1.pdf").then((res) =>
        res.arrayBuffer()
      );

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);

      //get font
      const fontBytes = await fetch("./BASKVILL.TTF").then((res) =>
        res.arrayBuffer()
      );

      // Embed our custom font in the document
      const BaskervilleFont = await pdfDoc.embedFont(fontBytes);

      // Get the first page of the document
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Draw a string of text diagonally across the first page
      firstPage.drawText(name, {
        x: 345,
        y: 320,
        size: 26,
        font: BaskervilleFont,
        color: rgb(0.23,0.27,0.29),
      });
      firstPage.drawText("Web Development",{
        x: 355,
        y: 283,
        size: 22,
        font : BaskervilleFont,
        color: rgb(0.23,0.27,0.29),
      });
      firstPage.drawText("October 10, 2020",{
        x: 540,
        y: 247,
        size: 22,
        font: BaskervilleFont,
        color: rgb(0.23,0.27,0.29),
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();
      console.log("Done creating");

      // this was for creating uri and showing in iframe

      // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      // document.getElementById("pdf").src = pdfDataUri;

      var file = new File(
        [pdfBytes],
        "DSC Certificate.pdf",
        {
          type: "application/pdf;charset=utf-8",
        }
      );
    saveAs(file);
    transition();
    };
    function transition(){
    submitBtn.innerText = "Get your Certificate";
    submitBtn.style.color = "white";
    submitBtn.style.backgroundColor = "#8bc34a";
    }
  }
else{
  console.log("Time's Up");
}

leftTimeDisplay();
setInterval(leftTimeDisplay, 1000);

// init();

//Preloader code start
let preloader = document.getElementById("loader_page");
function fLoad(){
  preloader.style.display = 'none';
}

//
function openNav() {

  if(document.getElementById('mobile__menu').className=="overlay"){
    // document.getElementById("mobile__menu").classList.remove('overlay'); 
    document.getElementById("mobile__menu").classList.add('overlay_clicked');
       document.getElementById('menu').innerText='close';
       document.getElementById('menu').style.backgroundColor='#17a2b8';
       document.getElementById('menu').style.opacity='.7';
       document.getElementById('menu').style.color='white';
       document.getElementById('menu').style.borderColor='#17a2b8';


  }

  else{
       document.getElementById("mobile__menu").classList.remove('overlay_clicked');  
       document.getElementById("mobile__menu").classList.add('overlay');
       document.getElementById('menu').innerText='menu';
       document.getElementById('menu').style.backgroundColor='white';
       document.getElementById('menu').style.color='black';

  }

}

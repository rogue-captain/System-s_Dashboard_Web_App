//JavaScript for 4020 Dashboard page

 

// IMPORTED LIBRARIES

 

 

 

//---------------------------------------------------------

 

 

 

               

//<!-- JS VARIABLES ---------------------------------------->

 

                var pokemonImageArray = [];

 

                var randomIndexNumber = 0;

               

                var path = 'pokemonFolder/';

                               

 

 

//<!-- JS VARIABLES ---------------------------------------->

 

 

 

 

//-------------------------- JS for drop menus from nav bar --------------------------------

function dropMenus() {

                document.getElementById('WalmartDropDown').addEventListener('click', function() {

                var menu = document.getElementById('walmart-dropdown-menu');

                menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';

});

 

 

 

document.getElementById('LineageDropDown').addEventListener('click', function() {

                var menu2 = document.getElementById('lineage-dropdown-menu');

                menu2.style.display = (menu2.style.display === 'block') ? 'none' : 'block';

});

 

 

 

document.getElementById('ToolsDropDown').addEventListener('click', function() {

                var menu3 = document.getElementById('tools-dropdown-menu');

                menu3.style.display = (menu3.style.display === 'block') ? 'none' : 'block';

});

}

//-------------------------- JS for DROP MENUS from nav bar --------------------------------

 

 

 

//----------------------------- Functions for POKEMON of the day ----------------------------------

 

function startup() <!-- -->

{

pokemonImageArray[0] = new Image();

pokemonImageArray[0].src = path + "pokemon1.jfif";

 

pokemonImageArray[1] = new Image();

pokemonImageArray[1].src = path + "Pokemon2.jfif";

 

pokemonImageArray[2] = new Image();

pokemonImageArray[2].src = path + "pokemon3.gif";

 

pokemonImageArray[3] = new Image();

pokemonImageArray[3].src = path + "pokemon4.gif";

 

pokemonImageArray[4] = new Image();

pokemonImageArray[4].src = path + "pokemon5.gif";

 

pokemonImageArray[5] = new Image();

pokemonImageArray[5].src = path + "pokemon6.gif";

 

pokemonImageArray[6] = new Image();

pokemonImageArray[6].src = path + "pokemon7.gif";

 

pokemonImageArray[7] = new Image();

pokemonImageArray[7].src = path + "pokemon8.gif";

 

pokemonImageArray[8] = new Image();

pokemonImageArray[8].src = path + "pokemon9.png";

 


     /*// Check if images have loaded properly          <----- DEBUGGING LINES

    pokemonImageArray.forEach(function(image) {

        image.onload = function() {

            alert(image.src + " loaded successfully.");

        };

        image.onerror = function() {

            alert("Error loading " + image.src);

        };

    });

}*/

 

return;

}

 

function randomPokemonSelector() {

 

                /*var pokemonImageArray = [

                Database + '\pokemonImg1.jfif'

                ]; */

               

                /*    if (pokemonImageArray.length === 0) {//DEBUGGING LINE

        alert("Image array is empty. Make sure 'startup()' is called first.");//DEBUGGING LINE

                               

    } else {//DEBUGGING LINE

                               

        alert("Image array load successful //DEBUGGING LINE ");//DEBUGGING LINE

 

    }//DEBUGGING LINE */

               

               

                //var randomIndexNumber = Math.floor(Math.random());

               

                var randomIndexNumber = Math.floor(Math.random() * pokemonImageArray.length);

               

                //var randomPokemonPic = pokemonImageArray[randomIndexNumber].src;

               

               

                //document.getElementById('pokemonTestText').textContent = randomIndexNumber; //DEBUGGING LINE

               

                document.pokemonOfTheDay.src = pokemonImageArray[randomIndexNumber].src;

               

               

                return;

}             

 

 

 

 

//----------------------------- Functions for BULLETIN BOARD ----------------------------------

function bulletinBoard() {

                //var readFile = getFile('systemsBulletinBoard.txt')

               

                fetch('')

                                .then(response => response.text())

                                .then(data => {

                                                document.getElementById('SystemsBulletinBoard').innerText = data;

                                })

                               

                                .catch(err => alert("Error loading the bulletin board:", err));

}

 

 

 

function saveContent() {

               

  // Get the text from the contenteditable div

  const updatedText = document.getElementById('SystemsBulletinBoard').innerText; // or .innerHTML

 

  // Send the updated text to your backend API

  fetch('http://localhost:3000/api/update-file', {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json'

    },

    body: JSON.stringify({ text: updatedText }) // Send the updated text as JSON

  })

  .then(response => response.json())

  .then(data => {

    console.log('File updated!', data);

  })

  .catch(error => {

    console.error('Error:', error);

  });

}

 

//----------------------------- Functions for BULLETIN BOARD ----------------------------------

 

 

 

 

 

 

 

 

//----------------------------- Functions for DATE BANNER ; CREDIT: Paul Cruze----------------------------------

 

function dateBanner() {

               

  const today = new Date(), week = Math.floor((today - new Date(today.getFullYear(), 0, 1)) / (1000 * 3600 * 24 * 7)) + 1,

  totalWeeks = Math.ceil((new Date(today.getFullYear(), 11, 31) - new Date(today.getFullYear(), 0, 1)) / (1000 * 3600 * 24 * 7)),

  julianDate = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000) ,

  quarter = `Q${Math.floor(today.getMonth() / 3) + 1}`;

 

  document.getElementById("dateBanner").innerHTML = `Date: ${today.toLocaleString('default', { weekday: 'long' })}, 

  ${today.toLocaleString('short', { month: 'short' })} ${today.getDate()}${["st", "nd", "rd"][(today.getDate() % 10)] || "th"}  

  ${today.getFullYear()} - Julian Date:  ${julianDate}

  - Fiscal ${quarter}`;

}

 

//----------------------------- Functions for DATE BANNER ----------------------------------

 

 

 

 

 

 

//----------------------------- Functions for systems schedule ----------------------------------

 

/*async function fetchAndDisplayExcel() {

               

    const url = ‘’;

               

try {

        // Alert with the URL to check if it's correct

        alert('Attempting to fetch Excel file from: ' + url);

 

        // Fetch the Excel file from the URL

        const response = await fetch(url);

       

        // Check if the response is successful

        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);

        }

       

        alert('Excel file fetched successfully');  // Alert to confirm file fetch

 

        const arrayBuffer = await response.arrayBuffer();

 

        // Use SheetJS to read the Excel file

        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

 

        // Assuming we are displaying the first sheet

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

 

        // Convert the sheet to JSON (array of objects)

        const data = XLSX.utils.sheet_to_json(worksheet);

 

        // Create a table to display the contents

        let tableHTML = '<table border="1" style="width: 100%; border-collapse: collapse;">';

 

        // Add headers to the table

        tableHTML += '<tr>';

        Object.keys(data[0]).forEach(key => {

            tableHTML += `<th style="padding: 8px; text-align: left;">${key}</th>`;

        });

        tableHTML += '</tr>';

 

        // Add rows to the table

        data.forEach(row => {

            tableHTML += '<tr>';

            Object.values(row).forEach(value => {

                tableHTML += `<td style="padding: 8px;">${value}</td>`;

            });

            tableHTML += '</tr>';

        });

        tableHTML += '</table>';

 

        // Insert the table into the 'SystemsScheduleImage' div

        document.getElementById('SystemsScheduleImage').innerHTML = tableHTML;

    } catch (error) {

                               

        // Alert to show an error message instead of console.log

                               

        alert("Error loading the Systems Schedule data: " + error.message);

                               

        // Fallback content in case of an error

        document.getElementById('SystemsScheduleImage').innerHTML = '<p>Error loading the Systems Schedule data.</p>';

    }

}

*/

 

document.getElementById('fileInput').addEventListener('change', handleFile, false);

 

        function handleFile(event) {

            const file = event.target.files[0];

            if (!file) return;

 

            const reader = new FileReader();

            reader.onload = function(e) {

                const data = new Uint8Array(e.target.result);

                const workbook = XLSX.read(data, { type: 'array' });

 

                // Assuming we're dealing with the first sheet

                const sheet = workbook.Sheets[workbook.SheetNames[0]];

                const html = XLSX.utils.sheet_to_html(sheet);

               

                // Display the content in a table

                document.getElementById('excelTable').innerHTML = html;

            };

 

            reader.readAsArrayBuffer(file);

        }

 


//----------------------------- Functions for systems schedule ----------------------------------

 

 

 

 

 

 

 

window.onload = function() {

                dropMenus();

                startup();

                dateBanner();

                randomPokemonSelector();

                bulletinBoard();

                //fetchAndDisplayExcel();

}
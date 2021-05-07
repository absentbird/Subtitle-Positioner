(function() {
  document.getElementById("convert").disabled = true;

  function removerow(event) {
    event.srcElement.closest("tr").remove();
  }

  var srtfile = 'captions.srt';
  document.querySelector('#srtupload').addEventListener('change', handleSrtUpload, false);
  document.querySelector('#timingupload').addEventListener('change', handleCsvUpload, false);
  document.querySelector('#add-row').addEventListener('click', addPositioningRow, false);
  document.querySelector('#convert').addEventListener('click', downloadVtt, false);
  document.querySelector('.delete-row').addEventListener('click', removerow, false);
  document.body.addEventListener( 'click', function ( event ) {
    if(event.srcElement.classList.contains('delete-row')) {
      removerow(event);
    };
  });
  var srtreader = new FileReader();
  srtreader.onload = handleSrtRead;
  var csvreader = new FileReader();
  csvreader.onload = handleCsvRead;

  function handleSrtUpload(event) {
    var file = event.target.files[0];
    reader.readAsText(file);
    document.getElementById("convert").disabled = false;
  }

  function handleCsvUpload(event) {
    var file = event.target.files[0];
    csvreader.readAsText(file);
  }

  function handleSrtRead(event) {
    var save = event.target.result;
    window.localStorage.setItem(srtfile, save);
  }

  function handleCsvRead(event) {
    Papa.parse(event.target.result, {
      step: function(row) {
        console.log("Row:", row.data);
      },
      complete: function() {
        console.log("Done processing CSV timings.");
      }
    });
  }

  var rowcount = 1;
  var c1blank = document.getElementById('start1');
  var c2blank = document.getElementById('stop1')
  var c3blank = document.getElementById('position1')
  
  function addPositioningRow(event) {
    row = document.querySelector('#timingtable').insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    rowcount++;
    cell1.appendChild(c1blank.cloneNode(true));
    cell1.id = "start"+rowcount;
    cell2.appendChild(c2blank.cloneNode(true));
    cell2.id = "stop"+rowcount;
    cell3.appendChild(c3blank.cloneNode(true));
    cell3.id = "position"+rowcount;
    cell4.innerHTML = '<button class="delete-row">❌</button>';
    row.append
  }

  function getsrt() {
    return localStorage.getItem(srtfile);
  }

  function downloadVtt(event) {
    console.log(getsrt());
  }

})();
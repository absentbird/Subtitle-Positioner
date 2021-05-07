## Add positioning to SRT subtitles for Youtube

Youtube uses VTT files for subtitles with enhanced features such as positioning. If you have an SRT file, but you'd like to position the subtitles, you can use this tool to add positioning information.

### Upload SRT

This is the base subtitle file, it's essentially just a text file with timings for the captioning.

<label for="srtfile">SRT file:</label>
<input type="file" name="srtfile" id="srtupload">

#### Upload Timing (optional)

To save time you can upload a CSV with positions. It should be formatted as follows:  
start, stop, position  

If recognized, the timings will be loaded into the form below once the file is uploaded.

<label for="timingcsv">CSV timing file:</label>
<input type="file" name="timingcsv" id="timingupload">

### Adjust Positioning

Use this form to adjust the positioning of the subtitles. You can specify start and stop times to allow the subtitles to move to different positions throughout the video.

<table id="timingtable">
<tr><th>Start</th><th>Stop</th><th>Position</th><th></th></tr>
<tr id="firstrow">
<td><input type="text" id="start1" name="start" placeholder="00:01:02.980" size="12" /></td>
<td><input type="text" id="stop1" name="stop" placeholder="00:01:04.630" size="12" /></td>
<td>
  <select id="position1" name="position">
    <option value="top-left">Top Left</option>
    <option value="top-center">Top Center</option>
    <option value="top-right">Top Right</option>
    <option value="middle-right">Middle Left</option>
    <option value="middle-center">Middle Center</option>
    <option value="middle-right">Middle Right</option>
    <option value="bottom-left">Bottom Left</option>
    <option value="bottom-right" selected>Bottom Center</option>
    <option value="bottom-right">Bottom Right</option>
  </select>
</td>
<td><button class="delete-row">❌</button></td>
</tr>
</table>

*leave times blank to effect entire file*

<button id="add-row">Add Row</button>

### Download VTT File

The VTT file will contain the same subtitles, but with added positioning information.

<button id="convert">Download VTT</button>

<script src="papaparse.min.js"></script>
<script>
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
</script>

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
<td><input type="text" id="stop1" name="end" placeholder="00:01:04.630" size="12" /></td>
<td><input type="text" id="position1" name="position" placeholder="left" size="8" /></td>
<td><button class="deleterow" onClick="removerow(this);">❌</button></td>
</tr>
</table>

<button id="add-row">Add Row</button>

### Download VTT File

The VTT file will contain the same subtitles, but with added positioning information.

<button id="convert">Download VTT</button>

<script>
(function() {
  document.getElementById("convert").disabled = true;

  var srtfile = 'captions.srt';
  document.querySelector('#srtupload').addEventListener('change', handleSrtUpload, false);
  document.querySelector('#add-row').addEventListener('click', addPositioningRow, false);

  var reader = new FileReader();
  reader.onload = handleSrtRead;

  function handleSrtUpload(event) {
    var file = event.target.files[0];
    reader.readAsText(file);
    document.getElementById("convert").disabled = false;
  }

  var rowcount = 1;
  function addPositioningRow(event) {
    row = document.querySelector('#timingtable').insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    rowcount++;
    cell1.innerHTML = '<input type="text" id="start'+rowcount+'" name="start" placeholder="00:01:02.980" />';
    cell2.innerHTML = '<input type="text" id="stop'+rowcount+'" name="start" placeholder="00:01:04.630" />';
    cell3.innerHTML = '<input type="text" id="position'+rowcount+'" name="start" placeholder="left" />';
    cell4.innerHTML = '<button class="deleterow" onClick="removerow(this);">❌</button>';
  }
  
  function handleSrtRead(event) {
    var save = JSON.parse(event.target.result);
    window.localStorage.setItem(srtfile, JSON.stringify(save));
  }
  
  function removerow(element) {
    element.closest("tr").remove();
  }

  function getsrt() {
    return JSON.parse(localStorage.getItem(srtfile))
  }

})();
</script>

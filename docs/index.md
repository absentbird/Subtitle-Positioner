## Add positioning to SRT subtitles for Youtube

Youtube uses VTT files for subtitles with enhanced features such as positioning. If you have an SRT file, but you'd like to position the subtitles, you can use this tool to add positioning information.

### Upload SRT

<label for="srtfile">SRT file:</label>
<input type="file" name="srtfile" id="srtupload">

---

An SRT is a basic subtitle file, it's essentially just a text file with timings for the captioning. Most tools support this format, and it's easy to work with. [Learn more about SRT here](https://en.wikipedia.org/wiki/SubRip).

#### Upload Timing (optional)

To save time you can upload a CSV with positions. The file must have three columns: Start, Stop, and Position.

**Start** and **Stop** should be times formatted as hh:mm:ss.sss.

**Position** must be one of the following values: top-left, top-center, top-right, middle-left, middle-center, middle-right, bottom-left, bottom-center, bottom-right

[Here is a sample file](timings.csv) for demonstration.

If recognized, the timings will be loaded into the form below once the csv file is selected.

<label for="timingcsv">CSV timing file:</label>
<input type="file" name="timingcsv" id="timingupload">

---

Most spreadsheets can be exported as a CSV file. Here are some popular options: [LibreOffice Calc](https://help.libreoffice.org/3.3/Calc/Importing_and_Exporting_CSV_Files), [Google Sheets](https://www.organimi.com/how-to-convert-a-csv-file-to-google-sheets/#:~:text=How%20to%20Export%20a%20File,the%20file%20as%20a%20CSV), [Microsoft Excel](https://support.microsoft.com/en-us/office/save-a-workbook-to-text-format-txt-or-csv-3e9a9d6c-70da-4255-aa28-fcacf1f081e6) 

### Adjust Positioning

Use this form to adjust the positioning of the subtitles. You can specify start and stop times to allow the subtitles to move to different positions throughout the video.

<table id="timingtable">
<tr><th>Start</th><th>Stop</th><th>Position</th><th></th></tr>
<tr id="firstrow">
<td><input type="text" id="start1" name="start" placeholder="hh:mm:ss.sss" size="12" /></td>
<td><input type="text" id="stop1" name="stop" placeholder="hh:mm:ss.sss" size="12" /></td>
<td>
  <select id="position1" name="position">
    <option value="top-left">Top Left</option>
    <option value="top-center">Top Center</option>
    <option value="top-right">Top Right</option>
    <option value="middle-left">Middle Left</option>
    <option value="middle-center">Middle Center</option>
    <option value="middle-right">Middle Right</option>
    <option value="bottom-left">Bottom Left</option>
    <option value="bottom-center" selected>Bottom Center</option>
    <option value="bottom-right">Bottom Right</option>
  </select>
</td>
<td><button class="delete-row">❌</button></td>
</tr>
</table>

*leave times blank to affect entire file*

<button id="add-row">Add Row</button>

### Download VTT File

The VTT file will contain the same subtitles, but with added positioning information.

<button id="convert">Download VTT</button>

<!-- Javascript Section -->
<script src="papaparse.min.js"></script>
<script src="script.js"></script>
Option Explicit

Sub ReadingFiles()

Dim FSO As Scripting.FileSystemObject
Dim mainSheet As Worksheet
Dim sourcePath As String
dim destPath As String
Dim fileName As String
Dim sliceDate As Double
Dim dateStr As String
Dim fileDate As Date
Dim fileToFind As String
Dim doesFileExist As Boolean
Dim newFileName As String
Dim lastRow As Integer
'Dim fileToCopy As Object
Dim fileToRename As Object



'Jan
'Feb
'Mar
'Apr
'May
'Jun
'Jul
'Aug
'Sep
'Oct
'Nov
'Dec

Set FSO = New Scripting.FileSystemObject
Set mainSheet = Sheets("main")
lastRow = mainSheet.Cells(Rows.Count, 1).End(xlUp).Row
sourcePath = "C:/Users/danny/Downloads/"

'returns a file name as string if parameters are met
fileToFind = Dir(sourcePath + "Danny_Ceccattini*.pdf")

'returns true if file exists
doesFileExist = FSO.FileExists(sourcePath + fileToFind)

If doesFileExist = True Then

    fileName = FSO.GetFileName(sourcePath + fileToFind)
    
    'getting length of the string from right to left to cut out the name
    sliceDate = Len(fileName) - InStr(fileName, "-")
    'cutting out my name from the file name
    dateStr = Right(fileName, sliceDate)
    'replace parts of the filename to clean it up.
    dateStr = Replace(dateStr, ".pdf", "")
    dateStr = Replace(dateStr, "_", " ")
    
    'If the day is only one digit, append a 0 to the day
    If Len(dateStr) = 10 Then
        dateStr = "0" + dateStr
    End If
    
    fileDate = DateValue(dateStr)
    
    newFileName = "len" + Format(fileDate, "yymmdd")
    
    Debug.Print newFileName
    
    Call FSO.CopyFile(sourcePath + fileName, "C:/Users/danny/Desktop/New folder/")
    
    fileToRename
    
    
Else
    MsgBox "There are no more pay slips"
End If


End Sub

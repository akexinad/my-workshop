<job>
<script language="VBScript">
'''''''''''''''''''''''''''''''''''''''''''''''''
'ADD CODE HERE

Dim str_varName
Dim str_srcPath
Dim str_destPath

str_varName = "this is a text"
str_srcPath = "c:/users/cecd304/Downloads/hello.txt"
str_destPath = "c:/users/cecd304/Downloads/xxx/"

set objFSO = CreateObject("Scripting.FileSystemObject")

' call objFSO.CreateTextFile("c:/users/cecd304/Downloads/hello.txt", True)
Set file = objFSO.CreateTextFile("c:/users/cecd304/Downloads/hello.txt", True)
file.WriteLine(strvarName)
' file.WriteLine( "B" & Year(Now()) & Month(Now()) )
dim date
date = CDate(Now())

'current year and month with a zero to accompany the single digit month
date = DatePart("yyyy", date) & Right("0" & DatePart("m", date), 2)

file.WriteLine(date)
file.Close

call objFSO.Copyfile(str_srcPath, str_destPath, True)

'''''''''''''''''''''''''''''''''''''''''''''''''
WScript.Quit
</script>
</job>
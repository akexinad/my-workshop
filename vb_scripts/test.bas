set objFSO = CreateObject("Scripting.FileSystemObject")

Set a = objFSO.CreateTextFile("c:/users/cecd304/desktop/hello.txt", True)
a.WriteLine("This is a test.")
a.Close

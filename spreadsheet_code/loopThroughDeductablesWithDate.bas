Dim mainSheet As Worksheet
Dim item As Variant
Dim lastRow As Integer
Dim startDate As Date
Dim endDate As Date
Dim i As Integer


Sub CopyDeductables()

    Set mainSheet = Sheets("main")
    lastRow = mainSheet.Range("a" & Rows.Count).End(xlUp).Row
    
    startDate = DateValue("5/7/18")
    endDate = DateValue("26/11/18")
    
    'Debug.Print startDate
    
    For i = 7 To lastRow
        'The InStr method takes three args,
        'the first arg is where you want to start within the string, starting at 1.
        'the second arg is the cell location of the string,
        'finally the substring that you are looking for.
        If DateValue(mainSheet.Cells(i, 1)) < endDate And mainSheet.Cells(i, 5).Value = "Deductable" And InStr(1, mainSheet.Cells(i, 6), "R") <> 0 Then
            
            mainSheet.Cells(i, 12).Value = "NO"
            Debug.Print mainSheet.Cells(i, 12).Value
            
        End If
    Next i
End Sub
Option Explicit
Dim x As Variant
Dim item As Variant

Sub LoopAndDebug()
    
    x = Array("Cat", "Dog", "Rabbit")
    
    For Each item In x
        Debug.Print item
    Next item

End Sub


Option Explicit
Dim theDate As Date
Dim anotherDate As Date

Sub DateAndTimeDisplay()

    'Date format from the sheet value.
    'The format in BASIC remains the same regardless of how you format it on the front
    theDate = Sheets("sheet1").Range("a1").Value
    Debug.Print theDate
    
    anotherDate = Date
    
    'Get current date
    Debug.Print DateValue(Now)
    
    'Get the current time
    Debug.Print Time

    'These dates return true
    If theDate = anotherDate Then
        Debug.Print "YES"
    Else
        Debug.Print "NO"
    End If

End Sub
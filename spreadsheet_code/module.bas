Option Explicit
Dim x As Variant
Dim item As Variant

Sub LoopAndDebug()
    
    x = Array("Cat", "Dog", "Rabbit")
    
    For Each item In x
        Debug.Print item
    Next item

End Sub

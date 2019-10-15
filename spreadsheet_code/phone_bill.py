import os

filename = 'bill.pdf'
src = "C:\\Users\\cecd304\\Downloads\\"
dest = "C:\\Users\\cecd304\\Downloads\\"
# os.chdir("C:\\Users\\cecd304\\Downloads")
files = os.listdir(src)
print(files[0])

# os.rename(src + filename, dest + '2019.pdf')

# print(list)
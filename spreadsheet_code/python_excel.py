import openpyxl
import os

# https://www.youtube.com/watch?v=q6Mc_sAPZ2Y

# print(openpyxl.__version__)

filename = 'pyxl.xlsx'
os.chdir("C:\\Users\\cecd304\\me\\code\\workshop\\spreadsheet_code")

wb = openpyxl.load_workbook(filename)

# print(type(wb))

sheet1 = wb['Sheet1']

sheet1['d4'].value = 'HELLO WORLD'

# wb.save(filename)

# print(sheet1['b1:b7'])

print(sheet1.title)

sheet1.title = 'LALALA'

wb.save(filename)

print(type(sheet1['a1'].value))

# range hs to be from 1 to 5 since the excel rows start from 1 and not 0;
for i in range(1, 5): 
    print(sheet1['a' + str(i)].value)
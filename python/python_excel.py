import openpyxl
import os

# print(openpyxl.__version__)

filename = 'pyxl.xlsx'
os.chdir('c:\\Users\\cecd304\\me\\documents')
wb = openpyxl.load_workbook(filename)

# print(type(wb))

sheet1 = wb['Sheet1']

sheet1['d4'].value = 'HELLO WORLD'

wb.save(filename)

# print(sheet1['b1:b7'])
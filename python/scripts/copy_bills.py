import glob
import ctypes
import os
import shutil
import datetime
import directories

def message_box(title, text, style):
    return ctypes.windll.user32.MessageBoxW(0, text, title, style)

home_bill_id = "62168857738"
mobile_bill_id = "62112630074"

home_bill_collection = glob.glob(directories.downloads + "/" + home_bill_id + "*")
mobile_bill_collection = glob.glob(directories.downloads + "/" + mobile_bill_id + "*")

year = str(datetime.date.today().year)
month = str(datetime.date.today().month)

if (int(month) < 10):
    month = "0" + month

mobile_bill_filename = year + month + ".pdf"
home_bill_filename = "B" + year + month + ".pdf"

def checkCollection(collection):
    if (len(collection) < 1):
        return False
    elif (len(collection) > 1):
        return False
    else:
        return True

valid_home_bill = checkCollection(home_bill_collection)
valid_mobile_bill = checkCollection(mobile_bill_collection)

if (valid_home_bill == True):
    os.rename(home_bill_collection[0], directories.downloads + "/" + home_bill_filename)
    shutil.move(directories.downloads + "/" + home_bill_filename, directories.phone_bills + "/home")
else:
    message_box("error", "home bill not found. See: " + str(home_bill_collection), 1)

if (valid_mobile_bill == True):
    os.rename(mobile_bill_collection[0], directories.downloads + "/" + mobile_bill_filename)
    shutil.move(directories.downloads + "/" + mobile_bill_filename, directories.phone_bills + "/mobile")
else:
    message_box("error", "mobile bill not found. See: " + str(mobile_bill_collection), 1)

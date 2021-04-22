import os
import shutil
import directories

local = directories.app_data + "/Local/Autodesk"
roaming = directories.app_data + "/Roaming/Autodesk"

dest_main = directories.desktop + "/fusion360_file_copies"
dest_local = dest_main + "/local"
dest_roaming = dest_main + "/roaming"

os.makedirs(dest_main)
os.makedirs(dest_local)
os.makedirs(dest_roaming)

shutil.move(local + "/Web Services", dest_local)
shutil.move(local + "/Neutron Platform", dest_local)
shutil.move(roaming + "/Neutron Platform", dest_roaming)

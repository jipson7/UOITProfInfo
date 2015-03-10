import os
import urllib2
import re

URL_BASE = "https://ssbp.mycampus.ca/prod/www_directory.directory_uoit.p_ShowDepartment?department_name_in="

URL_LIST = ["U1", "U2", "7519", "U3", "U4", "U7", "14111"]


for item in URL_LIST:

	URL = URL_BASE + URL_LIST

	bashCommand = ('wget -0 - ' + URL + ' >> profList.txt')

	os.system(bashCommand)

import os
import urllib2
import re

URL_BASE = "https://ssbp.mycampus.ca/prod/www_directory.directory_uoit.p_ShowDepartment?department_name_in="

URL_LIST = ["U1", "U2", "7519", "U3", "U4", "U7", "14111"]

profList = []

def parseNames(page):

	global profList

	nameRegex =	r'<TD><a href="www_directory.directory_uoit.p_showindividual\?individual_id_in=[0-9]+&home_url_in=">([A-Za-z,.&\- ]+)<\/a>'

	namePattern = re.compile(nameRegex)

	for (name) in re.findall(namePattern, page):

		profList.append(name)


for item in URL_LIST:



	currentPage = urllib2.urlopen(URL_BASE + item).read()

	parseNames(currentPage)

f = open("PROF_MASTERLIST.js", "w")

f.write("var PROF_MASTERLIST = [")

for i in range(0, len(profList)):

	if (i == (len(profList) - 1)):
	
		f.write("\"" + profList[i] + "\"];")
	
	else:

		f.write("\"" + profList[i] + "\", ")


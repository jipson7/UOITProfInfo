import sys
import urllib2
import re

PROF_DATA_URL = "unavailable";

def getDataURL(fullName):

	searchURL = "http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+of+Ontario+Institute+of+Technology&schoolID=4714&query="

	for i in range(0,(len(fullName))):
			
		searchURL += fullName[i]

		if (i != (len(fullName))):

			searchURL += "+"

			
	searchLinkRegex = r'<a href="\/ShowRatings.jsp\?tid=([0-9]{1,20})">'

	noResultsRegex = r'<div class="result-count">Your search didn\'t return any results.<\/div>'

	searchResults = urllib2.urlopen(searchURL).read()

	if re.search(noResultsRegex, searchResults) is not None:

		print "noResults notExist"

		sys.exit()

	searchMatch = re.search(searchLinkRegex, searchResults);

	informationNumber = searchMatch.group(1)

	#profDepartment = searchMatch.group(2)

	informationPageURL = "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + informationNumber

	return informationPageURL

def getDataPage(dataURL):

	global PROF_DATA_URL

	PROF_DATA_URL = dataURL

	dataPage = urllib2.urlopen(dataURL).read()

	return dataPage

def extractData(dataPage):

	noDataRegex = r'<div class="headline">Be the first to rate Professor ([A-Za-z ]+).?<\/div>'

	##Data list: quality/avgGrade/hotness/helpfullness/clarity/easiness/ratingsCount

	dataRegexList = []

	dataRegexList.append(r'<div class="breakdown-header">\s*Overall Quality\s*<div class="grade">([0-9].[0-9])</div>\s*</div>')

	dataRegexList.append(r'<div class="breakdown-header">\s*Average Grade\s*<div class="grade">([A-Z]\-?\+?)</div>\s*</div>')

	dataRegexList.append(r'<div class="breakdown-header">\s*Hotness\s*<div class="grade">\s*<figure>\s*<img src="\/assets\/chilis\/([a-z]+)\-chili.png" width="[0-9]{1,4}"\/>\s*<\/figure>\s*<\/div>\s*<\/div>')

	dataRegexList.append(r'<div class="rating-slider">\s*<div class="label">Helpfulness<\/div>\s*<div class="rating">([0-9].?[0-9]?)<\/div>\s*<div class="slider">')

	dataRegexList.append(r'<div class="rating-slider">\s*<div class="label">Clarity<\/div>\s*<div class="rating">([0-9].?[0-9]?)<\/div>\s*<div class="slider">')

	dataRegexList.append(r'<div class="rating-slider">\s*<div class="label">Easiness<\/div>\s*<div class="rating">([0-9].?[0-9]?)<\/div>\s*<div class="slider">')

	dataRegexList.append(r'<div class="table-toggle rating-count active" data-table="rating-filter">\s*([0-9]{1,4}) Student Ratings\s*<\/div>')

	if re.search(noDataRegex, dataPage) is not None:

		print "noResults noData " + PROF_DATA_URL

		sys.exit()

	else: 

		dataResultList = []

		for reg in dataRegexList:

			dataResultList.append(re.search(reg, dataPage))

		for result in dataResultList:

			if result is not None:

				print (result.group(1)),

			else:

				print ("null"),

		sys.stdout.write(" " + PROF_DATA_URL);
		

######################################################

profURL = getDataURL((sys.argv[1]).split())

profDataPage = getDataPage(profURL)

extractData(profDataPage)


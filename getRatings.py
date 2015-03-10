import sys
import urllib2
import re

firstName = "randy"

lastName = "fortier"



#fullName = (sys.argv[1]).split()

#firstName = fullName[0]

#lastName = fullName[1]

searchURL = "http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+of+Ontario+Institute+of+Technology&schoolID=4714&query=" + firstName + "+" + lastName

searchLinkRegex = r'<li class="listing PROFESSOR">\s*<a href="\/ShowRatings.jsp\?tid=([0-9]{1,20})">\s*<span class="listing-cat">\s*<span class="icon icon-professor"><\/span>\s*PROFESSOR\s*<\/span>\s*<span class="listing-name">\s*<span class="main">Fortier, Randy<\/span>\s*<span class="sub">University of Ontario Institute of Technology, ([A-Za-z ]{1,40})<\/span>\s*<\/span>\s*<\/a><\/li>'


searchResults = urllib2.urlopen(searchURL).read()

searchMatch = re.search(searchLinkRegex, searchResults);

informationNumber = searchMatch.group(1)

profDepartment = searchMatch.group(2)

informationPageURL = "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + informationNumber

informationResults = urllib2.urlopen(informationPageURL).read()

print informationResults

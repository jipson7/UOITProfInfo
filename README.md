# UOIT Professor Info

####A chrome extension to embed information on professors at UOIT, within UOIT domains.

Install it [here](https://chrome.google.com/webstore/detail/uoit-professor-info/phoccmckepgnhiihbfinnbkbnmikdhpi)

From the Web Store:

>Embeds 'Rate My Professor' ratings and sunshine list salary data on UOIT professors into any UOIT domain.

>When browsing any UOIT domain, you will now see a small magnifying glass injected beside the name of most of your Professor's, Lecturer's, and other faculty members. Hover your mouse over to see what past students thought of them, how hot they were rated, add your own rating, and even see how much money they make!

___________________________

The server folder is currently running on an apache server on a digital ocean droplet. SSL is required on the server for any CORS request to take place from the injected javascript to the server itself. Otherwise it throws an untrusted source error. The 'API' works by scraping the RateMyProfessor page. Currently only functions for UOIT specifically.

_____________________________

The scripts folder contains several scripts that I used to develop the masterlist, sunshine list, and some other necessary information for the server.

______________________________

The root and lib folder contain information for the actual extension. Mainly javascript and some image files.

__________________________________
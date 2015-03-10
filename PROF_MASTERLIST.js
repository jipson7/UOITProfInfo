var PROF_MASTERLIST = ["Asifa Aamir", "Rajen Akalu", "Hamid Akbari", "Belinda Bambrick", "Adam Baran", "Vera Barton", "Nadia Basir", "Lee Bazely", "Jane Bowen", "Bin Chang", "Cuiping Chen", "Greg Chiykowski", "Tim Claydon", "Tirtha Dhar", "Brianna Douglas", "Khalil El-Khatib", "Ken Finney", "John Friedlan", "Derek Fullerton", "Hon-Leung Fung", "Bill Goodman", "Athina Hall", "Garrett Hayes", "Shahram Heydari", "Cyndi Hillis", "Andrew Hogue", "Mehdi Hossein Nejad", "Patrick Hung", "Amin Ibrahim", "Chinmay Jain", "Ying Jiang", "Ferdinand Jones", "Bill Kapralos", "Salma Karray", "Michael Konopaski", "Igor Kotlyar", "Joseph Krasman", "Xiaodong Lin", "Josh Lowe", "Fletcher Lu", "Steve Marsh", "Tony Mayadunne", "Carolyn McGregor", "Pejman. Mirza-Babaei", "Jeff Moretz", "Lennart Nacke", "Richard Pazzi", "Christina Pearsall", "Jennifer Percival", "Melissa Picard", "Ryan Riordan", "Pamela Ritchie", "Steve Rose", "John Rowcroft", "Karthik Sankaranarayanan", "Morden Shapiro", "Wei Shi", "Jackie Simkin", "Kamal Smimou", "Golchehreh Sohrab", "Chirag Surti", "Julie Thorpe", "William Thurber", "Deborah Treftlin", "Miguel Vargas Martin", "Kirstie Wagland", "Terry Wu", "Ying Zhu", "Karen Allan", "Claudette Antoine", "Wendy Barber", "John Bebbington", "George Briggs", "Cheryl Brown", "Susan Burke", "David Bussell", "Rick Carter", "Elizabeth Childs", "Geoff Collins", "Janice Cramer", "Esther Cukierman", "Mary Curran", "Joe De Bruijn", "Francois Desjardins", "Karin Dhar", "Maurice DiGiuseppe", "Tim Dolighan", "Carol Doyle-Jones", "Michelle Dubek", "Marcel Dufresne", "Allyson Eamer", "Tito Faria", "Stephanie Fisher", "Ann Marie Fitzpatrick", "Emily Forrester", "Stephanie Fox-Comery", "Larry Fritz", "Linda Frost", "Krista Gadd", "David Gray", "Jim Greenlaw", "Joni Heard", "Catherine Heeney", "Daphne Heywood", "Janette Hughes", "Bill Hunter", "Mark Joel", "Robinder Kahlon", "Robin Kay", "Lori Keilty", "Jane Kiyonaga", "Bob Kochan", "Jennifer Laffier", "Ann LeSage", "Jia Li", "Kevin Lowe", "Hayley MacPhail", "Ami Mamolo", "Susan Martin", "Kim Mastromartino", "Lori May ", "Shirley McDonnell", "Dawn McGuckin", "Paul McGuire", "Ron McKelvey", "Joan McKelvey", "Ian McNee", "Gail Miles", "Susan Milne", "Kim Mitchell", "Cliff Moon", "Peter Morris", "Sian Morris", "Laura Morrison", "Rachel Muehrer", "Bill Muirhead", "Nancy Papadimitriou", "Diana Petrarca", "Laura Pinto", "Franca Porcelli", "Clare Reid", "Amanda Rennehan", "Sheila Rhodes", "Sandra Riches", "Lorayne Robertson", "Nick Scarfo", "Shirley Smith", "Susan Snelling", "David Sutherland", "Peter Szigeti", "Kathleen Tearne", "Dianne Thomson", "Lynn Tidd", "Pat Vale-Dougherty", "Shirley Van Nuland", "Roland Van Oostveen", "Gisele Vesna", "Joe Visconti", "Richard White", "Lewis Williams", "Suzanne de Castell", "Rob Anderson", "George Bereznai", "Michael Bonaventura", "Amanda Cheng", "Michelle Cholak", "Venkata Dagupatti", "Michael Dymarski", "John Froats", "Hossam Gaber", "Janis George", "Reza Ghafouri", "Bob Goldman", "Glenn Harvel", "Daniel Hoornweg", "Aslam Ibrahim", "Silviu Idita", "Brian Ikeda", "Matthew Kaye", "Ali Keshavarz", "SEM Lab", "Brent Lewis", "Lixuan Lu", "Bradley MacInnis", "Rachid Machrafi", "Imtiaz Malek", "Jennifer McKellar", "Daniel Meneley", "Marlene Mullings-Black", "Barry Neil", "Eleodor Nichita", "Gloria Orchard", "Sharman Perera", "Igor Pioro", "Naureen Rahman", "Khalid Rizk", "Benjamin Rouben", "Robin Secord", "Robert  Ulrich", "Anthony Waker", "Ed Waller", "Martin Agelin-Chaab", "Mohammad Awal", "Ahmad Barari", "Maria Barrese", "Michael Bennett", "Christine Burnell", "Bryan Butryn", "Stephanie Callahan", "Cliff Chan", "Ibrahim Dincer", "Min Dong", "Rachel Dyers", "Mikael Eklund", "Moustafa El-Gindy", "Ebrahim Esmailzadeh", "Masoud Farzam", "Hossam Gaber", "Kamiel Gabriel", "Ali Grami", "Khalid Hafeez", "Marnie Ham", "Yuping He", "Nicole Hutchuk", "Theeben Jegatheesan", "Hossam Kishawy", "Haoxiang Lang", "Ramiro Liscano", "Lixuan Lu", "Brendan  MacDonald", "Michael MacLeod", "Qusay Mahmoud", "Masoud Makrehchi", "Richard Marceau", "Beverley McComb", "Ruth Milman", "Atef Mohany", "Walid Morsi Ibrahim", "Tammy Mulley", "Scott Nokleby", "Nathan Percival", "Tina Petralito", "George Platanitis", "Remon Pop-Iliev", "Vinh Quan", "Shahryar Rahnamayan", "Bale Reddy", "Jing Ren", "Ghaus Rizvi", "Greg Rohrauer", "Marc Rosen", "Linda Rosling", "Namdar Saniei", "Kamran Sartipi", "Shahram Shahbazpanahi", "Hidayat Shahid", "Qi Shi", "Tarlochan Sidhu", "Vijay  Sood", "Joel Stewart", "Michelle Tsui-Woods", "Ying Wang", "Sheldon Williamson", "Leon Wu", "Mohamed Youssef", "Dan Zhang", "Jennifer Abbass Dick", "JoAnne Arcand", "Cindy Arnett", "Darci Aylward", "Robert Balogh", "Caroline Barakat-Haddad", "Ian Barker", "Wally Bartfay", "Emma Bartfay", "Ronald Bell", "Nancy Bergeron", "Lavern Bourne", "Sylvie Brosseau", "Toba  Bryant", "Kristin Bullied", "Dana Chorney", "Marianne Cochrane", "Kathy Cummings", "Danielle Dawson", "Arlene De La Rocha", "Shilpa Dogra", "Jenny Epaminondas", "Joanne Free", "Brenda Gamble", "Clemon George", "Helene Goulding", "Leslie Graham", "Michael Holmes", "Kerry Johnson", "Holly Jones-Taggart", "Joan Laurie", "Nancy Lawrence", "Manon Lemonde", "Gail Lindsay", "Meghann Lloyd", "Fabiola Longo", "Holly MacPherson", "Sandra Mairs", "Andrea Mars", "Sherry Marshall", "Marie McEwan", "Evelyn Moreau", "Patricia Munro-Gilbert", "Bernadette Murphy", "Mika Nonoyama", "Efrosini Papaconstantinou", "Elita Partosoedarso", "Corrinne Rose ", "Milly Ryan-Harshman", "Elaine Salmers", "John Samis", "Otto Sanchez", "Ranganathan Santhanam", "Heather Shearer", "Ruth Simpson", "Donna Smeeton", "Kathy Smith", "Victoria Smye", "Wendy Stanyon", "Michelle Sutcliffe ", "Tracey Szarka", "Sandra Thomson", "Connie Thurber", "Jacqueline Towell", "Angela Verven", "Ellen Vogel", "Nick Wattie", "Robert Weaver", "Michael Williams-Bell", "Paul Yielder", "Hilde Zitzelsberger                   ", "Mike Allison", "Dhavide Aruliah", "Sylvie Bardin", "Genevieve Barnes", "Richard Bartholomew", "Mihai Beligan", "Sean Bohun", "Yuri Bolshan", "Dario Bonetta", "Sergiy Boyko", "Jeremy Bradbury", "Rupinder Brar", "Luciano Buono", "Anatoli Chkrebtii", "Christopher Collins", "Michael Corbett", "Kevin Coulter", "Edmond Courville", "Greg Crawford", "Jean-Paul Desaulniers", "Girija Dhekney", "Paula Di Cato", "Julie Downes", "Richard Drake", "Brad Easton", "John Easton", "Mehran Ebrahimi", "Donna Epstein", "Nicholas Faulkner", "Sean Forrester", "Randy Fortier", "Franco Gaspari", "Mark Green", "Julia Green-Johnson", "John Guchardi", "Cecilia  Hageman", "Douglas Holdway", "Cristen Hucaluk", "Zahraa Ibrahim", "Clayton Jakins", "Valeri Kapoustine", "Andrea Kirkwood", "Ilona Kletskin", "Angela Krueger", "Nelson Lafreniere", "Helene Leblanc", "Greg Lewis", "Clarissa Livingstone", "Joseph MacMillan", "Emily McKnight", "Fedor Naumkin", "Kimberly Nugent", "Anita Nutikka", "Mary Olaveson", "Matthew Overturf", "Victoria Pearce", "Ken Pu", "Faisal Qureshi", "Stacey Sainte-Marie", "Isaac Shim", "George Stamatiou", "Janice Strap", "Nicole Suss", "Isaac Tamblyn", "Annette Tavares", "Liliana Trevani", "Olena Zenkina", "Hendrick de Haan", "Lennaert van Veen", "FSSH Academic Advising Main Line", "Shahid Alvi", "Nawal Ammar", "Amy Anderson", "Scott Aquanno", "Nathan Arbuckle", "Rachel Ariss", "Annmarie Barnes", "Juanita Boone", "Andrea Braithwaite", "Kristy Buccieri", "Brian Campbell", "Liqun Cao", "Carla Cesaroni", "Kimberley Clow", "Hazel Craig", "Wesley Crichlow", "Bruce Curran", "Brian Cutler", "Karla Dhungana-Sainju", "Aziz Douai", "Karyn Douglas", "Steven Downing", "Joseph Eastwood", "Karla Emeno", "Shanti Fernando", "Tyler Frederick", "Gary Genosko", "Jessica Gonzalez", "Judith Grant", "Rob Halpin", "Jordan Harel", "Leigh Harkins", "Alexandra Herman", "Ron Hinch ", "Alyx Ivany", "Alyson King", "Ganaele Langlois", "Sharon Lauricella", "Emily Laverty", "Amy Leach", "Patricia MacMillan", "Timothy MacNeill", "Heather Marcille", "Olga Marques", "Thomas McMorrow", "Tanner Mirrlees", "Aaron Mitchell", "Nicole Myers", "Kellie Newberry", "Jonathan Obar", "Natalie Oman", "Isabel Pedersen", "Barbara Perry", "Jen Rinaldi", "Jaclyn San Antonio", "Hannah Scott ", "Matthew Shane", "Phillip Shon", "Andrea Slane", "James Walsh", "Dan Walters", "Ronn Young", "Arshia Zaidi"];
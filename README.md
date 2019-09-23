# NFQ-frontend-2019

NFQ 2019 autumn entry task FRONTEND.
*(NFQ 2019 rudens stojimo užduotis FRONTEND).*

Customer queue administration and display project.


## Project Overview

Project consists of 4 pages:

1. **Administration** for loading dummy data from .json file and adding new clients.
2. **Display** for displaying client queue.
3. **Specialist** to administer serviced clients.
4. **Client** to see average waiting time.


## Project Features:

* To start you have load a dummy client list in the **Administration** page.
* When dummy list is loaded more clients can be added in the **Administration** page.
* When loaded the list is displayed in the **Display** page.
* Clients are sorted by specialists assigned to them.
* First client in a row at a certain specialist is being serviced - displayed with a green background.
* In the **Specialist** page clients are sorted by specialist and can be marked as "done".
* When at least one client has been marked as "done" client can see average waiting time according to his number in the **Client** page.

* All the data is stored in localStorage until the button *load dummy list* is pressed and dummy list is loaded again.


## Live preview

You can preview live project at my website:
- [egleba.lt/nfq](http://egleba.lt/nfq/)
or at GitHub:
- [GitHub URL](https://github.com/egleba/NFQ-frontend-2019.git)


## Project Setup

Node.js and npm are required to run this project.

When you have them installed, open the terminal and type in the following order:
1. `sudo npm install gulp-cli -g`
2. `git clone https://github.com/egleba/NFQ-frontend-2019.git`
3. `cd` to the directory
4. `npm init`
5. `npm install --save-dev gulp`
6. Install all the dependencies `npm install --save-dev`


## Usage

To start browser syncing and file watching, run `gulp` in the project directory.


## Author

Eglė Baltušnikienė
egle.baltusnikiene@gmail.com
[LinkedIn](https://www.linkedin.com/in/egl%C4%97-baltu%C5%A1nikien%C4%97-22368b60/)
[codepen.io/egleba](https://codepen.io/egleba/)
[egleba.lt](http://egleba.lt/)

# Zenmo
Zenmo is a web app that allows users to request and send payments to their friends, inspired by Venmo. Designed using React,  Material UI, and custom CSS on the front end, with Flask and SQLAlchemy to handle the back end.

[Zenmo Live](https://zenmo-app.herokuapp.com/)

For initial design documents, please visit the [wiki](https://github.com/jc328/venmo/wiki).

Mady by:
- John Chen [github](https://github.com/jc328) | [linkedin](https://www.linkedin.com/in/john-chen-92714817/)
- Robert Estrada [github](https://github.com/robertestrada) | [linkedin](https://www.linkedin.com/in/robertmestrada/)
- Greg Lloyd [github](https://github.com/Greg001100) | [linkedin](https://www.linkedin.com/in/greglloyd1/)

Zenmo allows users to:
- Create an account and log in and out securely (potentially using google oAuth).
- See a sorted feed of transactions: their own transactions, friends transactions, all public transactions.
- Like and/or comment on different transactions. 
- Search for other users and pay or request payment from them.
- View a list of their friends and request/make a payment with friends.
- Get notifications of incoming payment requests.

## Technology Used:
- React and Redux
- Material UI
- PostgreSQL
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- Docker containers

## Main Components:

**Landing Page**

Visitors to the site are first greeted by the landing page, which is a very close representation of the real Venmo website. From here, users can sign up or sign in.
![](https://github.com/jc328/venmo/blob/master/zenLand.png)

**User dashboard**

When logged in, users are greeted with their dashboard. This is the command center for the app that allows users to see a feed of transactions. This feed can be sorted by public, friends only, and the users's specific transactions. The user can also like and comment on different transactions here.

The top navbar has links to other important parts of the site, as well as a search bar that allows users to find other users and create a transaction with that user. There is also an incoming request notification bell that will alert users to their outstanding payments. 

Finally, a small card on the right shows the user's general information, including current balance. It also has a link to their friends list. 
![](https://github.com/jc328/venmo/blob/master/zenDash.png)
![](https://github.com/jc328/venmo/blob/master/zennotif.png)



**Friends list**

Here users can see a list of their friends. Clicking on the pay or request button opens up a transaction modal that allows users to make a payment or request a payment from the friend they chose. 
![](https://github.com/jc328/venmo/blob/master/zenFL.png)

<h1>House Points</h1>
<hr><p>A chore based app to gamify chores! Who can rack up the most points?</p><h2>Technologies Used</h2>
<hr><ul>
<li>HTML</li>
</ul><ul>
<li>CSS</li>
</ul><ul>
<li>JavaScript</li>
</ul><ul>
<li>React</li>
</ul><ul>
<li>Flask</li>
</ul><ul>
<li>NodeJS</li>
</ul><ul>
<li>Python</li>
</ul><h2>Features</h2>
<hr><ul>
<li>Signup: Add your family account to the database</li>
</ul><ul>
<li>Login: Username and hashed password for a secure login, session used to maintain logged in</li>
</ul><ul>
<li>ScoreBoard: Ranks family members based off their total points, you can also like other members scores for a morale boost</li>
</ul><ul>
<li>View Tasks: Here you can view, remove, and complete chores</li>
</ul><ul>
<li>Add Task: This page creates a new chore</li>
</ul><ul>
<li>Add Family: Allows the head of household to add family members accounts</li>
</ul><ul>
<li>Change Active Member: You can log into your individual user account or change user accounts on this page</li>
</ul><ul>
<li>Home: Gives a message to the family and has basic instructions for using this application</li>
</ul><h2>Setup</h2>
<hr><p>Project requires: Python, Flask, Javascript, React, and npm</p><h5>Steps</h5><ul>
<li>Clone or fork this repo</li>
</ul><ul>
<li>create a .env file in /server with the key $ SECRET_KEY = (Your secret key)</li>
</ul><ul>
<li>navigate to /server</li>
</ul><ul>
<li>run $ pipenv install; pipenv shell</li>
</ul><ul>
<li>run $ flask db init; flask db migrate; flask db upgrade head;</li>
</ul><ul>
<li>run $ python seed.py</li>
</ul><ul>
<li>run $ python app.py</li>
</ul><ul>
<li>Return to root and run $ npm install --prefix client</li>
</ul><ul>
<li>run $ npm start --prefix client</li>
</ul><ul>
<li>App will now be running in your default browser and accessible from "http://localhost:3000/"</li>
</ul><h2>Usage</h2>
<hr><p>You can create contests for your family with rewards for completing chores.</p><h2>Project Status</h2>
<hr><p>In Progress</p><h2>Improvements</h2>
<hr><ul>
<li>Add aesthetics, recurring tasks, start/end dates</li>
</ul>
<hr><h2>Acknowledgement</h2>
<hr><ul>
<li>This project was inspired by the chore system I used at home with my chosen family. We had the winner each month who could choose what we did on our family night that month.</li>
</ul>

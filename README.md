# ❓ Quiz App - project from roadmapsh

The project consists of implementing a quiz app. You can change the categories which you guess the questions. It also contains a ranking of correct and wrong answers for each category. The idea was taken from Roadmap.sh

<img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />

While coding the app, I realised there was a big flaw I needed to fix, that is, the api only let's you make requests each 5 seconds. So if an user answered a question quickly, they would have to wait between 1 to 5 seconds to get the other question and so on. The solution I thought was to instead of fetching only one question per request, I would fetch 50! (the max amount the api let's you) So everytime the user answers a question, the next questions comes instantly (once you click next question, obviously). Only when you answer the 50 questions that the app has to load the other 50 questions (but when it comes to that, it does fast because it already passed the 5 seconds per request).

I'm really glad with the solution I got and the work i've done, I also could practice and learn more about managing state which is great.

## 📸 Youtube Video:

[Quiz App on Youtube](https://www.youtube.com/watch?v=yDvyRcaLXaA)

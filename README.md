# Alias

Alias is an online browser game that revolves around teams, each comprising two or more members. In this game, one team member is assigned the task of explaining a given word using alternative words to their fellow team members.

The objective of this project is to create a dynamic front-end website that adapts to user interactions, modifying the presentation of information to fulfill the user's objectives.

[Link to the live site](https://dima-bulavenko.github.io/alias/)

![Site Responsive Design](./assets/images/readme/responsive_view.PNG)

# Contents

-   [User Experience UX](#user-experience-ux)
    -   [Target Audience](#target-audience)
    -   [User Stories](#user-stories)
    -   [Site Aims](#site-aims)
-   [Design](#design)
    -   [Wireframes](#wireframes)
        -   [Home page on Desktop](#home-page-on-desktop)
        -   [Home page on Mobile](#home-page-on-mobile)
        -   [Game page on Desktop](#game-page-on-desktop)
        -   [Game page on Mobile](#game-page-on-mobile)
    -   [Color Scheme](#color-scheme)
    -   [Typography](#typography)
-   [Features](#features)
    -   [Teams settings](#teams-settings)
    -   [Game settings](#game-settings)
    -   [Categories settings](#categories-settings)
    -   [Game section](#game-section)
        -   [Before-round section](#before-round-section)
        -   [Round section](#round-section)
        -   [After Round section](#after-round-section)
        -   [Who guessed pop-up menu](#who-guessed-pop-up-menu)
    -   [Win section](#win-section)
    -   [Future Features](#future-features)
-   [Testing](#testing)
-   [Bugs](#bugs)
    -   [Bugs Fixed](#bugs-fixed)
    -   [Bugs Unfixed](#bugs-unfixed)
-   [Technologies used](#technologies-used)
-   [Deploying](#deploying)
-   [How to Clone](#how-to-clone)
-   [Credits](#credits)
    -   [Content](#content)
    -   [Media](#media)
-   [Acknowledgements](#acknowledgements)
-   [Codeanywhere Reminders](#codeanywhere-reminders)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# User Experience UX

## Target Audience

This site caters to a wide-ranging audience, including individuals of different ages, by providing various levels of difficulty tailored to accommodate diverse skill levels.

[Back to top](#contents)

## User Stories

-   Enable users to access clear instructions on how to play the game.
-   Allow users to reset the game at any point for a fresh start.
-   Ensure a user-friendly interface that clearly displays the game elements.
-   Display the current score of the game for users to stay informed about their progress.
-   Implement clearly labeled buttons to give users intuitive control over the game.

[Back to top](#contents)

## Site Aims

The goal of the site is to offer friends an enjoyable and amusing time playing this game together.

[Back to top](#contents)

# Design

The site's design draws inspiration from the mobile application of the game "[play.google.com](https://play.google.com/store/apps/details?id=com.greylab.alias&hl=en_US&pli=1)". I've modified the structure of certain elements, completely overhauled the color scheme, and crafted an appearance specifically optimized for laptop screens.

[Back to top](#contents)

## Wireframes

I used [balsamiq](https://balsamiq.com/) to create wireframes

### Home page on Desktop

![Home page Desktop](assets/images/readme/home_pc_wf.PNG)

### Home page on Mobile

![Home page Mobile](assets/images/readme/home_mobile_wf.PNG)

### Game page on Desktop

![Game page Desktop](assets/images/readme/game_pc_wf.PNG)

### Game page on Mobile

![Game page Mobile](assets/images/readme/game_mobile_wf.PNG)

[Back to top](#contents)

## Color Scheme

I used [coolors.co](https://coolors.co/) to generate this color palette.

![Color palettes.](./assets/images/readme/color_palettes.png)

[Back to top](#contents)

## Typography

I use [Inter Tight](https://fonts.google.com/specimen/Inter+Tight?query=Inter) font.

![font](./assets/images/readme/font.png)

[Back to top](#contents)

# Features

[Back to top](#contents)

## Teams settings

[link to team.html](https://dima-bulavenko.github.io/alias/teams.html)

-   Add new team button. It adds new team to a game session (allowed no more then 6 team).

![Add team button](./assets/images/readme/add_team_btn.PNG)

-   The "Delete team" button. It deletes a team from a game session.

![Delete team button](./assets/images/readme/delete_team_btn.PNG)

-   The "Next" button. It saves chosen teams to localStorage and navigates to next settings' stage

![Next team button](./assets/images/readme/next_team_button.PNG)

[Back to top](#contents)

## Game settings

[link to team.html](https://dima-bulavenko.github.io/alias/settings.html)

-   The "word count" input. It sets amount of words which a team must to achieve to win.

![Word count input](assets/images/readme/word_count_input.PNG)

-   The "Round duration" input. It sets a round's time.

!["Round duration" input](assets/images/readme/round_duration_input.PNG)

-   The "Penalty for a miss" input. It enables a one point penalty for missed word.

!["Penalty for a miss" input](assets/images/readme/penalty_for_miss_input.PNG)

-   The "Common final word" input. It enables all teams to guess the last word.

!["Common final word" input](assets/images/readme/common_final_word_input.PNG)

-   The "Next" button. It saves chosen settings to localStorage and navigates to next settings' stage

![Next team button](./assets/images/readme/next_team_button.PNG)

[Back to top](#contents)

## Categories settings

[link to categories.html](https://dima-bulavenko.github.io/alias/categories.html)

-   There are three buttons which define difficulty of game. It saves game words for corresponding level of difficulty and navigate user to game.html page.

![Categories buttons](./assets/images/readme/categories_btn.PNG)

[Back to top](#contents)

## Game section

[link to game.html](https://dima-bulavenko.github.io/alias/game.html)

-   The game section has tree state of appearance (`before-round > round > after-round`). The states runs in a loop until some team get win.

### Before-round section

There are three parts of the `before-round` section

1. The first one show the "amount of words to win" and list of teams and them score.

2. The second one show a round number of certain team and team name which is going to play upcoming round.

3. The third one is a button that allows user to navigate to the next "`round`" section.

![Before-round section](./assets/images/readme/before_round_section.PNG)

[Back to top](#contents)

### Round section

The `round` section has main features.

1. The first one shows a team name that is going to paly and number of `guessed` words.

2. The second one is the button `start` which runs the current round. After click on it, the word "Start" disappears and a explainable word to be shown.

3. The third one is the `guess` button. It allows team member, who is explaining, to add the word to guessed list.

4. The fourth one is the `miss` button. It allows team member, who is explaining, to add the word to missed list.

5. The last one shows amount of missed words and a countdown timer indicating the remaining time until the end of the round..

![round section desktop](./assets/images/readme/round_section.PNG)

In the "Round" section, users on touch screen devices can make guesses by swiping up and register missed words by swiping down.

![round section mobile](./assets/images/readme/round_section_m.PNG)

[Back to top](#contents)

### After Round section

The `after-round` section has three main features

1. The first one shows amount of points gotten for round and teams who got them.

2. The second one shows all words of round. User can change status of a word from "guessed" to "missed" and vise versa if he made mistake.

3. The third one is button that adds earned points to corresponding team and
   navigates user either to the win page, if someone won, or to the `before-round` stage by changing current team.

![desktop after round](./assets/images/readme/after_round_section.PNG)

[Back to top](#contents)

### Who guessed pop-up menu

The `Who guessed` pop-up menu appears in two cases if the [`"Common final word"` of the "Game settings"](#game-settings) was enabled.

1. The first case occur during the [`round` section](#round-section),When the round is over and a user has not yet processed the last word. After the processing the user will be offered to choose the team who guessed the last word.

2. The second case occur during the [`after-round` section](#after-round-section). When the user is trying to change state of the last word.

![Who guessed pop-up menu](./assets/images/readme/who_guessed_pop_up.PNG)

[Back to top](#contents)

## Win section

[link to win.html](https://dima-bulavenko.github.io/alias/win.html)

The `"Win section"` has three main features.

1. The first one shows a winner team name and his points.

2. The second one shows rest of teams with their points.

3. The third one is button that navigate user to the home page.

![Win section](./assets/images/readme/win_section.PNG)

[Back to top](#contents)

## Future Features

-   Add maintaining `different languages` so people all over the word will be able to paly this game.

-   Add `sounds effects`.

-   Create `online mode` of this game. It will allow users to play being in different places.

[Back to top](#contents)

# Testing

View testing [here](./docs/TESTING.md#testing)

[Back to top](#contents)

# Bugs

[Back to top](#contents)

## Bugs Fixed

-   Delayed content loading when accessing a page ([fix commit](https://github.com/Dima-Bulavenko/alias/commit/5cd0fee3ca4d561ad4eec93b0cab96debecbcdca))

-   The lack of setup for the content of "#round-timer" leads to issues in the proper functioning of checkIsRoundFinished(). ([fix commit](https://github.com/Dima-Bulavenko/alias/commit/a4a57020a4cfcd738539f3451d86aa802e942258))

-   Didn't use "let" keyword in "for of" loop. ([fix commit](https://github.com/Dima-Bulavenko/alias/commit/16a062ede4b1a283a9951cfc04ca586b7230a311))

-   Correct behavior for counting words when user refreshes page during a round ([fix commit](https://github.com/Dima-Bulavenko/alias/commit/50c7b34c1806f54ff64194f0e87018994dc26d64))

-   Correct behavior of "#control" element when user click on it multiple times ([fix commit](https://github.com/Dima-Bulavenko/alias/commit/ec194a283515699a9f5402085f91490e42a103f5))

-   Template of ".winner-team-info" wasn't deleted and appears on page. ([fix commit](https://github.com/Dima-Bulavenko/alias/commit/9176d5ec4656e959dc2b0cba8c989f1b5b3d4644))

[Back to top](#contents)

## Bugs Unfixed

-    [licking the "Change Word Status" button multiple times is leading to the duplication of the team block within the "#who-guessed" element.](https://github.com/Dima-Bulavenko/alias/issues/1)

[Back to top](#contents)

# Technologies used

-   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - provides interactivity of site
-   [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) - Provides the structure of the site information,
    elements and website content.
-   [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Provides the styling of the HTML content.
-   [Balsamiq](https://balsamiq.com/) - Wireframing software used to plan and design website templates.
-   [GitHub](https://github.com/) - An online host for web and software development projects. Used to store the repository
    and deploy the finished website.
-   [Git](https://git-scm.com/) - Software for tracking changes to files. Used with GitPod to add, commit and push code
    changes to the repository on GitHub.
-   [Google PageSpeed Insights](https://pagespeed.web.dev/) was employed to assess the performance, accessibility, best practices, and SEO aspects of the web pages.
-   [ChatGPT](https://chat.openai.com/) was used to create more readable and sensible text.

[Back to top](#contents)

# Deploying

The Alias is presently hosted and accessible on GitHub Pages. The deployment process is managed as follows:

**Repository Configuration**: The GitHub repository for my project is configured to deploy automatically from the `main` branch to GitHub Pages.

**Push to Deploy**: Whenever I push new changes to the `main` branch, GitHub Pages initiates an automatic deployment of the updated version, ensuring it becomes instantly available online.

**Accessing the Live Application**: You can access the live application by visiting this link: [Alias](https://dima-bulavenko.github.io/alias/index.html).

# How to Clone

1.  Log into your account on GitHub
2.  Go to the repository of this project [Alias](https://github.com/Dima-Bulavenko/alias)
3.  Click on the **code** button, and copy your preferred clone link.
4.  Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.
5.  Type `git clone` into the terminal, paste the link you copied in step 3 and press enter.

[Back to top](#contents)

# Credits

## Content

-   Custom range slider [w3schools.com](https://www.w3schools.com/howto/howto_js_rangeslider.asp)

-   JavaScript MutationObserver [mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

-   Fonts [fonts.google.com](https://fonts.google.com/).

-   CSS linear-gradient [mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)

-   Custom checkbox styles [alvarotrigo.com](https://alvarotrigo.com/blog/css-checkbox-styles/)

-   Wavy backgrounds [fireship.io](https://fireship.io/lessons/wavy-backgrounds/)

[Back to top](#contents)

## Media

-   [Color palettes generator](https://coolors.co/)

-   Favicon and logo [icons8](https://icons8.com/icons)

-   Icons [Font Awesome](https://fontawesome.com/).

[Back to top](#contents)

# Acknowledgements

I want to convey my immense gratitude to my mentor, [Luke Buchanan](https://www.linkedin.com/in/lukebuchanan67/), for pinpointing my mistakes and providing advice on how to rectify them. Special thanks to my friends who assisted in testing the application, and to the Slack community, always ready to offer valuable tips at any time.

[Back to top](#contents)

# Codeanywhere Reminders

To run a frontend (HTML, CSS, Javascript only) application in Codeanywhere, in the terminal, type:

`python3 -m http.server`

A button should appear to click: _Open Preview_ or _Open Browser_.

To run a frontend (HTML, CSS, Javascript only) application in Codeanywhere with no-cache, you can use this alias for `python3 -m http.server`.

`http_server`

To run a backend Python file, type `python3 app.py`, if your Python file is named `app.py` of course.

A button should appear to click: _Open Preview_ or _Open Browser_.

In Codeanywhere you have superuser security privileges by default. Therefore you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

To log into the Heroku toolbelt CLI:

1. Log in to your Heroku account and go to _Account Settings_ in the menu under your avatar.
2. Scroll down to the _API Key_ and click _Reveal_
3. Copy the key
4. In Codeanywhere, from the terminal, run `heroku_config`
5. Paste in your API key when asked

You can now use the `heroku` CLI program - try running `heroku apps` to confirm it works. This API key is unique and private to you so do not share it. If you accidentally make it public then you can create a new one with _Regenerate API Key_.

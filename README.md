# Random Generator

A simple webapp for a random number (or food.)

This project is dedicated to my amazing partner, who's been in search of a random number generator similar to the one she lost many years ago.

It opens up to the previous random generator that was used and immediately provides a random value. Interacting with the value generates a new random value. Clicking on the cat opens up the settings, and navigating to a different category will send the user to the relevant generator upon clicking away from the settings menu. The menu allows users to limit the possible values generated, view the most recent values generated, and reset their settings per category.

Currently, I think this project works "good enough" for my learning goals. It took a little under a week and was much less confusing than the previous attempt at a to-do-list. I started with a more formal plan and a solid idea of what it should look like, the functions it should have, how the user would interact with it. This made it much easier to decide what to do next and how to do it. I'll definitely be studying how to write software requirements specifications in more detail.

The project got more difficult towards the end as I added more features and realized that the way I had written certain things wasn't suited for them and needed refactoring. I suppose it was a small taste of scope creep and a lesson on trying to keep code modular. For example, I decided early on that many of my save/load functions should be kept in a separate javascript file and used as a module. Later, I found myself exporting many functions where it would have been better to simply export a class that could handle managing the data.

A few things I learned, or got a lot of practice on, with this project:
- labels aren't focusable, prefer buttons, inputs, and anchor links
- scrollbars and range slider formatting
- creating and styling elements using javascript
- using client and scroll width/height to calculate responsive sizing in js
- window.location properties to do relative links redirects on host and local servers
- shallow and deep copying objects
- saving and retrieving data with json and local storage

If I ever revisit this, I'd like to expand the settings further where I can add a variety of different random generators to a list, and allow the user to set a color for the theme of the app.
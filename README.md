*Nov 21, 2022 - Franky Jr Blondeel - initial version*


# Frankito's Delicacies - a restaurant ordering app

## Overview

**Live version [here](https://frankitos.netlify.app/)**

I'm currently refreshing my entire JavaScript knowledge through a course on [Scrimba](https://scrimba.com/allcourses)
The assignment focused primarily on different essential JavaScript concepts such as:
* **textareas**: Already knew about these but it's the first time in class we used these
* **.forEach()**: interesting entry on how to use forEach on arrays and objects
* **data-attributes**: an extremely interesting piece on data attributes and how to use them in JavaScript. This was really handy
* **Adding conditional render styles**
* **CDNs to fetch icons**
* **Logical NOT operator**
<p align="center">
<img alt="screenshot of base concepts" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/roostr/concepts.png">
</p>

Using all these concepts, I came to an app I called Roostr, which is in effect a 'clone' to twitter


## How it works

The app basically first reads a data.js file, which contains some 'roost' objects (the equivalent of a tweet, in the Roostr world) in an array.

Using the stored data in that array, I run a function that reads out each object, and creates the different HTML elements necessary to display the 'roosts'
<p align="center">
<img alt="screenshot of start screen" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/roostr/main-screen.png">
</p>

Next up, it was necessary to make the reply, like and 'reroost' buttons work. Therefore, an eventlistener was added to the document. that will listen to any clickevent that happens on the screen. Each one of the like, reroost or reply buttons carries with it some data-attributes. Inside the data-attribute, the UUID is stored.
In the eventlistener, I listen for which target was clicked, and handle that click appropriately.
<p align="center">
<img alt="screenshot of replies and like" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/roostr/event-listener.png">
</p>

On top of that, it needed to be possible to 'roost' onto the site. So a textarea was created, that will allow users to add a message. Upon confirming, the user's message should appear on screen, as it is pushed to the array. Really fun!


## Stretch goals

At Scrimba, some interesting stretch goals were proposed:
<p align="center">
<img alt="screenshot of resulting meme" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/roostr/stretch-goals.png">
</p>

Some of these were implemented, others not, in favor of some extras of my own that I found more interesting.

### Creating a user
As a first, I wanted the user to be able to choose their own handle to 'roost' with.
So I created a small modal that asks the user for a (required) username. On top of that, the user is able to push in an avatar image.
<p align="center">
<img alt="screenshot of start screen" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/roostr/login.png">
</p>

Since I don't store anything server-side, and since one of the stretch goals mentions using the localstorage to store data anyhow, I decided to try and store all this data in the LocalStorage, including the avatar image. Since localstorage has some limitations, I added a limit to the upload size.
So now I store a 'currentUser' object in the localstorage, which will be the driving factor for users to 'roost' from, instead of a hardcoded user like before

Interesting to note; If the user does not upload an avatar, I revert to a default image to show (a cracked egg)

### Moving things to LocalStorage
Once a user has been 'created' it is available in the LocalStorage. This means that next time you load the page, the user is loaded again from localStorage, and the login modal will not be shown again.

Roosting with a user being available will use the currentUser object from the localStorage.

Now, to furthermore leverage the localStorage:
* onload, I read the data.js file and push it into a local array and into the localStorage.
* second loadtime around, the data in the local array is fetched from localstorage
* refactoring had to happen to make the entire renderfunction listen to the local data, instead of the initial data.js file.

So with these changes made, I can now solely interact with the local array and/or localStorage data to generate new tweets, save the likes and reroosts and so on.

### Delete Roosts
I then went on to implement a deletion functionality. The code will check if the username of the currentuser is equal to the username of the roost. If the outcome is positive, a user can delete one of their own Roosts

### Replies
Replies functionality has been skipped in favor of progress towards the next assignments. I technically know exactly how I would tackle such a task, so I'm skipping for now.

Quite a fun little assignment and again, I learned so much!
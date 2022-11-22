*Nov 21, 2022 - Franky Jr Blondeel*


# Frankito's Delicacies - a restaurant ordering app

## Overview

**Live version [here](https://frankitos.netlify.app/)**

I'm currently refreshing my entire JavaScript knowledge through a course on [Scrimba](https://scrimba.com/allcourses)

The goal of this assignment was to build a simple online restaurant ordering app. The concepts this app focuses on were very similar as with the Roostr app, completed not too long before this one.
* Working with Arrays
* for of loops
* data in JS Modules (importing and exporting)
* objects in arrays

Below are the requirements of the assignment:
<p align="center">
<img alt="requirements" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/requirements.png">
</p>

Some stretch goals were set as well, as always
<p align="center">
<img alt="stretch goals" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/stretch_goals.png">
</p>

Check out the live version to give it a spin!


## The approach

During the first steps of the deployment of the assignment, I followed the design in it's measurements, but then immediately deviated. I know interpreting designs from Figma is an important skill to still master, I feel as if I had enough understanding of how to translate from a design into an actual website.

We got a clear overview of what the 4 states of the application would be, and they made sense to start designing them chronologically.
<p align="center">
<img alt="4 states" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/4differentstates.png">
</p>

I basically spied a bit on the internet and found a couple of restaurant sites I like, and borrowed from designs there.
Bearing in mind, I'm not a designer and my end result probably hurts some people's eyes 😂


### Splitting the data
I kind of wanted to make my site clearer/more scalable. I wanted to have more than 3 options for the user to order from, so I split the menu cards in drinks, mains and desserts. I populated all JS's with their own objects, based on dishes I sometimes make myself, or I just like. 
<p align="center">
<img alt="data structure" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/datastructure.png">
</p>

All pictures from the mains were dishes created by myself btw ;) Except the salmon, which was my girlfriend's


### Some extras of myself
I wanted to make the page a bit nicer to navigate. I made a nav bar, a footer and collapsable sections.
When you click the images of the menu, you can see an enlarged image of the dish.

Furthermore, I spent some time on the design and the logo's and such. I learnt about the modern way of deploying correct icons and favicons for Apple Devices. All interesting skills to pick up along the way.

Once I got the rendering working of everything, I implemented some animations on the collapsable sections and on the cart. Really fun.


### Getting the cart to work
So when a user clicks an item, it needs to be added to the cart. In order to do this, I created a new array that would store the clicked Object, with a couple of parameters saved to it. (id, name, price, etc)

I then render this to the cart, and calculate the total price.

One little extra I did is the delivery costs, by default set to 4.99. If a user orders more than $35, the shipping costs are automatically dropped.

Interesting to note here is that I struggled a lot with data types!! Numbers vs Strings and so on. Why? Because I had decided that my prices should be displayed with comma's to point out the decimals 😅 European vs American, I guess
So instead of making my prices numbers again in the arrays, I do some converting back and forth in the background, to make all prices still display with comma's... A lot of unnecessary extra work, you could think, but I thought it was interesting to claw my way out of my own Requirements...
<p align="center">
<img alt="some example of calculated prices" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/cart-prices.png">
</p>


### Checkout Experience
When it came to the checkout, I had a couple of interesting struggles too!

First of all, setting up the form itself still was a little bit of a challenge to me, meaning, when it comes to the positioning and the layout of the form. For some reason I seem to struggle with it from time to time. Even though I think it looks okay now, it didn't 'feel' like I was doing the right thing. I guess I'll need some more practice...
<p align="center">
<img alt="checkout window" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/checkout.png">
</p>

Other than that, I decided to add a coupon functionality. With a specific coupon defined (I didn't hide it in the code or anything), I display a 'loading' graphic; which is just a basic setTimeout() function, and run some code. Fun thing to do, and you also get to see the discount you got on the total order
<p align="center">
<img alt="invalid code" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/invalid.gif">
</p>
<p align="center">
<img alt="valid code" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/valid.gif">
</p>

After some review by a user on the Scrimba code review forums, I noticed I had some issues with the validation of my form. The required fields were not taken into account. The reason for this was that I had pointed an eventlistener to the Pay button on the bottom of the screen.
That's not how you're supposed to do it. Instead, I added an eventlistener to the form itself, listening for a 'submit' event on the form. This allowed me not only to properly validate the (required) data the user needed to fill out, but on top of that, I could use the preventDefault method, stopping the thing from reloading... Learned a lot there!
<p align="center">
<img alt="example of form validation" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/validation.png">
</p>

Next up, once the user is able to pay their order, I made sure the modal is repainted with a couple of SVG animations I found and included on the site. I added them, and then concluded the animation.
<p align="center">
<img alt="checkout sequence" src="https://github.com/MrFranksJr/MrFranksJr/blob/main/assets/frankitos/payorder.gif">
</p>


## Conclusion

I love every second of this assignment. It was the perfect closure to the essential Javascript section of the course. A chance to bring all knowledge together. And at the same time, I learned so much more in the process of creating this. I really, really liked it.
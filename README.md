# DiveGo (Web Version) 
Built with the dream of making every dive hold the chance for an unforgettable encounter with a sea creature 


# Live at
https://divego.netlify.app/

Login instructions for guests:

Email: divego2022@gmail.com

Password: divego

# Current Features:

Map Interface that Displays Anchor Icons to represent dive sites and heat map points to show location and number of sea creature sightings 

Map will load to user's/device current location (once permission is granted) if not granted it will load to BC Canada as default

Month slider at the top allows users to view diving season for a given sea creature over the mohts of the year 

Icon Clustering to maintain map performance when large amount of data are on screen

Google Places API integration to allow users to jump the map to other places in the world by inputting a town/city name

Animal select field to filter the heat map for a given sea creature 

Dive Site submission form with "I'm at the dive site" button that takes users current location to serve as dive site GPS location

Photo Submission form, upload a photo if it contains a created date and/or GPS EXIF data it will be used as the date and lat/lng info 

Pin drop feature, for photos with no GPS EXIF data, place the draggable pin anywhere on the map and tap the "set pin" button to relay the pins GPS location as the sea creature sightings lat/lng coordinates 

Dive site animal photo gallery, animal sightings within a pre-determined GPS radius are displayed when tapping on a specific dive site anchor icon

How to Guide, explains most features of the app for new users 

# Admin section for:

User dive site submission and user photo submission validation before committing data to the map for others to view 

In Progress Features:
Login/Logout/Register system with persistent login (user stays logged in even after closing browser, unless they deliberately log out)

# Planned Features:

Photo flagging feature for users to ID incorrect data or to make copy write claims on submitted photos
Automated photo validation using machine learning 
Automated animal ID from photo machine learning 


# ScreenShots
!["Screenshot of Map Screen"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/Screenshot%202022-12-08%20at%202.24.11%20PM.png)
!["Screenshot of Animal Select"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/Screenshot%202022-12-08%20at%202.24.39%20PM.png)
!["Screenshot of Dive Site Form"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/Screenshot%202022-12-08%20at%202.27.54%20PM.png)
!["Screenshot of Photo Upload Form"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/Screenshot%202022-12-08%20at%202.27.29%20PM.png)
!["Screenshot of Pin Drop Screen"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/Screenshot%202022-12-08%20at%202.26.54%20PM.png)
!["Screenshot of How To Guide"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/Screenshot%202022-12-08%20at%202.28.35%20PM.png)

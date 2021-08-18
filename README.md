# Mookit Scrapper 

## pclub task submission


This is a browser extention that enables scrapping of lectures on MOOKIT.

Goto profile page of any course you want to scrap, you will find a "Scrape" option on the dashboard there.
Click to scrape. 


if the option isnt visible please reload the page.


### working of script 


the script (ex.js) starts with a helper func that is used to export csv from the json result.


```fire()``` is called when scrape instruction from profile page is recieved. 

It then calls all the elements with ``` class : weekWrapperTitle ``` and all the ```a``` elements with href pointing to some lecture and stores them respectively in ```weeks``` and ```lecs```. Then it iterates over all the lecs building up the ```scrap``` list.

If the position of a lec is after the next to current week element the pointer to current week is incremented.




scrap.csv contains an example dump from ESO207.  
  

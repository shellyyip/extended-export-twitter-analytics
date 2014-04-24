Extended Export for Twitter Analytics
=================================

Filtering and CSV exporting tool for Twitter Analytics data.

What is it for?
---------------
If you have a Twitter account with Analytics activated, you can go to http://analytics.twitter.com and see a list of your tweets with some extra helpful info added, stuff like number of times a link was clicked and a reach multiplier for extra reach-y tweets. This page also has an Export to CSV button, but all that CSV gives you is your tweet with reply, retweet, and fave numbers, without those extra goodies. That's where this tool comes in. 

How does it work?
-----------------
* Twitter Analytics stores all the raw data for its fancy user-facing graph and chart in a giant Javascript object at this url: https://ads.twitter.com/accounts/xxxxxx/timeline_activity/tweet_data . Unfortunately trying to HTTP GET this data results in a Does Not Allow Cross-Origin Resource Sharing error, so the alternative is to have the user copy-paste. Sorry!

* Using Javascript, we then process the raw data into a simplified and filtered output for arranging into an HTML table (which can be copy-pasted into PowerPoint) or CSV. Yay!
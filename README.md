# ExpenseNG Twitter Application (bot)

This Twitter application [twitter.com/ExpenseNG](https://twitter.com/expenseng) is a sub-component of [ExpenseNG.com](https://www.expenseng.com/) - Nigeria’s Federal Government Expense Tracker application. ExpenseNG monitors Nigeria’s FG financial allocations/expenditures from the publicly available data at [opentreasury.gov.ng](https://opentreasury.gov.ng/) and makes it accessible to the public via its site and Twitter.

## Vision

This project is our little contribution to the fight against corruption in Nigeria - if every Government expense is publicly available on social media, with details of parties involved in the fund allocation, it will reduce corruption.

> We are shining the torch to reduce corruption, this little project can have a massive impact.

## Use Case or Business Purpose

The public data at opentreasury.gov.ng is Nigerian Government’s commitment to transparency and fight against corruption. However, accessibility is quite limited based on modern day Internet standards. The parent project, [ExpenseNG.com](https://www.expenseng.com/), is a web application that aims to migrate this data to a more accessible platform at www.expenseng.com making it fit for purpose and fit for use.

We are building an automated Twitter application at [twitter.com/ExpenseNG](https://twitter.com/expenseng) to promote awareness of the data at [opentreasury.gov.ng](https://opentreasury.gov.ng/) and/or [ExpenseNG.com](https://www.expenseng.com/) via Twitter. We believe this social presence will further improve accessibility, reaching Nigerians, among others, worldwide. The bot will periodically tweet data from the parent sources above.

## Affiliation

This project is not affiliated with any government or public sector entities. The information provided by [ExpenseNG.com](https://www.expenseng.com/) is for the general public and provided in good faith for general information purposes. All contributors are developer interns at [HNGi7](https://hngi7.hng.tech/) learning software development.

## Analysing Twitter Content

This is how the bot will analyse Tweets, Twitter users, or their content:

- find Tweets containing tags and mentions of the app's Twitter handle "ExpenseNG" keyword
- find comments to its tweets
- find tweets with techniques outlined in the [Twitter API Docs](https://developer.twitter.com/en/docs/tutorials/consuming-streaming-data)

## Tweets, Retweets and Likes

This is how the bot will engage other Twitter users:

- Tweet messages and images referenced from opentreasury.gov.ng and/or expenseng.com
- respond with likes and/or Retweets when tagged in Tweets
- respond with likes or Retweets for comments in reply to its Tweets
- add hashtags and mentions of other Twitter users in its tweets, if such users are directly mentioned in original data at opentreasury.gov.ng
- have a maximum like/Tweet/Retweet rate tbd according to Twitter rules for automation
- even when mentioned, users may prevent the app from liking or Retweeting their Tweets with a keyword

## Off-Twitter Matching

Twitter content may be displayed off of Twitter in the following way:

- find comments to its tweets
- comments with specific keywords like `"ExpenseNGShare"` may be featured on [ExpenseNG.com](https://www.expenseng.com/)

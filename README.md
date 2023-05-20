# Declarative Time Tracker

Track your time using declarative text files, which you own and control, then use this website to display the results and view statistics. 

### Syntax

Declare an *activity* with `Activity: Activity_Name`. The site calculates a streak. You can set rest days in the activity name with `Activity: Activity_Name; Rest Days: Mon, Tues, Wed, ...` etc. 

You can include comments anywhere with `//`. 

Start a new *day* with `### YYYY/MM/DD`. Any activity entries must be underneath a day. 

Put the oldest day at the bottom and put newer days on top. 

*Activity entries* take the form `HH:MM - HH:MM, activity_name`. 

Example file: 

```timetracking.md
Activity: Web development, Rest days: Sat, Sun 
Activity: Reading
Activity: Writing

### 2023/05/18 // newest day at the top, oldest at the bottom 

7:45 AM - 9:15 AM, web development // case insensitive, but activity name must match declaration 
10:15 AM - 11:00 AM, reading
11:15 AM - 12:20 PM, writing 

### 2023/05/17

9:15 AM - 10:15 AM, web development
12:30 PM - 1:30 PM, writing

### 2023/05/16 

8:30 AM - 9:45 AM, web development
10:15 AM - 11:45 AM, reading 


```

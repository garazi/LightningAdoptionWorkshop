## Exercise 5: Create new Dreamhouse Lightning Console App

You can take advantage of Lightning App features by creating a Lightning version of your app. You can create a Lightning App with standard navigation from Setup | App Manager | Upgrade App, but we want to create a new Lightning Console app so we will create a brand new app from the App Manager in setup. 

* Setup | App Manager | New Lightning App 
    * App Details & Branding 
        * Name: Dreamhouse Console 
        * Developer Name: Dreamhouse_Console
        * Description: Console app for Lightning Dreamhouse Users
        * Logo: Downloaded SVG file from prep-work 
        * Primary Color Hex Value: #C41E1E
    * App Options
        * Console Navigation
        *  Next
    * Utility Bar
        * Add Utility Bar Item: Chatter Publisher
            * Label: Post to Chatter
            * Icon: feed
            * Panel Width: 340
            * Panel Height: 480
            * Type: Global
        * Add Utility Bar Item: Recent Items
            * Label: Recent Items
            * Icon: layers
            * Panel Width: 340
            * Panel Height: 340
            * Objects: Broker, Dashboard, Group, Property
            * Number of Records to Display: 5
        * Add Utility Bar Item: Notes
        * Next 
    * Select Items: 
        * Update Selected Items Column to include: 
            * Home
            * Chatter
            * Groups
            * Calendar
            * Properties
            * Brokers
            * Notes
            * Dashboards
            * Reports
        * Next
    * Assign to User Profiles:
        * Update Selected Profiles Column to include: 
            * Dreamhouse User
            * System Administrator
        * Save & Finish 

Now that we have created our new Lightning Console App, lets take a look at our app and customize the experience even more. 

1. App Launcher | Dreamhouse Console | Properties Tab
    1. Open a Property Record page
    2. Edit Page to enter the Lightning App Builder page 
        1. Drag the Path Component onto the page below the Highlights Panel 
    3. Select Details Tab and in the right sidebar, select Add Tab
        1. For new tab label select Custom Tab and use “Analytics”
        2. Done
    4. Click into this new tab, Analytics
        1. Drag the Report Chart component into the Analytics tab area
        2. Select the “Property Report” report
    5. Save
    6. Activate
    7. App Default | Assign as App Default | Dreamhouse Console | Save
    8. Click **Back** to revisit the record you were viewing. Notice the page layout has been modified to include Path & the Analytics Tab.
    9. To test the page assignment, use App Launcher | Dreamhouse Classic to return to your classic Dreamhouse App. Click into a property record, notice Path is not available on this page. 


Great Job! With clicks you went through the major phases of bringing a Classic App to Lightning Experience. Enabling an existing app and user for Lightning, creating a new Lightning App complete with features like Utility Bar, and assigning a customized record page experience to Lightning Apps. 



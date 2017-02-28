## Exercise 4:  Customize Business Processes and Report Charts  (30min)

 We can make Declarative customizations to help manage business processes and analytics and then use the Lightning App Builder to make those customizations visible to our end users in Lightning with Standard Lightning Components. For our Dreamhouse users, we are going to define a process for property status using Path and also modify a chart to add to the property page to help our users work with the property records in our next exercise. 

### Path

Path is a way to visually display the steps in a process, highlight key fields, and provide guidance such as handy links, policy information, and tips for users at each step. We can create a path based on any picklist field on the object to define the process we want to display.


1. Create a Path for the Property Object. 
    1. Setup | User Interface | Path Settings | New Path 
        1. Path Name: Property Path 
        2. API Reference Name: Property_Path
        3. Object: Property 
        4. Record Type:  — Master— 
        5. Picklist: Status
        6. Next 
    2. Step 2: Select Fields and Provide Guidance for Each Step in the Path 
        1. Status: Pre-Market 
            1. Fields: Assessed Value, Broker
            2. Guidance for Success: “Review the resources to help your client get ready to list their home!”
        2. Status: Listed
            1. Fields: Baths, Beds, Date Listed, Price
        3. Status: Under Contract
            1. Fields: Broker, Date Agreement
        4. Next 
    3. Step 3: Set the Status and Save
        1. Active
        2. Save

### Lightning Report Chart

Create a new Report Chart for Property data. We have a report chart that is useful for our users, and we want to make some small edits to the chart so that we can make it available to our users in their new Lightning App. With the Report Chart standard lightning component we can display report charts in Lightning Record pages, Home pages, App pages, and even the Utility Bar.

1. Report Tab | All Reports
    1. Open **Property Listings** Report
    2. Edit Chart to Display As:  Scatter Chart
    3. Edit drop-down | Save

We have created two new elements to add to our Property page with Standard Lightning Components, but we want to add them in the right place. We are going to create a brand new Lightning Console App for our Dreamhouse power users, and add these elements to the property record page for that Lightning App. 

##### On to **[Exercise 5](https://github.com/garazi/LightningAdoptionWorkshop/blob/master/docs/Exercise_d5.md)** 

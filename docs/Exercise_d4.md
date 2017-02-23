## Exercise 4:  Customize Business Processes and Report Charts

We have  business processes defined for our Property listings, and the Property Status has important business steps tied to it. Path is a way to visually display the steps in a process, highlight key fields, and provide guidance such as handy links, policy information, and tips to users at each step. When setting up a path, choose which of the object’s picklists steps in the path are based on. We are going to define this process for our end users with a new Path and also create a chart to add to the property page to help our end users work with the Property information in our next exercise. 


1. Create a Path for the Property Object. 
    1. Setup | Path | New Path 
        1. Path Name: Property Path 
        2. API Reference Name: Property_Path
        3. Object: Property 
        4. Record Type:  — Master— 
        5. Picklist: Status
        6. Next 
    2. Step 2: Select Fields and Provide Guidance for Each Step in the Path 
        1. Status: Pre-Market 
            1. Fields: Assessed Value, Broker
            2. Guidance for Success: 
        2. Status: Listed
            1. Fields: Baths, Beds, Date Listed, Price
        3. Status: Under Contract
            1. Fields: Broker, Date Agreement
        4. Next 
    3. Step 3: Set the Status and Save
        1. Active
        2. Save
2. Create a new Report Chart for Property data 
    1. Report Tab 
        1. Open** Property Listings **Report
        2. Select Chart Icon to display Report Chart
        3. Edit Chart to Display As:  Scatter Chart
        4. Save 

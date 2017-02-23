## Exercise 2: Evaluate Lightning, Create Permission Set & Enable Lightning 

1. Learn about Lightning, Enable Lightning for your org and define Lightning access for users 
    1. Preview what your org will look like in Lightning Experience
        1. Setup | Lightning Experience | Preview Your Org In Lightning Experience | **Preview** 
        2. Click around your environment in Lightning Experience. Go to the Properties Tab, click into a record. 
        3. App Launcher | Sales Lightning | Opportunities | All Opportunities | Click into an Opportunity 
        4. **Exit and Return to Migration Assistant **
    2. Review your Lightning Readiness Report 
        1. Setup | Lightning Experience | Check Your Lightning Experience Readiness | **Evaluate** 
    3. Create LEX Permission Set to grant Lightning Experience access to end users. 
        1. Setup | Manage Users | Permission Sets | **New**
            1. Label: Lightning Experience User
            2. API Name: Lightning_Experience_User
            3. License: —None--
            4. Save
        2. On the Permission Set page for Lightning Experience User Edit to add the Lightning Permission 
            1. System Section | Click **System Permissions**
            2. **Edit**
            3. Check box for: **Lightning Experience User**
            4. Save
        3. Now that you have created a Permission set, this is a good time to review who will have access to Lightning when you enable it!
            1. Setup | Manage Users | Users | **Randy Realtor **
                1. Your end user, Randy Realtor has the Dreamhouse User custom profile assigned. Take a look at the profile and check if it has Lightning Experience enabled. 
                2. User detail page | Profile | **Dreamhouse User **
                3. Scroll down the profile detail page and notice that Lightning Experience is not checked. This means that when you enable Lightning Experience for your org, Randy will only see the Lightning Experience when you assign him a profile or permission set with Lightning Experience enabled. 
                4. Since Randy does not have access to Lightning with his Custom Profile, we can assign him the Lightning Experience Permission Set. This allows us to grant Randy access to Lightning in a controlled rollout without modifying his custom profile.
                    1. User | Randy Realtor | Permission Set Assignments | Edit Assignment | Move **Lightning Experience User **to the Enabled Permission Sets column | Save 
    4. Now that you have reviewed access, it is time to enable Lightning and some Lightning related features. 
        1. Setup | Lightning Experience | Notes | Click the **Disabled** button to Enable Notes
        2. Setup | Lightning Experience | News | Click the Disabled button to Enable this feature. 
        3. Setup | Lightning Experience | Lightning Experience | Click the **Disabled** button | Finish Enabling Lightning Experience 


Your Org is now Lightning Enabled!

##### On to **[Exercise 3](https://github.com/garazi/LightningAdoptionWorkshop/blob/master/docs/Exercise_d3.md)** 

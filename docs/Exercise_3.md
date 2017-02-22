##Exercise 3 – Using a Visualforce page in a Lightning Experience page

###Exercise Goals

* Modifying a Lightning Experience Record Home Page with App Builder
* Adding a Visualforce page to an existing Lightning Record Home page

###Step 1 - Add a custom Visualforce page to a Standard Page Layout

1. Click the Setup menu and choose **Setup Home**.
2. In the left column, choose **Objects and Fields > Object Manager**.
3. Click Property.
4. Scroll down to the **Page Layouts** section and click **Propery Layout**.
5. In the **Property Layout** box at the top of the page, click **Visualforce Pages**.
6. Drag a new Section into the **Property Details** section and place it under the **Pictures** section.
7. Give the new section a name of **Similar Properties**, and choose a single column layout.
8. Click OK.
9. Drag the **SimilarProperties** tile from the **Property Layout** box and place it in the new section.
10. Click Save.
11. Navigate back to a Property Detail page in your org. Scroll down to see the Visualforce page in the new Similar Properties section.

###Step 2 - Make a Visualforce page available as a Lightning Component
1. Click the Setup menu and choose **Setup Home**.
2. In the Quick Find, type "visualforce".
3. Click **Visualforce Pages**.
4. Click the **Edit** action for your **SimilarProperties** page.
5. Check the box for **Available for Salesforce mobile apps and Lightning Pages**.
6. Click Save.

###Step 3 - Customize a Record Home page
1. Navigate back to a Property Detail page.
2. Click the Setup menu and choose **Edit page**.
2. Locate the **Visualforce** Lightning Component in the list of Standard Components in the Component List.
3. Drag the component onto the page and place it at the top of the right-hand column.
4. **SimilarProperties** should automatically be selected in the Visualforce pick list on the right-hand side of App Builder. If it is not, click the pick list to choose it.
5. In the Label field, type "Similar Properties" and press Tab.
6. Modify the Height field to be **250** and press Return.
7. Click the Save button.
8. Click the Activate button if this is the first time you've activated the page. Activate the page as the default for the org.
9. Click Save.
10. Click the Back button in the upper righthand corner of App Builder to return to the property page.
11. Notice that the Visualforce page is rather indented within the Card component.
12. In the Developer Console, add `applyBodyTag="false"` to the `<apex:page>` tag.
12. (Optional) Follow the instructions from Step 2 to go back and remove the **Similar Properties** section that you created.

###Step 4 - Modify the markup to match SLDS
1. This step is on your own, since you've just done it in Exercise 2.
2. Modify the page to deliver SLDS markup

###Solution - No Cheating!
1. If you are unsuccessful, no worries, simply copy [THIS FILE](https://raw.githubusercontent.com/garazi/LightningAdoptionWorkshop/master/Exercise_3/src/pages/Similar_Properties.page)
2. Replace the contents of the **SimilarProperties** in the Dev Console with the code you've just copied.

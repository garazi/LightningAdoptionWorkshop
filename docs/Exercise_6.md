## Exercise 6 – Using Components Everywhere

### Exercise Goals

* Understand how to useLightning Components as Quick Actions
* Add Lightning Components to the Utility Bar

### Step 1 - Add more Lightning Components to the Page

1. Navigate to a Property Record Detail page.
2. Click the Setup icon and choose **Edit Page**.
3. Drag the **NeighborhoodExplorer**, **Property Map** and **Picture Gallery** components onto the page and place them in the right-hand column.
4. Explore the components which highlight some of the possibilities with Lightning Components.

### Step 2 - Add a Lightning Component to the Utility Bar
1. Click the Setup icon and choose Setup.
2. Click on **Apps** and choose **App Manager**.
3. Click the Actions dropdown for Dreamhouse Classic Lightning and choose **Edit**.
4. Click the Utility Bar section at the top of the screen.
5. Click the **Add** button and scroll down to Mortgage Calculator.
6. Click Save.
7. Reload the Property Record Detail page to see the Mortgage Calculator in the Utility Bar.

### Step 3 - Make a Lightning Component a Quick Action
1. In the Dev Console, choose **File > Open Lightning Resources**.
2. Open the **Mortgage Calculator Card**.
3. In the component, add `force:lightningQuickActionWithoutHeader` to the **implements** attribute. Don't forget the comma to seperate the values from one another.
4. Save the file.
5. In **Setup**, choose **Objects and Fields**, then choose **Property**.
6. Scroll down to **Buttons, Links and Actions**.
7. Click the **New Action** button.
8. For Action, choose **Lightning Component**.
9. Notice that **MortgageCalculatorCard** is already selected. The list only shows components that have the **force:lightningQuickAction** or **force:lightningQuickActionWithoutHeader** interface.
10. Give the component a height of 400px.
11. Give the component a label of **Mortgage Calculator**.
11. Click on the Object Manager and choose Property again.
12. Scroll down to the **Page Layouts** section and click on the **Property Layout**.
13. Click the **override the predefined actions** link in the **Salesforce1 and Lightning Experience Actions** section.
14. In the **Property Layout** panel at the top of the page, click the **Salesforce1 and Lightning Actions** item.
15. Drag the Mortgage Calculator to the **Salesforce1 and Lightning Experience Actions** section as the first button.
16. Save the layout.
17. Reload the Property Record Detail page to see the new button.

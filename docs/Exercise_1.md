## Exercise 1 – Styling a Visualforce page for Lightning Experience

### Exercise Goals
* Understand how to quickly add the Lightning look and feel to an existing Visualforce page
* Add SLDS styles to the page

### Step 1 - Examine the Visualforce markup
1. Click on the Setup icon and open the Developer Console.
2. Choose File > Open Resource.
3. In the Search field, type "Dreamhouse" and select the Visualforce page named "DreamhouseLeads.vfp".
4. Notice this is a simple Visualforce page which displays a list of Leads.
5. Using Chrome, navigate to the custom Leads page in your org.
6. Right-click on the data table in the page and choose Inspect.
7. Locate the `<table>` tag and notice it has a class of **list**. Classes are CSS rules that define the look of the items on the page.

### Step 2 - Add the Salesforce Lightning Design System CSS
1. Switch back to the Developer Console.
2. Add a directive to include the CSS from SLDS in the page by adding a new line after the opening `<apex:page>` tag:

		<apex:slds />
		
3. Wrap the `<apex:pageBlock>` tag with a `<div>` with a class of **slds-scope**:

		<div class="slds-scope"> ... </div>
		
4. Add the following to the `<apex:page>` tag:

		standardStylesheets="false" applyBodyTag="false"
		
5. Add `styleClass="slds-table slds-table--bordered slds-table--cell-buffer"` to the `<apex:pageBlockTable>` tag. 
6. Save the page, and refresh it in the browser. You can see that styles have begun to be applied from SLDS.
		
##### On to [Exercise 2](Exercise_2.md)

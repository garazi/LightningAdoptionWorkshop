## Exercise 1 – Styling a Visualforce page for Lightning Experience

### Exercise Goals
* Understand how to quickly add the Lightning look and feel to an existing Visualforce page
* Create a custom, scoped version of the Salesforce Lightning Design System (SLDS)
* Add your custom SLDS files as a static resource
* Create a custom JavaScript file to add SLDS styles to the page

### Step 1 - Examine the Visualforce markup
1. Click on the Setup icon and open the Developer Console.
2. Choose File > Open Resource.
3. In the Search field, type "Dreamhouse" and select the Visualforce page named "DreamhouseLeads.vfp".
4. Notice this is a simple Visualforce page which displays a list of Leads.
5. Using Chrome, navigate to the custom Leads page in your org.
6. Right-click on the data table in the page and choose Inspect.
7. Locate the `<table>` tag and notice it has a class of **list**.

### Step 2 - Add the Salesforce Lightning Design System CSS
1. Switch back to the Developer Console.
2. Add a directive to include the CSS from SLDS in the page by adding a new line after the opening `<apex:page>` tag:

		<apex:slds />
		
3. Wrap the `<apex:pageBlock>` tag with a `<div>` with a class of **slds-scope**:

		<div class="slds-scope"> ... </div>
		
3. Add the following to the `<apex:page>` tag:

		standardStylesheets="false" applyBodyTag="false"
		
4. Save the page, and refresh it in the browser.
		
### Step 3 - Add stylesheets to the markup
1. 

### Step 2 - Add a custom JavaScript as a static resource
1. Save [**vflex.js**](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-2/Snippets/vflex.js) to your computer.
2. In Setup Home, navigate to the Static Resources section.
3. Click the **New** button to create a new static resource.
4. Give the resource a name of **vflex**.
5. Upload the **vflex.js** file that you saved.

### Step 3 - Add a reference to the custom JavaScript to the Visualforce page
1. Add a `<script>` tag to reference vflex.js as a static resource.
		
		<script src="{!URLFOR($Resource.vflex)}"></script>

2. Add `oncomplete="init();"` to the `<apex:actionSupport>` tag.
3. Save the page.
4. Refresh the custom Contact List page in your org.
		

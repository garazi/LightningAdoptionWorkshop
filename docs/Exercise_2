# Lightning Now Workshop

##Exercise 3 – Modifying the Visualforce markup for Lightning Experience

###Exercise Goals

* Understand how to modify a page for display in Classic and Lightning Experience
* Become familiar with the components and utility classes of the Salesforce Lightning Design System
* Understand how to use the markup from SLDS in a Visualforce page when rendered in Lightning Experience

###Step 1 - Add Conditional Logic to the page

1. In the Developer Console, remove the `<script src="{!URLFOR($Resource.vflex)}"></script>` from the SampleVF page.
2. Add a new line after the opening `<apex:page>` tag, and add the following:

		<apex:variable var="lightningDesktop" value="{! $User.UIThemeDisplayed == 'Theme4d'}" />
	
3. Wrap the `<apex:form>` with:

		<apex:outputPanel rendered="{! !lightningDesktop}"> ... </apex:outputPanel>
		
4. Add a new line after `</apex:outputPanel>`, and add:

		<apex:outputPanel rendered="{! lightningDesktop}">
		
		</apex:outputPanel>
		
5. Move the `<apex:slds />` tag that includes the SLDS CSS inside the new `<apex:outputPanel>` that you just created.
6. Add a reference to the Classic stylesheets on a new line in the **first** `<apex:outputPanel>`:

	```html
		<link class="user" href="/sCSS/38.0/sprites/1245343872000/Theme3/default/elements.css" rel="stylesheet" type="text/css" />
        <link  href="/sCSS/38.0/sprites/1251310209000/Theme3/dStandard.css" rel="stylesheet" type="text/css" />
    ```
    
7. **Copy** the entire `<apex:form>` and paste it after the `<apex:slds />` tag in the **second** `<apex:outputPanel>`.
8. Save the page.

###Step 2 - Explore the Salesforce Lightning Design System

1. Use your browser's Developer tools to examine the markup of the Visualforce page from the previous exercise.
2. Notice that the data is contained in a HTML table.
3. Navigate to the [Salesforce Lightning Design System](http://getslds.com) site.
4. Open the Components section and find the Data Tables section.
5. Copy the markup for the Basic Data Table.

###Step 3 - Update the Visualforce markup

1. Paste the markup into the Visualforce page inside the second `<apex:outputPanel>` tag, just before the closing `</apex:pageBlock>` tag.
2. Delete the second `<tr>` block in the `<tbody>`.
3. Change the title and text of each `<th>` in the `<thead>` to match the four columns of the `<apex:column>` elements.
4. Delete the remaining 3 `<th>` elements.
5. Change the `data-label` of each `<th>` and `<td>` in the `<tbody>` to correspond with the column titles in the `<thead>`.
6. Remove the remaining 3 `<td>` elements in the `<tbody>`.
7. Change the `title` and text of each `<div>` in the `<td>` of the `<tbody>`.
8. Remove the `<a href="javascript:void(0);">` from the `<th>` and its closing `</a>` tag.
9. Wrap the `<tr>` of the `<tbody>` with:

		<apex:repeat value="{! contacts }" var="ct"> ... </apex:repeat>

10. Remove the `<apex:pageBlockTable>`.

###Step 5 - Adding more SLDS styling
1. Wrap the **contents** of the `<apex:pageBlock>` with:

	```html
	<div class="slds-card"> ... </div>
	```
	
2. Remove `title="Contact List"` from the `<apex:pageBlock>`.
3. Add the following after the opening `<div class="slds-card">` tag:

	```html
	<div class="slds-card__header">                    
        <h2 class="slds-text-heading--small">
        Contacts List
        </h2> 
   </div>
	```

4. Wrap the `<apex:outputLabel>` and the `<apex:selectList>` with:

		<div class="slds-form slds-m-left--large slds-m-bottom--small slds-size--1-of-6"> ... </div>

5. Add `styleClass="slds-form-element__label"` to the `<apex:outputLabel>`.
6. Wrap the `<apex:selectList>` with:

		<div class="slds-select_container"> ... </div>

7. Add `styleClass="slds-select"` to the `<apex:selectList>` tag.
8. Remove the `oncomplete="init()"` from the `<apex:actionSupport>` tag.
9. Save the page and reload the page in your org.
10. Switch to Salesforce Classic to see the page rendered with the Classic styling.
11. Switch back to Lightning.

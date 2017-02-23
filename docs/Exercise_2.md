##Exercise 2 – Modifying the Visualforce Markup for Lightning Experience

#### [<<< Back to Exercise 1](README.md)

###Exercise Goals

* Understand how to modify a page for display in Classic and Lightning Experience
* Become familiar with the components and utility classes of the Salesforce Lightning Design System
* Understand how to use the markup from SLDS in a Visualforce page when rendered in Lightning Experience

###Step 1 - Add Conditional Logic to the page

1. In the Developer Console, open the Leads page from the previous exercise if it is not already open.
2. Add a new line after the opening `<apex:page>` tag, and add the following:

		<apex:variable var="lightningDesktop" value="{! $User.UIThemeDisplayed == 'Theme4d'}" />
	
3. Wrap the **contents** of the `<apex:pageBlock>` with:

		<apex:outputPanel rendered="{! !lightningDesktop}"> ... </apex:outputPanel>
		
4. Add a new line after `</apex:outputPanel>`, and add:

```html
		<apex:outputPanel rendered="{! lightningDesktop}">
			<apex:form>
			
			</apex:form>
		</apex:outputPanel>
```
		
5. Move the `<apex:slds />` tag that includes the SLDS CSS inside the new `<apex:outputPanel>`, just before the `<apex:form>` that you just created.
6. Add a reference to the Classic stylesheets on a new line in the **first** `<apex:outputPanel>`:

```html
		<link class="user" href="/sCSS/38.0/sprites/1245343872000/Theme3/default/elements.css" rel="stylesheet" type="text/css" />
        <link  href="/sCSS/38.0/sprites/1251310209000/Theme3/dStandard.css" rel="stylesheet" type="text/css" />
```
    
7. Save the page.

###Step 2 - Explore the Salesforce Lightning Design System

1. Navigate to the [Salesforce Lightning Design System](http://getslds.com) site.
2. Open the Components section and find the Page Headers section.
3. Add the following code after the `<apex:slds />` tag:

```html
	<div class="slds-scope">
   		<div class="slds-page-header">
   		
   		</div>
	</div>
```

4. Add `<div class="slds-grid"></div>` inside of the `<div class="slds-page-header">` that you just created.
5. Paste the following code, which is a piece of the Page Headers component from Salesforce Lightning Design System, inside the `<div class="slds-grid">`:

```html
	<div class="slds-col slds-has-flexi-truncate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <div class="slds-media slds-no-space slds-grow">
        <div class="slds-media__figure">
          <svg class="slds-icon slds-icon-standard-user" aria-hidden="true">
            <use xlink:href="{!URLFOR($Asset.SLDS, 'assets/icons/standard-sprite/svg/symbols.svg#lead')}"></use>
          </svg> 
        </div>
        <div class="slds-media__body">
          <p class="slds-text-title--caps slds-line-height--reset">Record Type</p>
          <h1 class="slds-page-header__title slds-m-right--small slds-align-middle slds-truncate" title="this should match the Record Title">Record Title</h1>
        </div>
      </div>
    </div>
```
    
6. Go back to the Salesforce Lightning Design System site, and locate the Data Tables in the Components' section.

###Step 3 - Update the Visualforce markup to use a SLDS Data Table

1. Add `<apex:pageBlock id="leads_list" > ... </apex:pageBlock>` into the Visualforce page just before the final `</div>` tag.
2. Paste the following markup inside the `<apex:pageBlock id="leads_list">`:

	```html
	<table class="slds-table slds-table--bordered slds-table--cell-buffer">
	  <thead>
	    <tr class="slds-text-title--caps">
	      <th scope="col">
	        <div class="slds-truncate" title="First Name">First Name</div>
	      </th>
	      <th scope="col">
	        <div class="slds-truncate" title="Last Name">Last Name</div>
	      </th>
	      <th scope="col">
	        <div class="slds-truncate" title="Email">Email</div>
	      </th>
	      <th scope="col">
	        <div class="slds-truncate" title="Phone">Phone</div>
	      </th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <th scope="row" data-label="First Name">
	        <div class="slds-truncate" title="{! ct.FirstName }"><apex:outputLink value="/{! ct.Id}">{! ct.FirstName }</apex:outputLink></div>
	      </th>
	      <td data-label="Account Name">
	        <div class="slds-truncate" title="{! ct.LastName }">{! ct.LastName }</div>
	      </td>
	      <td data-label="Email">
	        <div class="slds-truncate" title="{! ct.Email }">{! ct.Email }</div>
	      </td>
	      <td data-label="Phone">
	        <div class="slds-truncate" title="{! ct.Phone }">{! ct.Phone }</div>
	      </td>
	    </tr>
	  </tbody>
	</table>
	```

2. Wrap the `<tr>` inside of the `<tbody>` with:

		<apex:repeat value="{! leads }" var="ct"> ... </apex:repeat>

3. Save the page and reload it in your org.

###Step 5 - Adding more SLDS styling to the SelectList

1. Paste the following code just before the `</div><table>` tags:

	```html
	<div class="slds-col slds-no-flex slds-grid slds-align-top">
   		<apex:commandButton action="{!URLFOR($Action.Lead.New)}" value="New" styleClass="slds-button slds-button--neutral"/>
   	</div>
	```
	
2. Paste the following before the `</div>` which precedes `<div class="slds-col slds-no-flex slds-grid slds-align-top">` that you just pasted into the doc:

```html
	<div class="slds-grid slds-grid--vertical-align-end slds-m-vertical--small">
	    <div class="slds-size--1-of-6 ">
       	<apex:outputLabel value="Sort: " for="sortList" />
	      	<div class="slds-select_container">
          	<apex:selectList value="{! sortOrder}" size="1" id="sortList">
             		<apex:selectOption itemvalue="LastName" />
                	<apex:selectOption itemvalue="FirstName" />
             </apex:selectList>
          </div>
      	</div>
	   	<div class="slds-no-flex">
	        <apex:commandButton value="Sort" action="{!sortList}" reRender="leads_list" />
	    </div>
	</div>
```

5. Add `styleClass="slds-form-element__label"` to the `<apex:outputLabel>` tag.
6. Add `styleClass="slds-select"` to the `<apex:selectList>` tag.
7. Add `styleClass="slds-select"` to the `<apex:commandButton>` tag.
9. Save the page and reload the page in your org.
10. Switch to Salesforce Classic to see the page rendered with the Classic styling.
11. Switch back to Lightning.


##### On to **[Exercise 3](https://github.com/garazi/LightningAdoptionWorkshop/blob/master/docs/Exercise_3.md)**

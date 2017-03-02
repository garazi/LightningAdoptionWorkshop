##Exercise 2 – Modifying the Visualforce Markup for Lightning Experience

#### [<<< Back to Exercise 1](README.md)

###Exercise Goals

* Understand how to modify a page for display in Classic and Lightning Experience
* Become familiar with the components and utility classes of the Salesforce Lightning Design System
* Understand how to use the markup from SLDS in a Visualforce page when rendered in Lightning Experience

###Step 1 - Add Conditional Logic to the page

1. In the Developer Console, open the Leads page from the previous exercise if it is not already open.
2. Remove the `styleClass="slds-table slds-table--bordered slds-table--cell-buffer"` that you added to the `<apex:pageBlockTable>` in the previous exercise.
3. Remove the `<apex:slds />` tag.
4. Remove the opening and closing `<div class="slds-scope">` tags.
5. Add a new line after the opening `<apex:page>` tag, and add the following:

		<apex:variable var="lightningDesktop" value="{! $User.UIThemeDisplayed == 'Theme4d'}" />
	
6. Wrap the **contents** of the `<apex:pageBlock>` with:

		<apex:outputPanel rendered="{! !lightningDesktop}"> ... </apex:outputPanel>

7. Add a reference to the Classic stylesheets on a new line in the **first** `<apex:outputPanel>`:

	```html
	<link class="user" href="/sCSS/38.0/sprites/1245343872000/Theme3/default/elements.css" rel="stylesheet" type="text/css" />
   <link  href="/sCSS/38.0/sprites/1251310209000/Theme3/dStandard.css" rel="stylesheet" type="text/css" />
	```
    
9. Save the page.
10. If you are unsure that your markup is correct, then, in the Dev Console, select all and delete. Then paste the following back into the page:

	```html
	<apex:page controller="DreamhouseProspects">
	    <apex:variable var="lightningDesktop" value="{! $User.UIThemeDisplayed == 'Theme4d'}" />
	    <apex:outputPanel rendered="{! !lightningDesktop}">
		    <link class="user" href="/sCSS/38.0/sprites/1245343872000/Theme3/default/elements.css" rel="stylesheet" type="text/css" />
		    <link  href="/sCSS/38.0/sprites/1251310209000/Theme3/dStandard.css" rel="stylesheet" type="text/css" />
	        <apex:pageBlock >
	            <apex:sectionHeader title="Leads" subtitle="Home"/>
	            <apex:form >
	                <div style="text-align:center;">
	                    <apex:commandButton action="{!URLFOR($Action.Lead.New)}" value="New"/>
	                </div>
	                <apex:outputLabel value="Sort: " for="sortList" />
	                <apex:selectList value="{! sortOrder}" size="1" id="sortList">
	                    <apex:selectOption itemvalue="LastName" />
	                    <apex:selectOption itemvalue="FirstName" />
	                </apex:selectList>
	                <apex:commandButton value="Sort Table" action="{!sortList}" reRender="leads_list"/>
	                <apex:pageBlockTable value="{! leads }" var="ct" id="leads_list">
	                    <apex:column headerValue="First Name">
	                        <apex:outputLink value="/{! ct.Id}">{! ct.FirstName }</apex:outputLink>
	                    </apex:column>
	                    <apex:column value="{! ct.LastName }"/>
	                    <apex:column value="{! ct.Email }"/>
	                    <apex:column value="{! ct.Phone }"/>
	                </apex:pageBlockTable>              
	            </apex:form>
	        </apex:pageBlock>
	     </apex:outputPanel>
	</apex:page>
	```

###Step 2 - Explore the Salesforce Lightning Design System

1. Add a new line after the `</apex:outputPanel>` and before `</apex:page>` tags at the bottom of the page.
2. Paste the following on the new line:

	```html
	<apex:outputPanel rendered="{! lightningDesktop}">
        <apex:slds />
        <div class="slds-scope">
            <apex:form >
                <div class="slds-page-header">
                    <div class="slds-grid">
                    	  <!-- Step 2.4 here -->
                    	  
                    </div>
                </div>
                <!-- Step 3.1 here -->
                
            </apex:form>
        </div>
    </apex:outputPanel>
	```
3. Navigate to the [Salesforce Lightning Design System](http://getslds.com) site.
4. Open the Components section and find the Page Headers section.
5. Paste the following code, which is a piece of the Page Headers component from Salesforce Lightning Design System, inside the `<div class="slds-grid">` on the blank line after the comment `<!-- Step 2.4 here -->`:

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
    
5. Go back to the Salesforce Lightning Design System site, and locate **Data Tables** in the Components' section.

###Step 3 - Update the Visualforce markup to use a SLDS Data Table

1. Paste the following markup on the blank line following `<!-- Step 3.1 here -->`:

	```html
	<apex:pageBlock id="leads_list" >
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
                <apex:repeat value="{! leads }" var="ct">
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
                </apex:repeat>
            </tbody>
        </table>
   </apex:pageBlock>
	```

2. Save the page and reload it in your org.

###Step 5 - Adding more SLDS styling to the SelectList

1. Select the entire `<div class="slds-page-header"> ... </div>` tag and replace it with:

	```html
	<div class="slds-page-header">
        <div class="slds-grid">
            <div class="slds-col slds-has-flexi-truncate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <div class="slds-media slds-no-space slds-grow">
                    <div class="slds-media__figure">
                        <svg class="slds-icon slds-icon-standard-user .slds-icon--small" aria-hidden="true">
                            <use xlink:href="{!URLFOR($Asset.SLDS, 'assets/icons/standard-sprite/svg/symbols.svg#lead')}"></use>
                        </svg> 
                    </div>
                    <div class="slds-media__body">
                        <p class="slds-text-title--caps slds-line-height--reset">Lead</p>
                        <h1 class="slds-page-header__title slds-m-right--small slds-align-middle slds-truncate" 
                            title="this should match the Record Title">Home</h1>
                    </div>
                </div>
                <div class="slds-grid slds-grid--vertical-align-end slds-m-vertical--small">
                    <div class="slds-size--1-of-6 ">
                        <apex:outputLabel value="Sort: " for="sortList" styleClass="slds-form-element__label" />
                        <div class="slds-select_container">
                            <apex:selectList value="{! sortOrder}" size="1" id="sortList" styleClass="slds-select">
                                <apex:selectOption itemvalue="LastName" />
                                <apex:selectOption itemvalue="FirstName" />
                            </apex:selectList>
                        </div>
                    </div>
                    <div class="slds-no-flex">
                        <apex:commandButton value="Sort" action="{!sortList}" reRender="leads_list" styleClass="slds-button slds-button--neutral"/>
                    </div>
                </div>
            </div>
            <div class="slds-col slds-no-flex slds-grid slds-align-top">
                <apex:commandButton action="{!URLFOR($Action.Lead.New)}" value="New" styleClass="slds-button slds-button--neutral"/>
            </div>
        </div>
   </div>
	```

2. Save the page and reload the page in your org.
3. Switch to Salesforce Classic to see the page rendered with the Classic styling.
4. Switch back to Lightning.
5. If, for some reason, you were unsuccessful with the exercise delete the entire contents of the page, and replace it with the contents (Select All / Copy) of [this page](https://raw.githubusercontent.com/garazi/LightningAdoptionWorkshop/master/Exercise_2/src/pages/DreamhouseLeads.page).


##### On to **[Exercise 3](Exercise_3.md)**

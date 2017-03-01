##Exercise 5 – Creating a "Similar Properties" Lightning Component

###Exercise Goals

* Retrieving and displaying data in a Lightning Component
* Understand how to replace standard `<apex:*>` functionality in Lightning Components
* Explore concepts of navigating to and editing records within a Lightning Component
* Leverage Lightning Data Service to read and update records without an Apex Controller
* Create Design Parameters for use in App Builder

###Step 1 - Create a new Lightning Component

1. Create a new Lightning Component using the Dev Console (File > New > Lightning Component).
2. Give the component a name of **SimilarProperties**.
3. Click the **Lightning Record Page** checkbox, then click OK.

###Step 2 - Preparing for data
1. Copy the following code into your new component after the opening `<aura:component>` tag:

	```html
	<aura:attribute name="recordId" type="Id" />
	<aura:attribute name="similarProperties" type="Object[]" />
	<ul class="slds-list--vertical slds-has-dividers--top-space">
		<aura:iteration items="{!v.similarProperties}" var="item" indexVar="i">
        <li class="slds-list__item">                   
            {!item.Name}
        </li>
        </aura:iteration>
    </ul>
	```
		
2. Save the component.
3. Switch back to a Property Record Detail page, click the Setup menu and choose **Edit Page**.
4. Click the **Hello World** component from the previous exercise and delete it from the page.
5. Locate the new **SimilarProperties** component in the Component List and drag it onto the page at the top of the right-hand column. Don't worry that nothing appears on the page - we will solve that in the next step.
6. Click **Save** and then click the Back button to return to the Property Record Detail page.

###Step 3 - Creating a controller
1. Create a new line after the `<aura:attribute>` tag on line 3 and paste:

		<aura:handler name="init" value="{!this}" action="{!c.doInit}" />
		
2. Click the Controller button in the Dev Console to create a controller for the component so that we can create the **doInit** function.
3. Delete the contents of the controller.
4. Paste the following code into the controller:

	```js
	({
		doInit : function(component, event, helper) {
	        var recId = component.get("v.recordId");
	        var action = component.get("c.getSimilarProperties");
	        action.setParams({
	            recordId: recId
	        });
	        action.setCallback(this, function(response){
	            var res = response.getReturnValue();
	            component.set("v.similarProperties", res);
	        });
	        $A.enqueueAction(action);
	    }
	})
	```

4. Save the file.

###Step 4 - Creating an Apex Class
1. In the Dev Console, choose **File > New > Apex Class**.
2. Name the class **GetSimilarPropertiesApexController**.
3. Select all in the new document, and replace it with:

	```java
	public class GetSimilarPropertiesApexController {
	    @AuraEnabled
	    public static List<Property__c> getSimilarProperties (Id recordId) {
	            List<Property__c> beds = [
	                SELECT Beds__c FROM Property__c WHERE Id=:recordId
	            ];
	            List<Property__c> properties = getThePropertiesByBeds(recordId, beds[0].Beds__c);
	            return properties;
	    }
	    
	    private static List<Property__c> getThePropertiesByBeds (Id myProp, Decimal beds) {
	        List<Property__c> properties = [
	            SELECT Id, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c FROM Property__c WHERE Id != :myProp AND Beds__c = :beds
	        ];
	        return properties;
	    }
	}
	```

4. Save the Apex Class. 
5. Switch back to the SimilarProperties component and add `controller="GetSimilarPropertiesApexController"` to the `<aura:component>` in front of the `implements=` attribute.
6. Save the file.
7. Go back to the Property Record Detail page and refresh to see data populating the component.

###Step 5 - Add additional styling
1. Replace `{!item.Name}` on line 7 (unless your line numbers vary) with:

	```html
	<div class="slds-media">
	    <div class="slds-media__figure">
	        <img src="{!item.Thumbnail__c}" class="slds-avatar--large slds-avatar--circle" alt="{!item.Title_c}" />
	    </div>
	    <div class="slds-media__body">
	        <div class="slds-grid" >
	            <a data-record="{!item.Id}" onclick="{!c.navToRecord}">
	                <h3 class="slds-text-heading--small slds-m-bottom--xx-small">{!item.Name}</h3>
	            </a>
	            <!-- Step 7.2 here -->                             
	        </div>
	        <div class="slds-m-top--small">
	            <ul class="slds-grid slds-wrap">
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Beds:</span> {!item.Beds__c}</li>
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Baths:</span> {!item.Baths__c}</li>
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Price:</span> {!item.Price__c}</li>
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Status:</span> {!item.Status__c}</li>
	            </ul>                                
	        </div>
	    </div>
	</div>
	```
		
2. Save the file.
3. Refresh the Property Record Detail page.

###Step 6 - Navigating to a Record
1. Switch back to the Developer Console.
2. In the **SimilarProperties** controller, add the following (don't forget to add a comma to seperate the function definitions -- we are starting to get to the tricky parts!):

	```js
    navToRecord : function (component, event, helper) {
	    var selectedItem = event.currentTarget;
	    var recId = selectedItem.dataset.record;
	    var navEvt = $A.get("e.force:navigateToSObject");
	    navEvt.setParams({
	        "recordId": recId
	    });
	    navEvt.fire();
    }	
	```

3. Save the file.
4. Reload the Property Record Detail page, and click on a Property title in the component.

###Step 7 - Editing a "Remote" Record
1. In the Developer Console, switch back to the SimilarProperties component markup.
2. Add the following the `</a>` tag in place of the comment `<!-- Step 7.2 here -->`:

	```html
	<lightning:buttonIcon iconName="utility:edit" class="slds-col--bump-left" variant="bare" alternativeText="Edit Record" onclick="{!c.editRecord}" value="{!item.Id}" />
	```
	
3. Save the file.
4. Add the following to the SimilarProperties controller (again, remember the comma to seperate the functions):

	```js
	editRecord : function(component, event, helper) {
        var recId = event.getSource().get("v.value");
        console.log("rec: ", recId)
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recId
        });
        editRecordEvent.fire(); 
    }
	```
	
5. Save the file.
6. Reload the Property Record Detail page, and click the edit icon in the component.
7. In case you are having problems, your **SimilarPropertiesController.js** file should look like this (i.e. if it doesn't, then Select All and replace with this):

	```js
	({
	    doInit : function(component, event, helper) {
	        var recId = component.get("v.recordId");
	        var action = component.get("c.getSimilarProperties");
	        action.setParams({
	            recordId: recId
	        });
	        action.setCallback(this, function(response){
	            var res = response.getReturnValue();
	            console.log("foo: ", res)
	            component.set("v.similarProperties", res);
	        });
	        $A.enqueueAction(action);
	    },
	    navToRecord : function (component, event, helper) {
		    var selectedItem = event.currentTarget;
		    var recId = selectedItem.dataset.record;
		    var navEvt = $A.get("e.force:navigateToSObject");
		    navEvt.setParams({
		        "recordId": recId
		    });
		    navEvt.fire();
	    },
	    editRecord : function(component, event, helper) {
	        var recId = event.getSource().get("v.value");
	        console.log("rec: ", recId)
	        var editRecordEvent = $A.get("e.force:editRecord");
	        editRecordEvent.setParams({
	            "recordId": recId
	        });
	        editRecordEvent.fire(); 
	    }
	})
	```

###Step 8 - Final Cosmetic Touches
1. Wrap the outermost `<ul>` (probably line 5, ending on line 31 -- prior to pasting) with:

```html
	<lightning:card iconName="custom:custom85" title="Similar Properties">
   		<div class="slds-p-left--medium slds-p-right--medium">
   			*** THE CURRENT CONTENTS ARE HERE ***
   		</div>
   	</lightning:card>
```

2. Save the file, and reload the Property Record Detail page.

###Step 9 - Adding an Icon
1. In the Developer Console, click on the Design tile on the right-hand side of the window.
2. In a new browser tab, navigate back to the [SLDS site](http://getslds.com).
3. Navigate to the Icons section of the site.
4. Scroll down to locate custom85 in the Custom section of icons.
5. **(Informational Only)** Normally, you would click on the Downloads link in the navigation panel, and then scroll down to the Icons section and click the Download button.
6. **(Informational Only)** After navigating to the downloaded zip file and unzipping it, open the folder and then open the custom folder. 
7. **(Informational Only)** Locate the custom85.svg file and open it in a text editor.
8. **(Informational Only)** Copy the `<path>` tag from the SVG.
9. **(Informational Only)** In the Developer Console, switch to SimilarProperties.svg.
10. **(Informational Only)** Replace the second `<path>` tag with the one you just copied.
11. **(Informational Only)** At the beginning of the `<path>` you just pasted, add fill="#fff" before the "d" attribute.
12. **(Informational Only)** Change `width="120px" height="120px" viewBox="0 0 120 120"` in the `<svg>` tag to:

	```xml
	width="100px" height="100px" viewBox="0 0 100 100"
	```
13. **(Informational Only)** Change the fill of the first `<path>` to `#F26891`.
14. Select all and replace the .svg file in the Dev Console with: 

	```svg
	<?xml version="1.0" encoding="UTF-8" standalone="no"?>
	<svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<path d="M120,108 C120,114.6 114.6,120 108,120 L12,120 C5.4,120 0,114.6 0,108 L0,12 C0,5.4 5.4,0 12,0 L108,0 C114.6,0 120,5.4 120,12 L120,108 L120,108 Z" id="Shape" fill="#2A739E"/>
			<path fill="#FFF" d="m78 24h-50v-2c0-1.1-0.9-2-2-2h-4c-1.1 0-2 0.9-2 2v56c0 1.1 0.9 2 2 2h4c1.1 0 2-0.9 2-2v-46h50c1.1 0 2-0.9 2-2v-4c0-1.1-0.9-2-2-2z m-4 14h-34c-3.3 0-6 2.7-6 6v22c0 3.3 2.7 6 6 6h34c3.3 0 6-2.7 6-6v-22c0-3.3-2.7-6-6-6z m-5.5 17h-2.5v10c0 0.6-0.4 1-1 1h-4c-0.6 0-1-0.4-1-1v-6c0-0.6-0.4-1-1-1h-4c-0.6 0-1 0.4-1 1v6c0 0.6-0.4 1-1 1h-4c-0.6 0-1-0.4-1-1v-10h-2.5c-0.5 0-0.7-0.6-0.3-0.9l11.2-10.9c0.4-0.3 0.9-0.3 1.3 0l11.2 10.9c0.3 0.3 0.1 0.9-0.4 0.9z"></path>
		</g>
	</svg>
	```

15. Save the file.

###Step 10 - Adding Design Parameters
1. On the Property Record Detail page, click the Setup icon and choose **Edit Page**.
2. Click on the SimilarProperties component on the page and **delete it**.
3. Click the Save button and then navigate back to the Property Record Detail page.
4. In the SimilarProperties component markup in the Developer Console, make a new line between lines 3 and 4 following the last `<aura:attribute>` and paste:

```html
	<aura:attribute name="searchCriteria" type="String" />
```

4. Update the **title** attribute of the `<lightning:card>` tag to `title="{! 'Similar Properties by ' + v.searchCriteria}"`.
5. Save the file.
6. Click the Design tile on the right-hand side of the window.
7. Replace the contents of the file with:

	```xml
	<design:component label="Similar Properties">
		<sfdc:objects>
		    <sfdc:object>Property__c</sfdc:object>
		</sfdc:objects>
		<design:attribute name="searchCriteria" label="Search By" datasource="Beds, Price" default="Beds" description="Search for similar houses based on what criteria?" />
	</design:component>
	```

8. Save the file.
9. On the **Property Record Detail page**, click the **Setup icon** and choose **Edit page**.
10. Notice the icon for your component and it's name now contains a space (this is the label from the design file.
11. Drag the component back into the right-hand column.
12. Notice the right-hand column now contains design parameters for the search criteria.
13. Switch the search criteria to **Price** and notice that nothing happens. That's because we now need to update our component and Apex Class to handle the switch of criteria.
14. Click **Save**, then navigate back to the Property Record Detail page.

###Step 11 - Updating the Controllers to Handle the New Search Criteria
1. Switch back to the Dev Console and open the **SimilarProperties** controller.
2. Add a new line after the `var recId` line of code on line 3 and paste:

	```js
	var compValue = component.get("v.searchCriteria");	
	```
	
3. Pass the variable to the action by updating the action's parameters (now line 6) to:

	```js
	action.setParams({
        recordId: recId,
        searchCriteria: compValue
    });
	```
	
4. Save the file(s).
5. Open the **GetSimilarPropertiesApexController** file in the Dev Console, if it is not already open (File > Open Resource).
6. Select all, then delete. Update the contents by pasting the following:

	```java
	public class GetSimilarPropertiesApexController {
	    @AuraEnabled
	    public static List<Property__c> getSimilarProperties (Id recordId, String searchCriteria) {
	        if (searchCriteria == 'Beds') {
	            List<Property__c> beds = [
	                SELECT Beds__c FROM Property__c WHERE Id=:recordId
	            ];
	            List<Property__c> properties = getThePropertiesByBeds(recordId, beds[0].Beds__c);
	            return properties;
	        } else {
	            List<Property__c> price = [
	                SELECT Price__c FROM Property__c WHERE Id=:recordId
	            ];
	            List<Property__c> properties = getThePropertiesByPrice(recordId, price[0].Price__c);
	            return properties;
	        }
	    }
	    
	    private static List<Property__c> getThePropertiesByBeds (Id myProp, Decimal beds) {
	        List<Property__c> properties = [
	            SELECT Id, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c FROM Property__c WHERE Id != :myProp AND Beds__c = :beds
	        ];
	        return properties;
	    }
	    
	    private static List<Property__c> getThePropertiesByPrice (Id myProp, Decimal price) {
	        List<Property__c> properties = [
	            SELECT Id, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c FROM Property__c WHERE Id != :myProp AND Price__c < :price + 100000 AND Price__c > :price - 100000
	        ];
	        return properties;
	    }
	}
	```
	
7. Save the file.
8. Refresh the Property Record Detail page. Notice the properties change. 

###Step 12 - Leverage force:recordPreview to Bind the Data
1. In the Developer Console, switch to the **SimilarProperties** component markup.
2. Add a new line following the last `<aura:attribute>` on line 4 and paste:

	```html
	<aura:attribute name="property" type="Property__c" />
	```

3. Make another new line below the `<aura:handler>` (currently line 6) tag and add:

	```html
	<force:recordPreview aura:id="propertyService"
                 recordId="{!v.recordId}"
                 targetRecord="{!v.property}"
                 recordUpdated="{!c.doSearch}"
                 layoutType="FULL" /> 
	```

4. Save the file.
5. Click on the Helper tile on the right-hand side of the Developer Console.
6. Select all and delete the default contents of the Helper.
7. Paste the following into the helper:

	```js
	({
		getProps : function(component) {
			var recId = component.get("v.recordId");
	        var compValue = component.get("v.searchCriteria");
	        var action = component.get("c.getSimilarProperties");
	        action.setParams({
	            recordId: recId,
	            searchCriteria: compValue
	        });
	        action.setCallback(this, function(response){
	            var res = response.getReturnValue();
	            component.set("v.similarProperties", res);
	        });
	        $A.enqueueAction(action);
		}
	})
	```

8. Switch to the SimilarProperties controller tab.
9. Replace the contents of the **doInit** function with:

	```js
		helper.getProps(component);
	```

10. Add a new function **doSearch** to the controller (remember the commas to seperate the functions):

	```js
	doSearch : function (component, event, helper) {
        helper.getProps(component);
    }
	```
	
11. Save the file.
12. In case you aren't sure, or something went wrong, your **SimilarPropertiesController.js** file should now look like:

	```js
	({
	    doInit : function(component, event, helper) {
	        helper.getProps(component);
	    },
	    doSearch : function (component, event, helper) {
	        helper.getProps(component);
	    },
	    navToRecord : function (component, event, helper) {
	        var selectedItem = event.currentTarget;
	        var recId = selectedItem.dataset.record;
	        var navEvt = $A.get("e.force:navigateToSObject");
	        navEvt.setParams({
	            "recordId": recId
	        });
	        navEvt.fire();
	    },
	    editRecord : function(component, event, helper) {
	        var recId = event.getSource().get("v.value");
	        console.log("rec: ", recId)
	        var editRecordEvent = $A.get("e.force:editRecord");
	        editRecordEvent.setParams({
	            "recordId": recId
	        });
	        editRecordEvent.fire(); 
	    }
	})
	```
	
13. Reload the Property Record Detail page.
14. Change the Price of the Record to be +/- more than 100000.
15. Click Save and watch the Similar Properties component update.

###Step 13 - Add a Custom Edit View
1. In the Dev Console, switch back to the **SimilarProperties** component markup.
2. Add a new line at the bottom of the document between the `</lightning:card>` and `</aura:component>` tags and paste:

	```html
	<div aura:id="editDialog" role="dialog" tabindex="-1" aria-labelledby="header43" class="slds-modal slds-fade-in-open slds-hide">
        <div class="slds-modal__container">
            <div class="slds-modal__header">
                <button class="slds-button slds-modal__close " title="Close" onclick="{!c.closeButton}">
                    <lightning:icon iconName="utility:close" variant="bare" ></lightning:icon>
                    <span class="slds-assistive-text">Close</span>
                </button>
                <h2 id="header43" class="slds-text-heading--medium">Edit Record</h2>
            </div>
            <div class="slds-modal__content slds-p-around--medium slds-grid slds-wrap slds-grid--align-spread">
                <lightning:input aura:id="propName" name="propName" label="Property Name" required="true" value="{!v.selectedProperty.Name}" class="slds-size--1-of-1 slds-p-horizontal--x-small" />
                <lightning:input aura:id="propBeds" name="propBeds" label="Beds" value="{!v.selectedProperty.Beds__c}" class="slds-size--1-of-2 slds-p-horizontal--x-small" />
                <lightning:input aura:id="propBaths" name="propBaths" label="Baths" value="{!v.selectedProperty.Baths__c}" class="slds-size--1-of-2 slds-p-horizontal--x-small" />
                <lightning:input aura:id="propPrice" name="propPrice" label="Price" value="{!v.selectedProperty.Price__c}" class="slds-size--1-of-2 slds-p-horizontal--x-small" />
                <lightning:input aura:id="propStatus" name="propStatus" label="Status" value="{!v.selectedProperty.Status__c}" class="slds-size--1-of-2 slds-p-horizontal--x-small" />
            </div>
            <div class="slds-modal__footer">
                <button class="slds-button slds-button--neutral" onclick="{!c.closeButton}">Cancel</button>
                <button class="slds-button slds-button--brand" onclick="{!c.saveRecord}">Save</button>
            </div>
        </div>
    </div>
    <div aura:id="overlay" class="slds-backdrop slds-backdrop--open slds-hide"></div>
	```
3. Save the file.
4. Switch to the **SimilarProperties** helper tab.
5. Add a comma after the `}` on **line 15** and then tap Return to add a new line. Paste the following:

	```js
	showHideModal : function(component) {
        var modal = component.find("editDialog");
        $A.util.toggleClass(modal, 'slds-hide');
        var overlay = component.find("overlay");
        $A.util.toggleClass(overlay, 'slds-hide');
    }
	```
6. Save the Helper file.
7. Switch to the **SimilarProperties** controller tab.
8. Add a comma after the `}` on **line 25** and then tap Return to add a new line. Paste the following:

	```js
	editMini : function(component, event, helper) {
        var recId = event.getSource().get("v.value");
        component.set("v.selectedRecordId", recId);
        var tempRec = component.find("editRecord");
        tempRec.set("v.recordId", component.get("v.selectedRecordId"));
        tempRec.reloadRecord();
        helper.showHideModal(component);
    },
    closeButton : function(component,event,helper) {
        helper.showHideModal(component);
    },
    saveRecord : function(component,event,helper) {
        var propName = component.find('propName').get("v.value");
        var propBeds = component.find('propBeds').get("v.value");
        var propBaths = component.find('propBaths').get("v.value");
        var propPrice = component.find('propPrice').get("v.value");
        var propStatus = component.find('propStatus').get("v.value");
        var tempRec = component.find("editRecord");
        tempRec.set("v.Name", propName);
        tempRec.set("v.Name", propBeds);
        tempRec.set("v.Name", propBaths);
        tempRec.set("v.Name", propPrice);
        tempRec.set("v.Name", propStatus);
        tempRec.saveRecord();
        helper.showHideModal(component);
    }
	```
9. Save the Controller file.
10. Switch back to the **SimilarProperties** component markup.
11. Add a new line after **line 5** and paste the following:

	```html
	<aura:attribute name="selectedRecordId" type="Id" />
   <aura:attribute name="selectedProperty" type="Property__c" />
	```

12. Add a new line after **line 13** and add:

	```html
	<force:recordPreview aura:id="editRecord"
		 targetRecord="{!v.selectedProperty}"
		 recordUpdated="{!c.doSearch}"
		 layoutType="FULL"
		 mode="EDIT" />
	```
	
13. Locate the `<lightning:buttonIcon>` on line 31 (unless you have different line numbers!).
14. Change the `onclick="{!c.editRecord}"` method of the `<lightning:buttonIcon>` to `onclick="{!c.editMini}"`.
15. Save the file.
16. Reload the Property Record Detail page.
17. Click on the Edit pencil icon in the component and modify the price of the record to be +/- more than 100000, then click Save. If all has gone well, you should see the component update and the property that you edited disappear from the list.
18. If you have issues, the source code for all of the pieces of the component can be [found here](https://github.com/garazi/LightningAdoptionWorkshop/tree/master/Exercise_5/src/aura/SimilarProperties).


On to **[Exercise 6](Exercise_6.md)**

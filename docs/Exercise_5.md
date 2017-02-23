##Exercise 5 – Creating a "Similar Properties" Lightning Component

###Exercise Goals

* Retrieving and displaying data in a Lightning Component
* Understand how to replace standard `<apex:*>` functionality in Lightning Components

###Step 1 - Create a new Lightning Component

1. Create a new Lightning Component using the Dev Console (File > New > Lightning Component).
2. Give the component a name of **SimilarProperties**.
3. Click the **Lightning Record Page** checkbox, then click OK.
4. Copy the following code into your new component after the opening `<aura:component>` tag:

```html
	<ul class="slds-list--vertical slds-has-dividers--top-space">
        <li class="slds-list__item">                   
            {!item.Name}
        </li>
    </ul>
```

###Step 2 - Preparing for data
1. Add the following on a new line above the `<ul>` element:

	```html
	<aura:attribute name="recordId" type="Id" />
	<aura:attribute name="similarProperties" type="Object[]" />
	```
		
2. Wrap the `<li>` block with the following:

```html
	<aura:iteration items="{!v.similarProperties}" var="item" indexVar="i"> ... </aura:iteration>
```
		
3. Save the component.
4. Switch back to a Property Record Detail page, click the Setup menu and choose **Edit Page**.
6. Click the Hello World component from the previous exercise and delete it from the page.
7. Locate the new **SimilarProperties** component in the Component List and drag it onto the page at the top of the right-hand column. Don't worry that nothing appears on the page - we will solve that in the next step.
8. Click Save and then the Back button to return to the Property Record Detail page.

###Step 3 - Creating a controller
1. Add a handler to the component on a new line after the `<aura:attributes>`:

		<aura:handler name="init" value="{!this}" action="{!c.doInit}" />
		
2. Click the Controller button in the Dev Console to create a controller for the component.
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
3. Replace the default code with:

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
1. Replace the contents of the `<li>` with:

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
2. In the **SimilarProperties** controller, add the following (don't forget to add a comma to seperate the function definitions):

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
2. Add the following the `</a>` tag:

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

###Step 8 - Final Cosmetic Touches
1. Wrap the entire `<ul>` with:

```html
	<lightning:card iconName="custom:custom85" title="Similar Properties">
   		<div class="slds-p-left--medium slds-p-right--medium">
   		...
   		</div>
   	</lightning:card>
```

2. Save the file, and reload the Property Record Detail page.

###Step 9 - Adding an Icon
1. In the Developer Console, click on the Design tile on the right-hand side of the window.
2. In a new browser tab, navigate back to the [SLDS site](http://getslds.com).
3. Navigate to the Icons section of the site.
4. Scroll down to locate custom85 in the Custom section of icons.
5. Click on the Downloads link in the navigation panel.
6. Scroll down to the Icons section and click the Download button.
7. Navigate to the downloaded zip file and unzip it.
8. Open the folder and then open the custom folder.
9. Locate the custom85.svg file and open it in a text editor.
10. Copy the `<path>` tag from the SVG.
11. In the Developer Console, switch to SimilarProperties.svg.
12. Replace the second `<path>` tag with the one you just copied.
13. At the beginning of the `<path>` you just pasted, add fill="#fff" before the "d" attribute.
14. Change `width="120px" height="120px" viewBox="0 0 120 120"` in the `<svg>` tag to:

	```xml
	width="100px" height="100px" viewBox="0 0 100 100"
	```
15. Change the fill of the first `<path>` to `#F26891`.
16. Save the file.

###Step 10 - Adding Design Parameters
1. On the Property Record Detail page, click the Setup icon and choose **Edit Page**.
2. Click on the SimilarProperties component on the page and delete it.
3. Click the Save button and then navigate back to the Property Record Detail page.
4. In the SimilarProperties component markup in the Developer Console, add a new `<aura:attribute>` to the component:

```html
	<aura:attribute name="searchCriteria" type="String" />
```

4. Save the file.
5. Click the Design tile on the right-hand side of the window.
6. Replace the contents of the file with:

	```xml
	<design:component label="Similar Properties">
		<sfdc:objects>
		    <sfdc:object>Property__c</sfdc:object>
		</sfdc:objects>
		<design:attribute name="searchCriteria" label="Search By" datasource="Beds, Price" default="Beds" description="Search for similar houses based on what criteria?" />
	</design:component>
	```

7. Save the file.
8. On the Property Record Detail page, click the Setup icon and choose Edit page.
9. Notice the icon for your component and it's name now contains a space (this is the label from the design file.
10. Drag the component back into the right-hand column.
11. Notice the right-hand column now contains design parameters for the search criteria.
12. Switch the search criteria to **Price** and notice that nothing happens. That's because we now need to update our component and Apex Class to handle the switch of criteria.
13. Click Save, then navigate back to the Property Record Detail page.

###Step 11 - Updating the Controllers
1. Switch back to the Dev Console and open the **SimilarProperties** controller.
2. Add the following after the `var recId` line of code:

	```js
	var compValue = component.get("v.searchCriteria");	
	```
	
3. Pass the variable to the action by updating the action's parameters to:

	```js
	action.setParams({
        recordId: recId,
        searchCriteria: compValue
    });
	```
	
4. Save the file(s).
5. Open the **GetSimilarPropertiesApexController** file in the Dev Console if it is not already open (File > Open Resource).
6. Update the contents to the following:

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

###Step 12 - Leverage force:recordPreview
1. In the Developer Console, switch to SimilarProperties component.
2. Add a new `<aura:attribute>`:

	```html
	<aura:attribute name="property" type="Property__c" />
	```
3. Add the following below the `<aura:handler>`:

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
12. Reload the Property Record Detail page.
13. Change the Price of the record to be +/- more than 100000.
14. Click Save and watch the Similar Properties component update.

On to **[Exercise 6](https://github.com/garazi/LightningAdoptionWorkshop/blob/master/docs/Exercise_6.md)**

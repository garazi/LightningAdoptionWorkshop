##Exercise 5 – Creating a "Similar Properties" Lightning Component

###Exercise Goals

* Retrieving and displaying data in a Lightning Component
* Understand how to replace standard `<apex:*>` functionality in Lightning Components

###Step 1 - Create a new Lightning Component

1. Create a new Lightning Component using the Dev Console (File > New > Lightning Component).
2. Give the component a name of **SimilarProperties**.
3. Click the **Lightning Record Page** checkbox, then click OK.
4. Open **[AccountContactList.vfp](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-6/Snippets/AccountContactList.vfp)**.
5. Copy the entire `<table>` markup and paste it into your new component.

###Step 2 - Preparing for data
1. Add the following on a new line above the `<table>` element:

		<aura:attribute name="contactList" type="Object" />
		
2. Replace the `<apex:repeat>` line with:

		<aura:iteration items="{!v.contactList}" var="ct" indexVar="i">
		
3. Replace the `</apex:repeat>` tag with `</aura:iteration>`.
4. Save the component.
5. On the **United Oil & Gas Corp** page, click the Setup menu and choose **Edit Page**.
6. Click the Hello World component and delete from the page.
7. Locate the new ContactList component in the Component List and drag it onto the page at the top of the right-hand column.
8. Click Save and then the Back button to return to the account page.

###Step 3 - Creating a controller
1. Add a handler to the component on line 3:

		<aura:handler name="init" value="{!this}" action="{!c.doInit}" />
		
2. Click the Controller button in the Dev Console to create a controller for the component.
3. Delete the contents of the controller.
3. Open **[ContactListController.js](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-6/Snippets/ContactListController.js)** and paste it into your component controller.
4. Save the file.

###Step 4 - Creating an Apex Class
1. In the Dev Console, choose **File > New > Apex Class**.
2. Name the class **getAccountContacts**.
3. Delete the contents of the file.
4. Open **[getAccountContacts](https://raw.githubusercontent.com/garazi/LightningNowWorkshop/exercise-6/Snippets/getAccountContacts.cls)** and paste it into the Apex Class. 
5. Save the Apex Class.
6. Switch back to the ContactList component and add `controller="getAccountContacts"` to the `<aura:component>` in front of the `implements=` attribute.
7. Save the file.

###Step 5 - Add additional styling
1. Wrap the `<table>` element with:

		<lightning:card iconName="utility:user" title="Contacts"> ... </lightning:card>
		
2. Save the file.
3. Refresh the account page.
4. Click the Setup menu and choose **Edit Page**.
5. Click on the Visualforce component that we added to the page and delete it.
6. Click Save and Back.
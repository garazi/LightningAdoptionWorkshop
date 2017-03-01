##Exercise 4 – Creating a "Hello World" Lightning Component

###Exercise Goals

* Build a simple Hello World component
* Explore basic concepts of Lightning Component markup
* Understand how to use attributes for data binding

###Step 1 - Hello World

1. In the Developer Console, choose **New > Lightning Component**.
2. Give the component a name of **HelloWorld**.
3. Check the option **Lightning Record Page**.
4. Add "Hello World" to the component.
5. Save the file.

###Step 2 - Add the component to a page
1. Navigate to a Property Record Detail page.
2. Choose **Edit Page** from the Setup menu.
3. Locate your HelloWorld component in the Component List.
4. Drag it onto the page and place it at the top of the right-hand column.
5. Click the Save button.
6. Click the Back button in the upper righthand corner of App Builder to return to the Property page.

###Step 3 - Understanding Lightning Component basics
1. In the Developer Console, replace the "Hello World" text with:

		<aura:attribute name="greeting" type="String" default="World" />
    	Hello, {!v.greeting}!

2. Save the component and reload the Property Record Detail page.
3. Add the following on a new line under the `<aura:attribute/>` tag:

		<ui:inputText aura:id="userInput" change="{!c.updateGreeting}"></ui:inputText>

4. Click the Controller button on the right-hand side of the Dev Console.
5. Replace the Controller's contents with:

		({
			updateGreeting : function(component, event, helper) {
				var newGreeting = component.find("userInput").get("v.value");
				component.set("v.greeting", newGreeting);
			}
		})

6. Save the Controller file and the Component.
7. Refresh the account page.
8. Type a name in the input and press Tab or Return.

###Step 4 - Pulling data from Salesforce
1. In the Developer Console, choose **File > New > Apex Class**. Name the file **UserSelect**.
2. Add the following code to the class:

	```java
		    @AuraEnabled
    		public static User getCurrentUser() {
        		User toReturn = [SELECT Id, FirstName, LastName FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
        		return toReturn;
    		}
    ```
3. Add a reference to the Apex Class in HelloWorld.cmp by adding `controller="UserSelect"` to the `<aura:component>` tag.
4. Add a handler to fire when the component is initialized on the page, by adding the following after the opening `<apex:component>` tag:
	```html
		<aura:handler name="init" value="{!this}" action="{!c.doInit}" />
	```
5. Update the **HelloWorldController.js** file with the following code:

	```js
		({
    		doInit : function(component, event, helper) {
        	var action = component.get("c.getCurrentUser");
        	action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            console.log("foo: ", data);
            component.set("v.greeting", data.FirstName);
        	})
        	$A.enqueueAction(action);
    	},
			updateGreeting : function(component, event, helper) {
				var newGreeting = component.find("userInput").get("v.value");
        		component.set("v.greeting", newGreeting);
			}
		})
	```
		
6. Save all the files.
7. Refresh the Property page.

#####On to **[Exercise 5](https://github.com/garazi/LightningAdoptionWorkshop/blob/master/docs/Exercise_5.md)**

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
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recId
        });
        editRecordEvent.fire(); 
    },
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
})

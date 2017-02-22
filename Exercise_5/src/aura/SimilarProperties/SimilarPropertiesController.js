({
    doInit : function(component, event, helper) {
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
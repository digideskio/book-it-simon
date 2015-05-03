/// <reference path="../App.js" />

(function () {
    "use strict";

        var _calOnly = 
        "Only available on appointment or meeting request items.";
        var item;

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        item = Office.cast.item.toItemRead(Office.context.mailbox.item);

        $(document).ready(function () {
            app.initialize();

            displayItemDetails();
            window.createAppointment = createAppointment;

            $('#datepick-start')[0].attributes['placeholder'].value =_getDateString(item.start);

            $('#datepick-end')[0].attributes['placeholder'].value =_getDateString(item.end);

            $('#content-main .input-daterange').datepicker({
                orientation: "auto",
                startDate: _getDateString(item.start),
                endDate: _getDateString(item.end)
            });

        });
    };

    var _isCalendarItem = function() {
        if ( (item.itemType == 
            Office.MailboxEnums.ItemType.Appointment) ||
             (item.itemClass.indexOf("IPM.Schedule") != -1) )
        {
            return true;
        }
        
        return false;
    }

    var _getDateString = function (date) {
        return ""+(date.getMonth()+1).toString()
            +'/'+date.getDate().toString()
            +'/'+date.getFullYear().toString();
    }

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        $('#subject').text(item.subject);

        var from;
        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            from = Office.cast.item.toMessageRead(item).from;
        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            from = Office.cast.item.toAppointmentRead(item).organizer;
        }

        if (from) {
            $('#from').text(from.displayName);
            $('#from').click(function () {
                app.showNotification(from.displayName, from.emailAddress);
            });
        }

        var _getStart = function() {
            if (_isCalendarItem()) {
                $("td#start").html(_getDateString(item.start));
            } else  {
                $("td#start").text(_calOnly);
            }
        }

        var _getEnd = function() {
            if (_isCalendarItem()) {
                $("td#end").html(_getDateString(item.end));
            }else{
                $("td#end").text(_calOnly);
            }
        }

        _getStart();

        _getEnd();

    }

    function getAppointmentDateFromBody() {
        
    }

    function createAppointment() {
        var formParameters =
        {
            "requiredAttendees" : ["wendy@contoso.com", "derek@contoso.com"],
            "optionalAttendees" : ["shane@contoso.com", "michael@contoso.com"],
            "start" : new Date("September 27, 2012 11:15:00"),
            "end" : new Date("September 27, 2012 12:30:00"),
            "location" : "Conf room 200",
            "resources" : ['sound', 'lighting', 'recording'],
            "subject" : "Next rehearsal",
            "body" : "This is about the next rehearsal."
        }

        // Display a form to create an appointment with
        // the specified parameters.
        Office.context.mailbox.displayNewAppointmentForm(formParameters);
    }
})();
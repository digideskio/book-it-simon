/// <reference path="../App.js" />

(function () {
    "use strict";

        var _calOnly = 
        "Only available on appointment or meeting request items.";


    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            displayItemDetails();
            window.createAppointment = createAppointment;
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        var item = Office.cast.item.toItemRead(Office.context.mailbox.item);
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
            // var date = item.start;
            
            // Show how to extract the different components of 
            // a date-time value.
            return ""+(date.getMonth()+1).toString()
                        +'/'+date.getDate().toString()
                        +'/'+date.getFullYear().toString();
        }
        var _getStart = function() {
            if (_isCalendarItem()) {

                // var date = item.start;
                
                // // Show how to extract the different components of 
                // // a date-time value.
                // var info = ""+(date.getMonth()+1).toString()
                //             +'/'+date.getDate().toString()
                //             +'/'+date.getFullYear().toString();
                // // info += "Full Date : " + date.toString() + "<br/>";
                // // info += "Full Year : " + date.getFullYear() + "<br/>";
                // // // date.getMonth returns 0-based values, so increment by 1.
                // // info += "Month : " + (date.getMonth()+1) + "<br/>";
                // // info += "Day of Month : " + date.getDate() + "<br/>";
                // // info += "Day of Week : " + date.getDay() + "<br/>";
                // // info += "Hours : " + date.getHours() + "<br/>";
                // // info += "Minutes : " + date.getMinutes() + "<br/>";
                // // info += "Seconds : " + date.getSeconds() + "<br/>";
                
                $("td#start").html(_getDateString(item.start));
            } else  {
                $("td#start").text(_calOnly);
            }
        }

        var _getEnd = function() {
            if (_isCalendarItem()) {
                // var date = item.end;

                // // Show how to extract the different components of 
                // // a date-time value.
                // var info = ""+(date.getMonth()+1).toString()
                //             +'/'+date.getDate().toString()
                //             +'/'+date.getFullYear().toString();
                // // info += "Full Date : " + date.toString() + "<br/>";
                // // info += "Full Year : " + date.getFullYear() + "<br/>";
                // // // date.getMonth returns 0-based values, so increment by 1.
                // // info += "Month : " + (date.getMonth()+1) + "<br/>";
                // // info += "Day of Month : " + date.getDate() + "<br/>";
                // // info += "Day of Week : " + date.getDay() + "<br/>";
                // // info += "Hours : " + date.getHours() + "<br/>";
                // // info += "Minutes : " + date.getMinutes() + "<br/>";
                // // info += "Seconds : " + date.getSeconds() + "<br/>";
                
                $("td#end").html(_getDateString(item.end));
            }
            else
            {
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
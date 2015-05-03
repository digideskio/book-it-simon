/// <reference path="../App.js" />

(function () {
    "use strict";

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
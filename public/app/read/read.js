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
            $('#depDate')[0].value =_getDateString(item.start);

            $('#retDate')[0].value =_getDateString(item.end);

            // $('#arrCity')[0].value = item.location;

            // $('#content-main .input-daterange').datepicker({
            //     orientation: "top",
            //     startDate: _getDateString(item.start),
            //     endDate: _getDateString(item.end)
            // });

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
})();
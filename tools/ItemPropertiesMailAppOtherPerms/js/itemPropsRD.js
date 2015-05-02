/*
 * File     : itemPropsRD.js
 * Author   : Microsoft
 */

Type.registerNamespace('Olk.ItemProps');

// This function determines and displays
// properties values that are available 
// on the selected item. This function 
// assumes the mail app has read item or
// read-write mailbox permission.
Olk.ItemProps.Ext = function ItemPropsExt(appOm)
{
    var _item = appOm.item;
    
    var _msgOnly = 
        "Only available on the MESSAGE object.";
    var _apptOnly = 
        "Only available on the APPOINTMENT object.";
    var _calOnly = 
        "Only available on appointment or meeting request items.";
    
    // Check if an item is an appointment or meeting request.
    var _isCalendarItem = function()
    {
        if ( (_item.itemType == 
            Office.MailboxEnums.ItemType.Appointment) ||
             (_item.itemClass.indexOf("IPM.Schedule") != -1) )
        {
            return true;
        }
        
        return false;
    }

    // Check if the current user is the organizer of a meeting.
    var _isOrganizer = function()
    {
        if ( (_item.itemType == 
            Office.MailboxEnums.ItemType.Appointment) &&
            (appOm.userProfile.emailAddress == 
                _item.organizer.emailAddress) )
        {
            return true;
        }
        
        return false;
    }
    
    var _showAPIReady = function()
    {
        $("div#apiReady").text("API IS READY");
        $("body").css("background-color", "#298ed6");
        $("body").css("color", "#ffffff");
    }
    
    // UserProfile is available independent of an item.
    var _getUserProfile = function()
    {
        var profile = appOm.userProfile;
        var info = "";

        // Show how to extract the 3 properties of 
        // a UserProfile object.
        info += "Display Name : " + profile.displayName 
            + "<br/>";
        info += "Email Address : " + profile.emailAddress 
            + "<br/>";
        info += "Time Zone : " + profile.timeZone;
        
        $("td#userProfile").html(info);
    }
    
    // This property is available on the Message or
    // Appointment object.
    var _getSubject = function()
    {
        $("td#subject").text(_item.subject);
    }
    
    // This property is available on the Message or
    // Appointment object.
    var _getNormalizedSubject = function()
    {
        $("td#normalizedSubject").text(_item.normalizedSubject);
    }
    
    // This property is available on the Message or
    // Appointment object.
    var _getItemClass = function()
    {
        $("td#itemClass").text(_item.itemClass);
    }
    
    // This property is available on the Message or
    // Appointment object.
    var _getItemType = function()
    {
        $("td#itemType").text(_item.itemType);
    }
    
    // This property is available on the Message or
    // Appointment object. 
    // It represents a JavaScript Date object.
    var _getDateTimeCreated = function()
    {
        var date = _item.dateTimeCreated;
        
        // Show how to extract the different components of 
        // a date-time value.
        var info = "";
        info += "Full Date : " + date.toString() + "<br/>";
        info += "Full Year : " + date.getFullYear() + "<br/>";
        // date.getMonth returns 0-based values, so increment by 1.
        info += "Month : " + (date.getMonth()+1) + "<br/>";
        info += "Day of Month : " + date.getDate() + "<br/>";
        info += "Day of Week : " + date.getDay() + "<br/>";
        info += "Hours : " + date.getHours() + "<br/>";
        info += "Minutes : " + date.getMinutes() + "<br/>";
        info += "Seconds : " + date.getSeconds() + "<br/>";
        
        $("td#dateTimeCreated").html(info);
    }
    
    // This property is available on the Message or
    // Appointment object.
    // It represents a JavaScript Date object.
    var _getDateTimeModified = function()
    {
        var date = _item.dateTimeModified;
        
        // Show how to extract the different components of 
        // a date-time value.
        var info = "";
        info += "Full Date : " + date.toString() + "<br/>";
        info += "Full Year : " + date.getFullYear() + "<br/>";
        // date.getMonth returns 0-based values, so increment by 1.
        info += "Month : " + (date.getMonth()+1) + "<br/>";
        info += "Day of Month : " + date.getDate() + "<br/>";
        info += "Day of Week : " + date.getDay() + "<br/>";
        info += "Hours : " + date.getHours() + "<br/>";
        info += "Minutes : " + date.getMinutes() + "<br/>";
        info += "Seconds : " + date.getSeconds() + "<br/>";
        
        $("td#dateTimeModified").html(info);
    }
    
    // This property is available on the Message or
    // Appointment object.
    var _getItemId = function()
    {
        $("td#itemId").text(_item.itemId);
    }

    // This property is available on only the Message object.    
    var _getConversationId = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Message)
        {
            $("td#conversationId").text(_item.conversationId);
        }
        else
        {
            $("td#conversationId").text(_msgOnly);
        }
    }
    
    // This property is available on only the Message object.
    var _getInternetMessageId = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Message)
        {
            $("td#internetMessageId").text(_item.internetMessageId);
        }
        else
        {
            $("td#internetMessageId").text(_msgOnly);
        }
    }
    
    // This property is available on only a meeting request,
    // response or cancellation, or an appointment item.
    // It represents a JavaScript Date object.
    var _getStart = function()
    {
        if (_isCalendarItem())
        {
            var date = _item.start;
            
            // Show how to extract the different components of 
            // a date-time value.
            var info = "";
            info += "Full Date : " + date.toString() + "<br/>";
            info += "Full Year : " + date.getFullYear() + "<br/>";
            // date.getMonth returns 0-based values, so increment by 1.
            info += "Month : " + (date.getMonth()+1) + "<br/>";
            info += "Day of Month : " + date.getDate() + "<br/>";
            info += "Day of Week : " + date.getDay() + "<br/>";
            info += "Hours : " + date.getHours() + "<br/>";
            info += "Minutes : " + date.getMinutes() + "<br/>";
            info += "Seconds : " + date.getSeconds() + "<br/>";
            
            $("td#start").html(info);
        }
        else
        {
            $("td#start").text(_calOnly);
        }
    }
    
    // This property is available on only a meeting request,
    // response or cancellation, or an appointment item.
    // It represents a JavaScript Date object.
    var _getEnd = function()
    {
        if (_isCalendarItem())
        {
            var date = _item.end;
            
            // Show how to extract the different components of 
            // a date-time value.
            var info = "";
            info += "Full Date : " + date.toString() + "<br/>";
            info += "Full Year : " + date.getFullYear() + "<br/>";
            // date.getMonth returns 0-based values, so increment by 1.
            info += "Month : " + (date.getMonth()+1) + "<br/>";
            info += "Day of Month : " + date.getDate() + "<br/>";
            info += "Day of Week : " + date.getDay() + "<br/>";
            info += "Hours : " + date.getHours() + "<br/>";
            info += "Minutes : " + date.getMinutes() + "<br/>";
            info += "Seconds : " + date.getSeconds() + "<br/>";
            
            $("td#end").html(info);
        }
        else
        {
            $("td#end").text(_calOnly);
        }
    }
    
    // This property is available on only a meeting request,
    // response or cancellation, or an appointment item.
    var _getLocation = function()
    {
        if (_isCalendarItem())
        {
            $("td#location").text(_item.location);
        }
        else
        {
            $("td#location").text(_calOnly);
        }
    }

    // This property is available on only the Message object.
    // If the message is sent by a delegate, then the From property
    // represents the delegator, and the Sender property represents
    // the delegate. If there is no delegation, the Sender property
    // and From property represents the same person.    
    var _getFrom = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Message)
        {
            var from = _item.from;
            
            // This property is an EmailAddressDetails object.
            // Show how to extract a couple of properties of this
            // object.
            var info = "";
            info += "Display Name : " + from.displayName + "<br/>";
            info += "Email Address : " + from.emailAddress;
            
            $("td#from").html(info);
        }
        else
        {
            $("td#from").text(_msgOnly);
        }
    }
    
    // This property is available on only the Message object.
    // If the message is sent by a delegate, then the From property
    // represents the delegator, and the Sender property represents
    // the delegate. If there is no delegation, the Sender property
    // and From property represents the same person. 
    var _getSender = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Message)
        {
            var sender = _item.sender;
            
            // This property is an EmailAddressDetails object.
            // Show how to extract a couple of properties of this
            // object.
            var info = "";
            info += "Display Name : " + sender.displayName + "<br/>";
            info += "Email Address : " + sender.emailAddress;
            
            $("td#sender").html(info);
        }
        else
        {
            $("td#sender").text(_msgOnly);
        }
    }
    
    // This property is available on only the Message object.
    var _getTo = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Message)
        {
            var to = _item.to;
            
            // This property is an array of EmailAddressDetails 
            // objects. Show how to extract a few properties 
            // of each of these objects.
            var displayNames = "Display Names : ";
            var emailAddresses = "Email Addresses : ";
            var recipientTypes = "Recipient Type : ";
            
            for (var i = 0; i < to.length; i++)
            {
                displayNames += to[i].displayName;
                emailAddresses += to[i].emailAddress;
                recipientTypes += to[i].recipientType;
                
                if (i != to.length-1)
                {
                    displayNames += ",";
                    emailAddresses += ",";
                    recipientTypes += ",";
                }
            }
            
            $("td#to").html(displayNames + "<br/>" 
                + emailAddresses + "<br/>" + recipientTypes);
        }
        else
        {
            $("td#to").text(_msgOnly);
        }
    }
    
    var _getCc = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Message)
        {
            var cc = _item.cc;
            
            // This property is an array of EmailAddressDetails 
            // objects. Show how to extract a few properties 
            // of each of these objects.
            var displayNames = "Display Names : ";
            var emailAddresses = "Email Addresses : ";
            var recipientTypes = "Recipient Type : ";
            
            for (var i = 0; i < cc.length; i++)
            {
                displayNames += cc[i].displayName;
                emailAddresses += cc[i].emailAddress;
                recipientTypes += cc[i].recipientType;
                
                if (i != cc.length-1)
                {
                    displayNames += ",";
                    emailAddresses += ",";
                    recipientTypes += ",";
                }
            }
            
            $("td#cc").html(displayNames + "<br/>" 
                + emailAddresses + "<br/>" + recipientTypes);
        }
        else
        {
            $("td#cc").text(_msgOnly);
        }
    }
    
    // This property is available on only the Appointment object.
    var _getOrganizer = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Appointment)
        {
            var organizer = _item.organizer;
            
            // This property is an EmailAddressDetails object.
            // Show how to extract a couple of properties of this
            // object.
            var info = "";
            info += "Display Name : " + organizer.displayName + "<br/>";
            info += "Email Address : " + organizer.emailAddress;
            
            $("td#organizer").html(info);
        }
        else
        {
            $("td#organizer").text(_apptOnly);
        }
    }
    
    // This property is available on only the Appointment object.
    var _getRequiredAttendees = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Appointment)
        {
            var attendees = _item.requiredAttendees;
            

            // This property is an array of EmailAddressDetails 
            // objects. Show how to extract a few properties 
            // of each of these objects.
            var displayNames = "Display Names : ";
            var emailAddresses = "Email Addresses : ";
            var recipientTypes = "Recipient Types : ";
            var appointmentResponses = "Appointment Responses : ";
            
            var getAppointmentResponses = false;

            // Responses of required attendees are accessible to 
            // only the organizerof the meeting.
            if (_isOrganizer())
            {
                getAppointmentResponses = true;
            }
            else
            {
                appointmentResponses += "You are not the organizer.";
            }
            
            for (var i = 0; i < attendees.length; i++)
            {
                displayNames += attendees[i].displayName;
                emailAddresses += attendees[i].emailAddress;
                recipientTypes += attendees[i].recipientType;
                
                if (i != attendees.length-1)
                {
                    displayNames += ",";
                    emailAddresses += ",";
                    recipientTypes += ",";
                }
                
                if (getAppointmentResponses)
                {
                    appointmentResponses += attendees[i].appointmentResponse;
                    
                    if (i != attendees.length-1)
                    {
                        appointmentResponses += ",";
                    }
                }
            }
            
            $("td#requiredAttendees").html(displayNames + "<br/>" + 
                emailAddresses + "<br/>" +  
                recipientTypes + "<br/>" + 
                appointmentResponses);
        }
        else
        {
            $("td#requiredAttendees").text(_apptOnly);
        }
    }
    
    // This property is available on only the Appointment object.
    var _getOptionalAttendees = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Appointment)
        {
            var attendees = _item.optionalAttendees;
            

            // This property is an array of EmailAddressDetails 
            // objects. Show how to extract a few properties 
            // of each of these objects.
            var displayNames = "Display Names : ";
            var emailAddresses = "Email Addresses : ";
            var recipientTypes = "Recipient Types : ";
            var appointmentResponses = "Appointment Responses : ";
            
            var getAppointmentResponses = false;

            // Responses of optional attendees are accessible to 
            // only the organizer of the meeting.
            if (_isOrganizer())
            {
                getAppointmentResponses = true;
            }
            else
            {
                appointmentResponses += "You are not the organizer.";
            }
            
            for (var i = 0; i < attendees.length; i++)
            {
                displayNames += attendees[i].displayName;
                emailAddresses += attendees[i].emailAddress;
                recipientTypes += attendees[i].recipientType;
                
                if (i != attendees.length-1)
                {
                    displayNames += ",";
                    emailAddresses += ",";
                }
                
                if (getAppointmentResponses)
                {
                    appointmentResponses += attendees[i].appointmentResponse;
                    
                    if (i != attendees.length-1)
                    {
                        appointmentResponses += ",";
                    }
                }
            }
            
            $("td#optionalAttendees").html(displayNames + "<br/>" + 
                emailAddresses + "<br/>" +  
                recipientTypes + "<br/>" + 
                appointmentResponses);
        }
        else
        {
            $("td#optionalAttendees").text(_apptOnly);
        }
    }

    // This property is available on only the Appointment object.    
    var _getResources = function()
    {
        if (_item.itemType == Office.MailboxEnums.ItemType.Appointment)
        {
            var resources = _item.resources;
            
            var displayNames = "Display Names : ";
            var emailAddresses = "Email Addresses : ";
            var recipientTypes = "Recipient Types : ";
            var appointmentResponses = "Appointment Responses : ";
            
            var getAppointmentResponses = false;

            // Responses of resources are available to only the 
            // organizer of the meeting.
            if (_isOrganizer())
            {
                getAppointmentResponses = true;
            }
            else
            {
                appointmentResponses += "You are not the organizer.";
            }
            
            for (var i = 0; i < resources.length; i++)
            {
                displayNames += resources[i].displayName;
                emailAddresses += resources[i].emailAddress;
                recipientTypes += resources[i].recipientType;
                
                if (i != resources.length-1)
                {
                    displayNames += ",";
                    emailAddresses += ",";
                    recipientTypes += ",";
                }
                
                if (getAppointmentResponses)
                {
                    appointmentResponses += 
                        resources[i].appointmentResponse;
                    
                    if (i != resources.length-1)
                    {
                        appointmentResponses += ",";
                    }
                }
            }
            
            $("td#resources").html(displayNames + "<br/>" + 
                emailAddresses + "<br/>" + 
                recipientTypes + "<br/>" + 
                appointmentResponses);
        }
        else
        {
            $("td#resources").text(_apptOnly);
        }
    }

    this.start = function()
    {
        _showAPIReady();

        // The following properties are available on
        // appropriate items for all mail apps 
        // independent of permission.
        _getSubject();
        _getNormalizedSubject();
        _getItemClass();
        _getItemType();
        _getDateTimeCreated();
        _getDateTimeModified();
        _getItemId();
        _getConversationId();
        _getInternetMessageId();
        _getStart();
        _getEnd();
        _getLocation();
        // The following properties are available
        // only if the mail app has requested read item
        // or read-write mailbox permission.
        _getUserProfile();
        _getFrom();
        _getSender();
        _getTo();
        _getCc();
        _getOrganizer();
        _getRequiredAttendees();
        _getOptionalAttendees();
        _getResources();
    }
}

Olk.ItemProps.Ext.init = function InitExt()
{
    // Event handler for the Office.initialize event
    // to make sure the runtime environment is ready.
    Office.initialize = function ()
    {
        // Instantiates an instance of the object Ext.
        var myExt = 
            new Olk.ItemProps.Ext(Office.context.mailbox);

        // Checks for the DOM to load.
        $(document).ready (function() {
            // Both runtime environment and
            // DOM are ready, start mail app code.
            myExt.start();
        });
    }
}

Olk.ItemProps.Ext.init();
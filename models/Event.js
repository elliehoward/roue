var keystone = require('keystone')
var Types = keystone.Field.Types;

var Event = new keystone.List('Event', {});

Event.add({
    creator: { type: String, required: true, initial: true },
    email: { type: Types.Email, required: true, initial: true },
    phone: { type: String , initial: true },
    title: { type: String , initial: true },
    picture: { type: Types.CloudinaryImage },
    description: { type: Types.Markdown, required: true, initial: true },
    createdAt: { type: Date, default: Date.now },
});

Event.register();

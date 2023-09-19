const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'other'],
        default: 'text',
    },
    timeline: [
        {
            content: {
                type: String,
                required: true,
                maxlength: 1000, // Adjust the maximum length as needed
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    isSeen: {
        type: Boolean,
        default: false,
    },
    isSent: {
        type: Boolean,
        default: false,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
});

// Add a method to get the latest content and date
ChatMessageSchema.methods.getLatestContentAndDate = function () {
    // Get the latest content and date from the timeline array
    const latestTimelineEntry = this.timeline[this.timeline.length - 1];
    return latestTimelineEntry.content;
};

ChatMessageSchema.methods.getMessage = function () {
    const latestTimelineEntry = this.timeline[this.timeline.length - 1];
    const isEdited = this.timeline.length > 1; // Check if there are multiple entries in the timeline
    return {
        from: this.from,
        to: this.to,
        messageType: this.messageType,
        content: latestTimelineEntry.content, // Include the latest content
        isSeen: this.isSeen,
        isSent: this.isSent,
        isDelivered: this.isDelivered,
        isEdited: isEdited,
        timeStamp : latestTimelineEntry.date

    };
};

ChatMessageSchema.methods.editMessage = function (editedContent) {
    // Create a new timeline entry with the edited content and the current date
    const editedEntry = {
        content: editedContent,
        date: new Date(),
    };

    // Add the edited entry to the timeline
    this.timeline.push(editedEntry);

    // Update the timestamp to the current date
    this.timestamp = new Date();

    // Save the updated message
    return this.save();
};

ChatMessageSchema.methods.getEditHistory = function () {
    // Filter the timeline to include only entries with content changes
    const editHistory = this.timeline.filter((entry, index) => index > 0);

    return editHistory.map((entry) => ({
        content: entry.content,
        date: entry.date,
    }));
};



module.exports = mongoose.model('ChatMessage', ChatMessageSchema);

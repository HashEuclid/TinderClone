const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");

// This job will run at 8 am in the morning everyday

cron.schedule("0 8 * * *", async () => {
    //   console.log("Hello World, " + new Date());
    //   Send emails to all people who got requests the previous day

  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday); // start time stamp of yesterday
    const yesterdayEnd = endOfDay(yesterday); // end time stamp of yesterday

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const emailsLists = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of emailsLists) {
      // Send Emails
      try {
        const res = await sendEmail.run(
          "New Friend Request Pending for " + email,
          "There are so many friend requests pending. Please login to devtinder.in and accept or reject the requests"
        );
        console.log(res);
        
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});

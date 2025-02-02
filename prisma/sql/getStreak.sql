-- @param {String} $1:username
SELECT 1 as "streakCount", true as "currentDayCompleted", $1 as "username";

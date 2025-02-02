-- @param {String} $1:username
WITH submission_dates AS (
    SELECT DISTINCT DATE("submittedAt" AT TIME ZONE 'Asia/Kolkata') AS submission_date
    FROM "problems"
    INNER JOIN "users"
    ON "problems"."userId"="users"."id"
    WHERE "username" = $1
),
ranked_dates AS (
    SELECT 
        submission_date,
        RANK() OVER (ORDER BY submission_date) AS ranking
    FROM submission_dates
),
grouped_dates AS (
    SELECT 
        submission_date,
        submission_date - INTERVAL '1 day' * ranking AS group_identifier
    FROM ranked_dates
)
SELECT 
    COUNT(*) AS "streakCount",
    EXISTS (
        SELECT 1 FROM submission_dates 
        WHERE submission_date = (CURRENT_DATE AT TIME ZONE 'Asia/Kolkata')
    ) AS "currentDayImplemented"
FROM grouped_dates
WHERE submission_date >= (CURRENT_DATE AT TIME ZONE 'Asia/Kolkata' - INTERVAL '1 day')
AND group_identifier = (
    SELECT group_identifier 
    FROM grouped_dates 
    WHERE submission_date = (CURRENT_DATE AT TIME ZONE 'Asia/Kolkata' - INTERVAL '1 day')
);


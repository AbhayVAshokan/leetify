# leetify

[![CI check](https://github.com/AbhayVAshokan/leetify/actions/workflows/ci_check.yml/badge.svg)](https://github.com/AbhayVAshokan/leetify/actions/workflows/ci_check.yml)

> Gamify LeetCode

## Features

- A comprehensive dashboard showing the list of all the solved problems,
  your score, rank, and the current streak.
- A favorites tab listing all the problems favorited by the users.
- Analytics of how the scores progressed over time.
- Light and dark themes.

<img width="1552" alt="Image" src="https://github.com/user-attachments/assets/293dcda2-9109-4034-bad9-5a62aaf738ac" />
<img width="1552" alt="Image" src="https://github.com/user-attachments/assets/dbb0045a-29d0-405d-a8f3-0266f29410c8" />
<img width="1552" alt="Image" src="https://github.com/user-attachments/assets/9315c408-1800-47ae-8528-ae08a222db13" />

## Deployment

- The project is deployed on [Render](https://render.com)'s Hobby plan (free)
  with the [Supabase](https://supabase.com) free plan. It can be deployed on
  any platform of your choice.
- Please follow the following steps if you need to deploy the project on your
  own:
  1. Fork the repository. This step is optional. Fork the repository if you
     would like to have the automatic sync with Leetcode (every hour) and an
     automatic backup of your DB (every midnight).
  2. Deploy the Next.js project on a platform of your choice. I have found no
     issues with deploying the project on [Vercel](https://vercel.com) and
     [Render](https://render.com).
  3. Create a new Supabase project.
  4. Set the environment variables `DATABASE_URL` and `DIRECT_URL`. Have a look
     at [Prisma's Supabase documentation](https://www.prisma.io/docs/orm/overview/databases/supabase)
     to understand what these environment variables are.
  5. Execute the command `bun db:deploy` to run all the migrations.

## Adding a new user

- There is no API to add a new user. It needs to be added manually. Insert
  the new user using raw SQL commands, or directly edit the `users` table on
  `Supabase`.

## Sync with Leetcode

- The `Sync with Leetcode` button fetches the latest 20 AC submissions of the
  user and populates the database. The start date for sync is set to
  Feb 1, 2025. You can change it by updating the
  [SYNC_START_DATE](https://github.com/AbhayVAshokan/leetify/blob/f64509b33c33894f448a20c5b9db3ae8aadc15b5/app/actions/constants.ts#L14)
  variable. Any problem solved before `SYNC_START_DATE` will not be synced
  with your DB.

## Automatic sync with Leetcode (every hour)

- The [Sync problems](https://github.com/AbhayVAshokan/leetify/blob/f64509b33c33894f448a20c5b9db3ae8aadc15b5/.github/workflows/sync_problems.yml)
  GitHub workflow is executed every hour between 8:30AM and 1:30AM IST. This
  makes sure that your database is in sync with Leetcode submissions even
  you don't press the `Sync with Leetcode` button all the time.
- To get it working, please set the `BASE_URL` environment variable in your
  GitHub actions. It should be set to the URL at which your project is
  deployed. For example, the `BASE_URL` for this project is set to
  `https://leetify.onrender.com`.

## Automatic database backups (every midnight)

- The [Backup DB](https://github.com/AbhayVAshokan/leetify/blob/f64509b33c33894f448a20c5b9db3ae8aadc15b5/.github/workflows/backup.yml)
  GitHub workflow runs every midnight to back up your database as a Gzip.
- Set the `BASE_URL` environment variable in the environment variables of your
  GitHub actions to enable this feature.

## CI check

- Set the `DATABASE_URL` and `DIRECT_URL` environment variables in the
  environment variables of GitHub actions to make your CI is green.
  Have a look at [Prisma's Supabase documentation](https://www.prisma.io/docs/orm/overview/databases/supabase)
  to understand what these environment variables are.

## Tech stack

- Next.js
- Prisma
- Supabase

## Local development

- Run the `bun install` command to install all the dependencies.
- Add an `.env.development` file with the environment variables
  `DATABASE_URL` and `DIRECT_URL`. Have a look
  at [Prisma's Supabase documentation](https://www.prisma.io/docs/orm/overview/databases/supabase)
  to understand what these environment variables are.
- Run `bun db:deploy` to run all the migrations.
- Run `bun run start` to start the development server at port `3000`.

## License

This project comes with an MIT license, which means you can pretend that you
wrote it. Just don't blame it on my when you face any existential crisis while
solving hard Leetcode problems.

export type SubmissionResponse = {
  title: string;
  titleSlug: string;
  timestamp: number;
};

export const LEET_CODE_GRAPH_URL = "https://leetcode.com/graphql";

export const LEET_CODE_HEADERS = {
  "Content-Type": "application/json",
  Referer: "https://leetcode.com",
};

export const SYNC_START_DATE = new Date(2025, 0, 3);

export const SUBMISSIONS_QUERY = `#graphql
query getACSubmissions ($username: String!, $limit: Int) {
    recentAcSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
    }
}`;

export const PROBLEM_DETAILS_QUERY = `#graphql
query selectProblem($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        difficulty
    }
}`;

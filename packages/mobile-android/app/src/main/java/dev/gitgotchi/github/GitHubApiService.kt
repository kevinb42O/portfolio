package dev.gitgotchi.github

import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path
import retrofit2.Response

/**
 * GitHub API service interface using Retrofit.
 * Fetches user data, commits, PRs, and agent activity.
 */
interface GitHubApiService {
    
    @GET("user")
    suspend fun getCurrentUser(
        @Header("Authorization") token: String
    ): Response<GitHubUser>
    
    @GET("user/repos")
    suspend fun getUserRepos(
        @Header("Authorization") token: String
    ): Response<List<GitHubRepo>>
    
    @GET("repos/{owner}/{repo}/commits")
    suspend fun getCommits(
        @Header("Authorization") token: String,
        @Path("owner") owner: String,
        @Path("repo") repo: String
    ): Response<List<GitHubCommit>>
    
    @GET("repos/{owner}/{repo}/pulls")
    suspend fun getPullRequests(
        @Header("Authorization") token: String,
        @Path("owner") owner: String,
        @Path("repo") repo: String
    ): Response<List<GitHubPullRequest>>
    
    @GET("repos/{owner}/{repo}/actions/runs")
    suspend fun getWorkflowRuns(
        @Header("Authorization") token: String,
        @Path("owner") owner: String,
        @Path("repo") repo: String
    ): Response<GitHubActionsResponse>
}

// Data classes for GitHub API responses
data class GitHubUser(
    val login: String,
    val id: Long,
    val avatar_url: String,
    val name: String?,
    val email: String?,
    val public_repos: Int,
    val followers: Int,
    val following: Int
)

data class GitHubRepo(
    val id: Long,
    val name: String,
    val full_name: String,
    val description: String?,
    val stargazers_count: Int,
    val forks_count: Int,
    val language: String?
)

data class GitHubCommit(
    val sha: String,
    val commit: CommitDetail
)

data class CommitDetail(
    val message: String,
    val author: CommitAuthor
)

data class CommitAuthor(
    val name: String,
    val email: String,
    val date: String
)

data class GitHubPullRequest(
    val id: Long,
    val number: Int,
    val title: String,
    val state: String,
    val merged: Boolean?,
    val created_at: String,
    val updated_at: String
)

data class GitHubActionsResponse(
    val total_count: Int,
    val workflow_runs: List<WorkflowRun>
)

data class WorkflowRun(
    val id: Long,
    val name: String,
    val status: String,
    val conclusion: String?,
    val created_at: String
)

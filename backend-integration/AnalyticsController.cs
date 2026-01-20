// Backend C# API Controller to add to your Orchestrator project
// Add this file to: Controllers/AnalyticsController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;

namespace OrchestratorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        private readonly TelemetryClient _telemetryClient;
        private readonly IConfiguration _configuration;

        public AnalyticsController(TelemetryClient telemetryClient, IConfiguration configuration)
        {
            _telemetryClient = telemetryClient;
            _configuration = configuration;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            try
            {
                // Query Application Insights for metrics
                var dashboardData = new
                {
                    generatedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss 'UTC'"),
                    meetings = new
                    {
                        total = await GetTotalMeetings(),
                        thisWeek = await GetMeetingsThisWeek(),
                        thisMonth = await GetMeetingsThisMonth()
                    },
                    invoices = new
                    {
                        total = await GetTotalInvoices(),
                        allTime = new
                        {
                            factuurdemo = await GetInvoicesByRecipient("Factuurdemo"),
                            woonzorg = await GetInvoicesByRecipient("Woonzorg")
                        },
                        breakdown = new[]
                        {
                            new
                            {
                                name = "Factuurdemo",
                                email = "factuurdemo@databalk.nu",
                                count = await GetInvoicesByRecipient("Factuurdemo"),
                                color = "#4CAF50"
                            },
                            new
                            {
                                name = "Woonzorg",
                                email = "woonzorgfactuur@databalk.nu",
                                count = await GetInvoicesByRecipient("Woonzorg"),
                                color = "#2196F3"
                            }
                        }
                    }
                };

                return Ok(dashboardData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("emails-without-pdf")]
        public async Task<IActionResult> GetEmailsWithoutPdf([FromQuery] string period = "week")
        {
            try
            {
                var days = period == "week" ? 7 : 30;
                
                // Query Application Insights using Kusto query
                var query = $@"
                    customEvents
                    | where name == 'InvoiceReceived'
                    | where customDimensions.HasPdfAttachment == 'false'
                    | where timestamp > ago({days}d)
                    | project 
                        timestamp,
                        msgId = tostring(customDimensions.MsgId),
                        from = tostring(customDimensions.From),
                        to = tostring(customDimensions.To),
                        recipientType = tostring(customDimensions.RecipientType)
                    | order by timestamp desc
                ";

                // Execute query and process results
                var results = await ExecuteAppInsightsQuery(query);
                
                var factuurdemoCount = results.Count(r => r.RecipientType == "Factuurdemo");
                var woonzorgCount = results.Count(r => r.RecipientType == "Woonzorg");

                var response = new
                {
                    thisWeek = period == "week" ? new
                    {
                        factuurdemo = factuurdemoCount,
                        woonzorg = woonzorgCount,
                        total = results.Count
                    } : null,
                    thisMonth = period == "month" ? new
                    {
                        factuurdemo = factuurdemoCount,
                        woonzorg = woonzorgCount,
                        total = results.Count
                    } : null,
                    recentEmails = results.Take(10).Select(r => new
                    {
                        timestamp = r.Timestamp,
                        msgId = r.MsgId,
                        from = r.From,
                        to = r.To,
                        recipientType = r.RecipientType
                    })
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("failed-processing")]
        public async Task<IActionResult> GetFailedProcessing([FromQuery] string period = "week")
        {
            try
            {
                var days = period == "week" ? 7 : 30;
                
                var query = $@"
                    customEvents
                    | where name == 'InvoiceProcessingFailed'
                    | where timestamp > ago({days}d)
                    | project 
                        timestamp,
                        msgId = tostring(customDimensions.MsgId),
                        recipientType = tostring(customDimensions.RecipientType),
                        error = tostring(customDimensions.Error),
                        errorType = case(
                            customDimensions.ErrorType == 'extraction', 'extraction',
                            customDimensions.ErrorType == 'reasoning', 'reasoning',
                            'unknown'
                        )
                    | order by timestamp desc
                ";

                var results = await ExecuteAppInsightsQuery(query);
                
                var extractionCount = results.Count(r => r.ErrorType == "extraction");
                var reasoningCount = results.Count(r => r.ErrorType == "reasoning");

                var response = new
                {
                    thisWeek = period == "week" ? new
                    {
                        extraction = extractionCount,
                        reasoning = reasoningCount,
                        total = results.Count
                    } : null,
                    thisMonth = period == "month" ? new
                    {
                        extraction = extractionCount,
                        reasoning = reasoningCount,
                        total = results.Count
                    } : null,
                    recentFailures = results.Take(10).Select(r => new
                    {
                        timestamp = r.Timestamp,
                        msgId = r.MsgId,
                        recipientType = r.RecipientType,
                        error = r.Error,
                        errorType = r.ErrorType
                    })
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // Helper methods
        private async Task<int> GetTotalMeetings()
        {
            // Implement your meeting count logic
            // This could query your database or Application Insights
            return 150; // Placeholder
        }

        private async Task<int> GetMeetingsThisWeek()
        {
            return 12; // Placeholder
        }

        private async Task<int> GetMeetingsThisMonth()
        {
            return 45; // Placeholder
        }

        private async Task<int> GetTotalInvoices()
        {
            var query = @"
                customEvents
                | where name == 'InvoiceReceived'
                | summarize count()
            ";
            
            // Execute query and return count
            return 523; // Placeholder
        }

        private async Task<int> GetInvoicesByRecipient(string recipientType)
        {
            var query = $@"
                customEvents
                | where name == 'InvoiceReceived'
                | where customDimensions.RecipientType == '{recipientType}'
                | summarize count()
            ";
            
            // Execute query and return count
            return recipientType == "Factuurdemo" ? 312 : 211; // Placeholder
        }

        private async Task<List<dynamic>> ExecuteAppInsightsQuery(string query)
        {
            // TODO: Implement actual Application Insights query execution
            // You'll need to use the Application Insights REST API or SDK
            // For now, return mock data
            return new List<dynamic>();
        }
    }
}

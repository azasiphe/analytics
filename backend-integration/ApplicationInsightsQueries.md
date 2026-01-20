# Application Insights Query Samples

## Query: Emails without PDF attachments (Last 7 days)

```kusto
customEvents
| where name == "InvoiceReceived"
| where customDimensions.HasPdfAttachment == "false"
| where timestamp > ago(7d)
| project 
    timestamp,
    MsgId = tostring(customDimensions.MsgId),
    From = tostring(customDimensions.From),
    To = tostring(customDimensions.To),
    RecipientType = tostring(customDimensions.RecipientType),
    AttachmentCount = tostring(customDimensions.AttachmentCount)
| order by timestamp desc
```

## Query: Failed processing (Last 7 days)

```kusto
customEvents
| where name == "InvoiceProcessingFailed"
| where timestamp > ago(7d)
| project 
    timestamp,
    MsgId = tostring(customDimensions.MsgId),
    RecipientType = tostring(customDimensions.RecipientType),
    Error = tostring(customDimensions.Error),
    ErrorDetails = tostring(customDimensions.ErrorDetails)
| order by timestamp desc
```

## Query: Total invoices by recipient

```kusto
customEvents
| where name == "InvoiceReceived"
| summarize Count = count() by RecipientType = tostring(customDimensions.RecipientType)
| order by Count desc
```

## Query: Processing success rate (Last 30 days)

```kusto
customEvents
| where timestamp > ago(30d)
| where name in ("InvoiceReceived", "InvoiceProcessed", "InvoiceProcessingFailed")
| summarize 
    Received = countif(name == "InvoiceReceived"),
    Processed = countif(name == "InvoiceProcessed"),
    Failed = countif(name == "InvoiceProcessingFailed")
| extend SuccessRate = (Processed * 100.0) / Received
```

## Query: Invoices without PDF by recipient (This week)

```kusto
customEvents
| where name == "InvoiceReceived"
| where customDimensions.HasPdfAttachment == "false"
| where timestamp > startofweek(now())
| summarize Count = count() by RecipientType = tostring(customDimensions.RecipientType)
```

## Query: Daily invoice volume trend

```kusto
customEvents
| where name == "InvoiceReceived"
| where timestamp > ago(30d)
| summarize Count = count() by bin(timestamp, 1d), RecipientType = tostring(customDimensions.RecipientType)
| render timechart
```

## Using these queries in C#

To execute these queries from your C# backend, you'll need to use the Application Insights REST API:

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

public async Task<List<T>> ExecuteAppInsightsQuery<T>(string query)
{
    var appId = _configuration["ApplicationInsights:AppId"];
    var apiKey = _configuration["ApplicationInsights:ApiKey"];
    
    using var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Add("x-api-key", apiKey);
    
    var requestBody = new { query = query };
    var json = JsonSerializer.Serialize(requestBody);
    var content = new StringContent(json, Encoding.UTF8, "application/json");
    
    var response = await httpClient.PostAsync(
        $"https://api.applicationinsights.io/v1/apps/{appId}/query",
        content
    );
    
    response.EnsureSuccessStatusCode();
    var result = await response.Content.ReadAsStringAsync();
    
    // Parse and return results
    return ParseResults<T>(result);
}
```

## Configuration needed in appsettings.json

```json
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=...;IngestionEndpoint=https://...",
    "AppId": "your-app-id",
    "ApiKey": "your-api-key"
  }
}
```

To get your App ID and API Key:
1. Go to Azure Portal
2. Navigate to your Application Insights resource
3. Go to "API Access" in the left menu
4. Create a new API key with "Read telemetry" permission

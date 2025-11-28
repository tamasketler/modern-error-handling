var builder = WebApplication.CreateBuilder(args);

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Demo API",
        Version = "v1",
        Description = "A minimal API demonstrating different HTTP status codes with consistent error responses."
    });
});

var app = builder.Build();

// Enable Swagger
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Demo API v1");
});

// Define endpoints
var demoGroup = app.MapGroup("/api/demo");

demoGroup.MapGet("/success", () => Results.Ok())
    .WithName("GetSuccess")
    .WithDescription("Returns 200 OK with no body.")
    .Produces(200);

demoGroup.MapGet("/error", () =>
{
    var error = new ApiError("INTERNAL_ERROR", "An unexpected error occurred.", 500);
    return Results.Json(error, statusCode: 500);
})
    .WithName("GetError")
    .WithDescription("Returns 500 Internal Server Error with a JSON error body.")
    .Produces<ApiError>(500);

demoGroup.MapGet("/upgrade", () =>
{
    var error = new ApiError("PLAN_UPGRADE_REQUIRED", "Please upgrade your plan to access this feature.", 402);
    return Results.Json(error, statusCode: 402);
})
    .WithName("GetUpgrade")
    .WithDescription("Returns 402 Payment Required with a JSON error body.")
    .Produces<ApiError>(402);

app.Run();

/// <summary>
/// Consistent error response model for all non-200 responses.
/// </summary>
/// <param name="Code">A machine-readable error code.</param>
/// <param name="Message">A human-readable error message.</param>
/// <param name="StatusCode">The HTTP status code.</param>
public record ApiError(string Code, string Message, int StatusCode);


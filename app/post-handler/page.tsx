export default function PostHandlerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">LuauEditor POST Handler API</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
        <p className="mb-4">This endpoint accepts POST requests for executing Luau code or injecting scripts.</p>

        <h3 className="text-lg font-medium mt-6 mb-2">Endpoint</h3>
        <code className="bg-gray-200 px-2 py-1 rounded">POST /post-handler</code>

        <h3 className="text-lg font-medium mt-6 mb-2">Request Format</h3>
        <p className="mb-2">Send a POST request with a plain text body:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            For injection: Send the text <code className="bg-gray-200 px-2 py-1 rounded">"inject"</code>
          </li>
          <li>For code execution: Send the Luau code as plain text</li>
        </ul>

        <h3 className="text-lg font-medium mt-6 mb-2">Response Format</h3>
        <p className="mb-2">The API returns JSON responses with the following structure:</p>
        <pre className="bg-gray-200 p-3 rounded overflow-x-auto">
          {`{
  "success": boolean,
  "message": string,
  "timestamp": string
}`}
        </pre>

        <h3 className="text-lg font-medium mt-6 mb-2">Example Usage (C#)</h3>
        <pre className="bg-gray-200 p-3 rounded overflow-x-auto">
          {`using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using (HttpClient client = new HttpClient())
        {
            // For injection
            var injectContent = new StringContent("inject", Encoding.UTF8, "text/plain");
            var injectResponse = await client.PostAsync("https://your-domain.com/post-handler", injectContent);
            var injectResult = await injectResponse.Content.ReadAsStringAsync();
            Console.WriteLine(injectResult);
            
            // For code execution
            string luauCode = "print('Hello from Luau!')";
            var executeContent = new StringContent(luauCode, Encoding.UTF8, "text/plain");
            var executeResponse = await client.PostAsync("https://your-domain.com/post-handler", executeContent);
            var executeResult = await executeResponse.Content.ReadAsStringAsync();
            Console.WriteLine(executeResult);
        }
    }
}`}
        </pre>
      </div>

      <div className="bg-yellow-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Security Notice</h2>
        <p>
          This API endpoint is designed for direct integration with external applications. Consider implementing proper
          authentication and rate limiting for production use.
        </p>
      </div>
    </div>
  )
}


/**
 * Executes a string of JavaScript code in a sandboxed iframe.
 * @param {string} code The JavaScript code to execute.
 * @param {object} testCase The test case object with input and expected output.
 * @param {string} func The name of the function to call.
 * @param {number} [timeLimit=2000] The execution time limit in milliseconds.
 * @returns {Promise<object>} A promise that resolves with an object containing the result, stdout, and any error message.
 */
function executeCodeInIframe(code, testCase, func, timeLimit = 2000) {
  // if(func === "isSame") {
  //   console.log({code, testCase})
  // }
  return new Promise((resolve, reject) => {
    // Create a sandboxed iframe to isolate the code execution.
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.sandbox = "allow-scripts"; // Restrictive sandbox to prevent malicious code.

    // Set a timeout to prevent infinite loops from freezing the page.
    const timeout = setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
      // Resolve with a timeout error if execution takes too long.
      resolve({
        result: null,
        stdout: [],
        error: "Code execution timeout"
      });
    }, timeLimit);

    // Convert snake_case function names to camelCase.
    const jsFunc = func.includes('_') ?
      func.replace(/_([a-z])/g, (g) => g[1].toUpperCase()) :
      func;

    // Create the HTML content for the iframe, including the code and execution logic.
    const iframeContent = `
      <!DOCTYPE html>
      <html>
      <head><title>Code Executor</title></head>
      <body>
        <script>
          const stdout = [];
          // Create a custom console to capture output.
          const customConsole = {
            log: function(...args) {
              const output = args
                .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
                .join(' ');
              stdout.push(output);

              // Prevent excessive console output to mitigate infinite loops.
              if (stdout.length > 1000) {
                throw new Error('Maximum console output limit reached. Potential infinite loop detected.');
              }
            }
          };

          // Override the default console object.
          const console = customConsole;

          try {
            // This is where the user's code is injected and evaluated.
        eval(${JSON.stringify(code)});

            // IIFE to encapsulate the function execution logic.
            (function() {
              try {
                let result;
                
                // Try to find and execute the specified function.
                if (typeof ${jsFunc} === 'function') {
                  result = ${jsFunc}(${testCase?.input || ''});
                } else if (typeof ${func} === 'function') {
                  result = ${func}(${testCase?.input || ''});
                } else {
                  // Fallback: Find any user-defined function if the specified one isn't found.
                  const definedFunctions = Object.keys(window).filter(key => 
                    typeof window[key] === 'function' && 
                    !['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'].includes(key) &&
                    !key.startsWith('webkit') && !key.startsWith('chrome') && !key.startsWith('moz')
                  );
                  
                  if (definedFunctions.length > 0) {
                    result = window[definedFunctions[0]](${testCase?.input || ''});
                  } else {
                    throw new Error('No valid function found to execute.');
                  }
                }

                // Send the results back to the parent window.
                parent.postMessage({
                  type: 'CODE_EXECUTION_COMPLETE',
                  result: result,
                  stdout: stdout,
                  error: null
                }, '*');
                
              } catch (e) {
                // Send any execution errors back to the parent window.
                parent.postMessage({
                  type: 'CODE_EXECUTION_COMPLETE',
                  result: null,
                  stdout: stdout,
                  error: e.message
                }, '*');
              }
            })();

          } catch (error) {
            // Send any initial script evaluation/syntax errors back to the parent.
            parent.postMessage({
              type: 'CODE_EXECUTION_COMPLETE',
              result: null,
              stdout: stdout,
              error: error.message
            }, '*');
          }
        <\/script>
      </body>
      </html>
    `;

    // Listen for the 'message' event from the iframe.
    const messageListener = (event) => {
      if (event.source === iframe.contentWindow && event.data.type === "CODE_EXECUTION_COMPLETE") {
        clearTimeout(timeout);
        window.removeEventListener("message", messageListener);
        
        // Clean up the iframe from the DOM.
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }

        // Resolve the promise with the data received from the iframe.
        resolve({
          result: event.data.result,
          stdout: event.data.stdout,
          error: event.data.error
        });
      }
    };

    window.addEventListener("message", messageListener);

    // Set the iframe's content and append it to the body to start execution.
    iframe.srcdoc = iframeContent;
    document.body.appendChild(iframe);
  });
}



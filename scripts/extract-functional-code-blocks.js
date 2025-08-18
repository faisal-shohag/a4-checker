
/**
 * Extracts JavaScript function code blocks from text content
 * Handles nested braces, complex control structures, and multiple functions
 * @param {string} text - The input text containing JavaScript functions
 * @returns {Array} Array of objects containing function information
 */
function extractCodeBlocks(text) {
    if (typeof text !== 'string' || !text.trim()) {
        return [];
    }

    const functions = [];
    const lines = text.split('\n');
    let currentFunction = null;
    let braceCount = 0;
    let inFunction = false;
    let functionLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Skip empty lines when not in function
        if (!inFunction && !trimmedLine) {
            continue;
        }

        // Detect function start
        const functionMatch = trimmedLine.match(/^function\s+(\w+)\s*\([^)]*\)\s*\{?/);
        
        if (functionMatch && !inFunction) {
            inFunction = true;
            currentFunction = {
                name: functionMatch[1],
                startLine: i + 1,
                code: '',
                parameters: extractParameters(trimmedLine)
            };
            functionLines = [];
            braceCount = 0;
        }

        if (inFunction) {
            functionLines.push(line);
            
            // Count braces, but ignore braces in strings and comments
            const cleanLine = removeStringsAndComments(line);
            
            for (const char of cleanLine) {
                if (char === '{') {
                    braceCount++;
                } else if (char === '}') {
                    braceCount--;
                }
            }

            // Function complete when braces are balanced and we have at least one closing brace
            if (braceCount === 0 && cleanLine.includes('}')) {
                currentFunction.code = functionLines.join('\n');
                currentFunction.endLine = i + 1;
                currentFunction.lineCount = functionLines.length;
                
                functions.push(currentFunction);
                
                // Reset for next function
                inFunction = false;
                currentFunction = null;
                functionLines = [];
                braceCount = 0;
            }
        }
    }

    return functions;
}

/**
 * Removes string literals and comments from a line to avoid counting braces inside them
 * @param {string} line - The line to clean
 * @returns {string} The cleaned line
 */
function removeStringsAndComments(line) {
    let result = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        // Handle single-line comments
        if (!inString && char === '/' && nextChar === '/') {
            inComment = true;
            i++; // Skip next character
            continue;
        }
        
        if (inComment) {
            continue;
        }
        
        // Handle string literals
        if (!inString && (char === '"' || char === "'" || char === '`')) {
            inString = true;
            stringChar = char;
            continue;
        }
        
        if (inString && char === stringChar && line[i - 1] !== '\\') {
            inString = false;
            stringChar = '';
            continue;
        }
        
        if (!inString) {
            result += char;
        }
    }
    
    return result;
}

/**
 * Extracts parameter names from function declaration
 * @param {string} functionLine - The function declaration line
 * @returns {Array} Array of parameter names
 */
function extractParameters(functionLine) {
    const paramMatch = functionLine.match(/\(([^)]*)\)/);
    if (!paramMatch || !paramMatch[1].trim()) {
        return [];
    }
    
    return paramMatch[1]
        .split(',')
        .map(param => param.trim())
        .filter(param => param.length > 0);
}

/**
 * Utility function to format extracted functions for display
 * @param {Array} functions - Array of function objects
 * @returns {string} Formatted output
 */
function formatFunctionsReport(functions) {
    if (!functions.length) {
        return 'No functions found in the provided text.';
    }
    
    let report = `Found ${functions.length} function${functions.length === 1 ? '' : 's'}:\n\n`;
    
    functions.forEach((func, index) => {
        report += `${index + 1}. Function: ${func.name}\n`;
        report += `   Parameters: [${func.parameters.join(', ')}]\n`;
        report += `   Lines: ${func.startLine}-${func.endLine} (${func.lineCount} lines)\n`;
        report += `   Code:\n${func.code}\n\n`;
        report += '-'.repeat(50) + '\n\n';
    });
    
    return report;
}
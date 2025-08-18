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

        // Detect function start - both traditional and arrow functions
        const traditionalFunctionMatch = trimmedLine.match(/^function\s+(\w+)\s*\([^)]*\)\s*\{?/);
        const arrowFunctionMatch = trimmedLine.match(/^(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|[\w$]+)\s*=>/);
        
        if ((traditionalFunctionMatch || arrowFunctionMatch) && !inFunction) {
            inFunction = true;
            let functionName, functionType;
            
            if (traditionalFunctionMatch) {
                functionName = traditionalFunctionMatch[1];
                functionType = 'traditional';
            } else {
                functionName = arrowFunctionMatch[1];
                functionType = 'arrow';
            }
            
            currentFunction = {
                name: functionName,
                type: functionType,
                startLine: i + 1,
                code: '',
                parameters: extractParameters(trimmedLine, functionType)
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

            // Handle function completion based on type
            const isComplete = currentFunction.type === 'traditional' 
                ? (braceCount === 0 && cleanLine.includes('}'))
                : isArrowFunctionComplete(functionLines, braceCount, cleanLine);
                
            if (isComplete) {
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
 * Checks if an arrow function is complete
 * @param {Array} functionLines - All lines of the current function
 * @param {number} braceCount - Current brace count
 * @param {string} cleanLine - Current cleaned line
 * @returns {boolean} Whether the arrow function is complete
 */
function isArrowFunctionComplete(functionLines, braceCount, cleanLine) {
    const fullFunction = functionLines.join('\n');
    
    // Single-line arrow function without braces (e.g., const func = x => x * 2;)
    if (functionLines.length === 1 && !fullFunction.includes('{') && cleanLine.includes(';')) {
        return true;
    }
    
    // Multi-line arrow function with braces
    if (fullFunction.includes('{') && braceCount === 0 && cleanLine.includes('}')) {
        return true;
    }
    
    // Multi-line arrow function without braces (implicit return)
    if (!fullFunction.includes('{') && functionLines.length > 1) {
        // Check if the line ends with a semicolon or is followed by another function/statement
        const lastLine = functionLines[functionLines.length - 1].trim();
        if (lastLine.endsWith(';') || lastLine.endsWith(',')) {
            return true;
        }
    }
    
    return false;
}

/**
 * Extracts parameter names from function declaration (both traditional and arrow)
 * @param {string} functionLine - The function declaration line
 * @param {string} functionType - 'traditional' or 'arrow'
 * @returns {Array} Array of parameter names
 */
function extractParameters(functionLine, functionType = 'traditional') {
    let paramMatch;
    
    if (functionType === 'traditional') {
        paramMatch = functionLine.match(/\(([^)]*)\)/);
    } else {
        // Arrow function parameters
        const arrowMatch = functionLine.match(/=\s*(\([^)]*\)|[\w$]+)\s*=>/);
        if (arrowMatch) {
            const paramPart = arrowMatch[1];
            if (paramPart.startsWith('(') && paramPart.endsWith(')')) {
                // Multiple parameters: (a, b, c) =>
                paramMatch = [null, paramPart.slice(1, -1)];
            } else {
                // Single parameter without parentheses: x =>
                paramMatch = [null, paramPart];
            }
        }
    }
    
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
        report += `${index + 1}. Function: ${func.name} (${func.type})\n`;
        report += `   Parameters: [${func.parameters.join(', ')}]\n`;
        report += `   Lines: ${func.startLine}-${func.endLine} (${func.lineCount} lines)\n`;
        report += `   Code:\n${func.code}\n\n`;
        report += '-'.repeat(50) + '\n\n';
    });
    
    return report;
}
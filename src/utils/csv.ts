import { Lead } from '../types';

/**
 * Convert array of objects to CSV format
 */
export const arrayToCsv = <T extends Record<string, any>>(
  data: T[],
  headers?: (keyof T)[]
): string => {
  if (data.length === 0) return '';

  // Use provided headers or extract from first object
  const csvHeaders = headers || (Object.keys(data[0]) as (keyof T)[]);
  
  // Create header row
  const headerRow = csvHeaders.map(header => String(header)).join(',');
  
  // Create data rows
  const dataRows = data.map(item => 
    csvHeaders.map(header => {
      const value = item[header];
      // Handle values that might contain commas or quotes
      const stringValue = String(value ?? '');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',')
  );

  return [headerRow, ...dataRows].join('\n');
};

/**
 * Convert leads to CSV format
 */
export const leadsToCsv = (leads: Lead[]): string => {
  const headers: (keyof Lead)[] = [
    'id',
    'name',
    'phone', 
    'email',
    'preferred_contact',
    'note',
    'created_at'
  ];

  return arrayToCsv(leads, headers);
};

/**
 * Download CSV file
 */
export const downloadCsv = (csvContent: string, filename: string = 'data.csv'): void => {
  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  const csvWithBom = BOM + csvContent;
  
  const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    // Fallback for older browsers
    console.warn('CSV download not supported in this browser');
  }
};

/**
 * Export leads as CSV file
 */
export const exportLeadsAsCsv = (leads: Lead[], filename?: string): void => {
  const csv = leadsToCsv(leads);
  const defaultFilename = `leads-${new Date().toISOString().split('T')[0]}.csv`;
  downloadCsv(csv, filename || defaultFilename);
};

/**
 * Generate CSV preview (first few rows)
 */
export const getCsvPreview = (csvContent: string, maxRows: number = 5): string => {
  const lines = csvContent.split('\n');
  const previewLines = lines.slice(0, Math.min(lines.length, maxRows + 1)); // +1 for header
  return previewLines.join('\n');
};

/**
 * Validate CSV content
 */
export const validateCsv = (csvContent: string): { 
  isValid: boolean; 
  errors: string[]; 
  rowCount: number;
  columnCount: number;
} => {
  const errors: string[] = [];
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return {
      isValid: false,
      errors: ['CSV is empty'],
      rowCount: 0,
      columnCount: 0,
    };
  }

  const headerColumns = lines[0].split(',').length;
  let isValid = true;

  // Check for consistent column count
  lines.forEach((line, index) => {
    const columns = line.split(',').length;
    if (columns !== headerColumns) {
      errors.push(`Row ${index + 1} has ${columns} columns, expected ${headerColumns}`);
      isValid = false;
    }
  });

  return {
    isValid,
    errors,
    rowCount: lines.length - 1, // Subtract header row
    columnCount: headerColumns,
  };
};
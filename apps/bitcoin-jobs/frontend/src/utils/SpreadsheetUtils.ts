// Utility functions for Handsontable operations

export class SpreadsheetUtils {
  private static getActiveSpreadsheet(): any {
    // Get the active Handsontable instance
    const spreadsheetElement = document.querySelector('.handsontable');
    if (spreadsheetElement) {
      // @ts-ignore - Handsontable instance is attached to the element
      return (spreadsheetElement as any).handsontable;
    }
    
    // Alternative: try to get from global window if available
    if (typeof window !== 'undefined' && (window as any).hotInstance) {
      return (window as any).hotInstance;
    }
    
    return null;
  }

  // Formula insertion functions
  static insertFormula(formula: string): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [row, col] = selected[0];
      hot.setDataAtCell(row, col, `=${formula}`);
    }
  }

  static insertSumFormula(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      // If range is selected, use that range, otherwise prompt for range
      const [startRow, startCol, endRow, endCol] = selected[0];
      if (startRow !== endRow || startCol !== endCol) {
        // Range selected
        const range = this.getRangeString(startRow, startCol, endRow, endCol);
        hot.setDataAtCell(endRow + 1, startCol, `=SUM(${range})`);
      } else {
        // Single cell selected, insert generic SUM
        const range = prompt('Enter range for SUM formula (e.g., A1:A10):');
        if (range) {
          hot.setDataAtCell(startRow, startCol, `=SUM(${range})`);
        }
      }
    }
  }

  static insertAverageFormula(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [startRow, startCol, endRow, endCol] = selected[0];
      if (startRow !== endRow || startCol !== endCol) {
        const range = this.getRangeString(startRow, startCol, endRow, endCol);
        hot.setDataAtCell(endRow + 1, startCol, `=AVERAGE(${range})`);
      } else {
        const range = prompt('Enter range for AVERAGE formula (e.g., A1:A10):');
        if (range) {
          hot.setDataAtCell(startRow, startCol, `=AVERAGE(${range})`);
        }
      }
    }
  }

  static insertCountFormula(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [startRow, startCol, endRow, endCol] = selected[0];
      if (startRow !== endRow || startCol !== endCol) {
        const range = this.getRangeString(startRow, startCol, endRow, endCol);
        hot.setDataAtCell(endRow + 1, startCol, `=COUNT(${range})`);
      } else {
        const range = prompt('Enter range for COUNT formula (e.g., A1:A10):');
        if (range) {
          hot.setDataAtCell(startRow, startCol, `=COUNT(${range})`);
        }
      }
    }
  }

  // Row and Column operations
  static insertRowAbove(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [row] = selected[0];
      hot.alter('insert_row_above', row);
    }
  }

  static insertRowBelow(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [row] = selected[0];
      hot.alter('insert_row_below', row);
    }
  }

  static insertColumnLeft(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [, col] = selected[0];
      hot.alter('insert_col_start', col);
    }
  }

  static insertColumnRight(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [, col] = selected[0];
      hot.alter('insert_col_end', col);
    }
  }

  static deleteRow(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [row] = selected[0];
      hot.alter('remove_row', row);
    }
  }

  static deleteColumn(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [, col] = selected[0];
      hot.alter('remove_col', col);
    }
  }

  // Formatting operations
  static applyBold(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [startRow, startCol, endRow, endCol] = selected[0];
      
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const cellMeta = hot.getCellMeta(row, col);
          const currentStyle = cellMeta.className || '';
          const newStyle = currentStyle.includes('bold') ? 
            currentStyle.replace('bold', '').trim() : 
            `${currentStyle} bold`.trim();
          
          hot.setCellMeta(row, col, 'className', newStyle);
        }
      }
      hot.render();
    }
  }

  static applyCurrency(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [startRow, startCol, endRow, endCol] = selected[0];
      
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          hot.setCellMeta(row, col, 'type', 'numeric');
          hot.setCellMeta(row, col, 'numericFormat', {
            pattern: '$0,0.00'
          });
        }
      }
      hot.render();
    }
  }

  static applyPercentage(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [startRow, startCol, endRow, endCol] = selected[0];
      
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          hot.setCellMeta(row, col, 'type', 'numeric');
          hot.setCellMeta(row, col, 'numericFormat', {
            pattern: '0.00%'
          });
        }
      }
      hot.render();
    }
  }

  // Sorting operations
  static sortAscending(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [, col] = selected[0];
      hot.getPlugin('columnSorting').sort({
        column: col,
        sortOrder: 'asc'
      });
    }
  }

  static sortDescending(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const [, col] = selected[0];
      hot.getPlugin('columnSorting').sort({
        column: col,
        sortOrder: 'desc'
      });
    }
  }

  // Utility functions
  private static getRangeString(startRow: number, startCol: number, endRow: number, endCol: number): string {
    const startCell = this.numberToColumn(startCol) + (startRow + 1);
    const endCell = this.numberToColumn(endCol) + (endRow + 1);
    return `${startCell}:${endCell}`;
  }

  private static numberToColumn(num: number): string {
    let result = '';
    while (num >= 0) {
      result = String.fromCharCode(65 + (num % 26)) + result;
      num = Math.floor(num / 26) - 1;
    }
    return result;
  }

  // Filter operations
  static toggleFilters(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const filtersPlugin = hot.getPlugin('filters');
    if (filtersPlugin.isEnabled()) {
      filtersPlugin.disablePlugin();
    } else {
      filtersPlugin.enablePlugin();
    }
  }

  // Copy/Paste operations
  static copySelection(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const copyPastePlugin = hot.getPlugin('copyPaste');
    copyPastePlugin.copy();
  }

  static cutSelection(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const copyPastePlugin = hot.getPlugin('copyPaste');
    copyPastePlugin.cut();
  }

  static pasteSelection(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const copyPastePlugin = hot.getPlugin('copyPaste');
    copyPastePlugin.paste();
  }

  // Undo/Redo operations
  static undo(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const undoRedoPlugin = hot.getPlugin('undoRedo');
    undoRedoPlugin.undo();
  }

  static redo(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const undoRedoPlugin = hot.getPlugin('undoRedo');
    undoRedoPlugin.redo();
  }

  // Export functionality
  static exportToCSV(): void {
    const hot = this.getActiveSpreadsheet();
    if (!hot) return;

    const exportPlugin = hot.getPlugin('exportFile');
    exportPlugin.downloadFile('csv', {
      filename: 'spreadsheet-export',
      mimeType: 'text/csv'
    });
  }

  // Import functionality  
  static importFromCSV(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const csv = e.target.result;
          const rows = csv.split('\n').map((row: string) => row.split(','));
          
          const hot = this.getActiveSpreadsheet();
          if (hot) {
            hot.loadData(rows);
          }
        };
        reader.readAsText(file);
      }
    };
    
    input.click();
  }
}
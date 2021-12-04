export default class LastWinBingoGame {
  private numberList: string[];
  private tablesList: bingoTable[];

  constructor(numberList: string, tablesList: string[]) {
    this.numberList = this.formatNumberList(numberList);
    this.tablesList = this.formatTablesList(tablesList);
  }

  formatNumberList(numberList: string): string[] {
    return numberList.split(",");
  }

  formatTablesList(tablesList: string[]): bingoTable[] {
    const formattedTables: bingoTable[] = [];

    for (let i = 0; i < tablesList.length; i++) {
      formattedTables.push(this.formatTable(tablesList[i]));
    }

    return formattedTables;
  }

  formatTable(table: string): bingoTable {
    const tableRows = table.split(/\n/gim);
    const formattedTableRows: bingoRow[] = [];

    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i].split(/\s/gim).filter((v) => v !== "");
      const formattedRow: bingoNumber[] = [];

      for (let j = 0; j < row.length; j++) {
        formattedRow.push({ number: row[j], marked: false });
      }

      formattedTableRows.push(formattedRow);
    }

    return formattedTableRows;
  }

  updateTables(drawnNumber: string) {
    for (let i = 0; i < this.tablesList.length; i++) {
      this.tablesList[i] = this.updateTable(this.tablesList[i], drawnNumber);

      const won = this.checkWin(this.tablesList[i]);

      if (won) {
        if (this.tablesList.length === 1) {
          return +drawnNumber * this.sumUnmarkedNumbers(this.tablesList[i]);
        }
        this.tablesList.splice(i, 1);
        i = i - 1;
      }
    }
  }

  updateTable(table: bingoTable, drawnNumber: string): bingoTable {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        if (drawnNumber === table[i][j].number) {
          table[i][j].marked = true;
        }
      }
    }

    return table;
  }

  checkWin(table: bingoTable) {
    let won = false;

    for (let i = 0; i < table.length; i++) {
      let row = true;

      for (let j = 0; j < table[i].length; j++) {
        if (!table[i][j].marked) {
          row = false;
        }
      }

      if (row) {
        won = true;
      }
    }

    for (let i = 0; i < table.length; i++) {
      let column = true;

      for (let j = 0; j < table[i].length; j++) {
        if (!table[j][i].marked) {
          column = false;
        }
      }

      if (column) {
        won = true;
      }
    }

    return won;
  }

  sumUnmarkedNumbers(table: bingoTable) {
    let sum = 0;

    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table.length; j++) {
        if (!table[i][j].marked) {
          sum += parseInt(table[i][j].number);
        }
      }
    }

    return sum;
  }

  getWinnerScore() {
    for (let i = 0; i < this.numberList.length; i++) {
      const result = this.updateTables(this.numberList[i]);

      if (typeof result === "number") {
        return result;
      }
    }
  }
}

type bingoNumber = { number: string; marked: boolean };
type bingoRow = bingoNumber[];
type bingoTable = bingoRow[];

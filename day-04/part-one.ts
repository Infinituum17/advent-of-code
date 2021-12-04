export default class BingoGame {
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

  updateTables(tablesList: bingoTable[], drawnNumber: string) {
    for (let i = 0; i < tablesList.length; i++) {
      tablesList[i] = this.updateTable(tablesList[i], drawnNumber);

      const won = this.checkWin(tablesList[i]);

      if (won) {
        return +drawnNumber * this.sumUnmarkedNumbers(tablesList[i]);
      }
    }

    return tablesList;
  }

  updateTable(table: bingoTable, drawnNumber: string): bingoTable {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        const bingoNumber = table[i][j];

        if (drawnNumber === bingoNumber.number) {
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
        if (!table[i][j].marked) sum += +table[i][j].number;
      }
    }

    return sum;
  }

  getWinnerScore() {
    for (let i = 0; i < this.numberList.length; i++) {
      const result = this.updateTables(this.tablesList, this.numberList[i]);

      if (typeof result === "number") {
        return result;
      } else {
        this.tablesList = result;
      }
    }
  }
}

type bingoNumber = { number: string; marked: boolean };
type bingoRow = bingoNumber[];
type bingoTable = bingoRow[];

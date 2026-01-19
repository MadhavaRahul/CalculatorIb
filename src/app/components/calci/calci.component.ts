import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HistoryService } from '../../service/history.service';

@Component({
  selector: 'app-calci',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calci.component.html',
  styleUrl: './calci.component.css'
})
export class CalciComponent implements OnInit{
  constructor(private historySvc: HistoryService){}
  display = '0';
  firstValue: number | null = null;
  operator: string | null = null;
  isNewInput = true;

  history: any[] = [];
  showHistory = false;

  showSettings = false;

    ngOnInit() {
      this.history=this.historySvc.getHistory();
    // const storedHistory = localStorage.getItem('calcHistory');
    // if (storedHistory) {
    //   this.history = JSON.parse(storedHistory);
    // }
  }

    inputNumber(num: string | number) {
      const value = num.toString();
    if (this.isNewInput) {
      this.display = value;
      this.isNewInput = false;
    } else {
      this.display = this.display === '0' ? value : this.display + value;
    }
  }

    inputDecimal() {
    if (this.isNewInput) {
      this.display = '0.';
      this.isNewInput = false;
      return;
    }

    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

    setOperator(op: string) {
    this.compute();
    this.firstValue = Number(this.display);
    this.operator = op;
    this.isNewInput = true;
  }
    compute() {
  if (this.firstValue === null || this.operator === null) return;

  const second = Number(this.display);
  let result = 0;

  const expression = `${this.firstValue} ${this.operator} ${second}`;

  switch (this.operator) {
    case '+': result = this.firstValue + second;
     break;
    case '-': result = this.firstValue - second;
     break;
    case '*': result = this.firstValue * second;
     break;
    case '/': result = second === 0 ? 0 : this.firstValue / second;
     break;
  }

  // 🔹 Save to history
  this.historySvc.addHistory({
    expression: expression.replace('*', '×').replace('/', '÷'),
    result,
    time: new Date().toLocaleTimeString()
  });

  // localStorage.setItem('calcHistory', JSON.stringify(this.history));
    this.history= this.historySvc.getHistory();

  // 🔹 Update display & state
  this.display = result.toString();
  this.firstValue = result;
  this.operator = null;
}


    equals() {
    this.compute();
    this.isNewInput = true;
  }

  clear() {
    this.display = '0';
    this.firstValue = null;
    this.operator = null;
    this.isNewInput = true;
  }

  backspace() {
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1);      
      if (this.display === '-' || this.display === '') {
        this.display = '0';
        this.isNewInput = true;
      }
      
    } else {
      this.display = '0';
      this.isNewInput = true;
    }
  }

    toggleSign() {
    this.display =
      this.display.startsWith('-')
        ? this.display.slice(1)
        : '-' + this.display;
  }

  percent() {
    this.display = (Number(this.display) / 100).toString();
    this.isNewInput = true;
  }
  toggleHistory() {
  this.showHistory = !this.showHistory;
}
  
toggleSettings() {
  this.showSettings = !this.showSettings;
}

clearHistory() {
  this.history = [];
  this.historySvc.clearHistory();
  // localStorage.removeItem('calcHistory');
  this.showSettings = false;
}

}

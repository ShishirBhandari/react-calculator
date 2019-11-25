import React, { Component } from 'react';
import './App.css';

import Display from './../../components/Display/Display';
import Keypad from './../../components/Keypad/Keypad';

class App extends Component {

  state = {
    expression: ''
  }

  keyPressed = (event) => {
    var character = event.target.innerHTML;

    this.validateExpression(character);
  }

  validateExpression = (char) => {
    switch (char) {
      case 'AC':
        // var poppedExpression = this.state.expression.slice(0, this.state.expression.length - 1);
        var poppedExpression = '';
        this.setState({
          expression: poppedExpression
        })
        break;
      case '=':
        this.solveExpression();
        break;
      case '.':
        if (this.state.expression[this.state.expression.length - 1] === '.')
          return;
        else
          this.setExpression(this.state.expression + char);
        break;
      default:
        this.setExpression(this.state.expression + char);
        break;
    }
  }

  setExpression = (exp) => {
    this.setState({
      expression: exp
    });
  }

  solveExpression = () => {
    var expression = this.state.expression;
    var result = this.evaluateExpression(expression);
    // var postFix = this.infixToPostfix(expression);
    // this.solvePostfix(postFix);
    this.setExpression(result + '');
    console.log(result);
    return;
  }

  isOperator = (char) => {
    if (char === '/' ||
      char === '*' ||
      char === '+' ||
      char === '-' ||
      char === '%'
    ) {
      return true;
    }
    else return false;
  }

  evaluateExpression = (expression) => {
    var valStack = [];
    var opStack = [];

    const precedence = (operator) => {
      switch (operator) {
        case '+':
        case '-':
          return 1;
        case '/':
        case '*':
          return 2;
        case '%':
          return 3;
        default:
          return 0;
      }
    }

    const calculate = (operator, a, b) => {
      switch (operator) {
        case '/':
          return b === 0 ? 'NaN' : a / b;
        case '*':
          return a * b;
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '%':
          return a % b;
        default:
          return 0;
      }
    }

    let i = 0;
    while (i < expression.length) {
      const char = expression[i];
      console.log(char);

      if (char === '(') {
        opStack.push(char);
      }
      else if (char === ')') {
        while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
          //from here
          let operator = opStack.pop();
          let b = valStack.pop();
          let a = valStack.pop();
          let tempRes = calculate(operator, a, b);
          valStack.push(tempRes);
        }
        if (opStack.length > 0)
          opStack.pop();
      }
      else if (this.isOperator(char)) {
        console.log(char);
        while (opStack.length > 0 && precedence(char) < precedence(opStack[opStack.length - 1])) {
          let operator = opStack.pop();
          let b = valStack.pop();
          let a = valStack.pop();
          let tempRes = calculate(operator, a, b);
          valStack.push(tempRes);
        }
        opStack.push(char);
      }
      else if (!isNaN(char)) {
        let val = '';
        while (i < expression.length && (!isNaN(expression[i]) || expression[i] === '.')) {
          val += expression[i];
          i++;
        }
        if (val.split('.').length - 1 > 1) {
          return 'INVALID INPUT'
        }
        valStack.push(Number(val));
        i--;
      }

      i++;
    }

    while (opStack.length > 0) {
      let operator = opStack.pop();
      let b = valStack.pop();
      let a = valStack.pop();
      let tempRes = calculate(operator, a, b);
      valStack.push(tempRes);
    }

    return valStack[0];
  }

  // infixToPostfix = (expression) => {
  //   var stack = [];
  //   var postfix = '';

  //   const precedence = (operator) => {
  //     switch (operator) {
  //       case '+':
  //       case '-':
  //         return 1;
  //         break;
  //       case '/':
  //       case '*':
  //         return 2;
  //         break;
  //       case '%':
  //         return 3;
  //         break;
  //       default:
  //         return 0;
  //         break;
  //     }
  //   }



  //   for (let i = 0; i < expression.length; i++) {
  //     const char = expression[i];

  //     if (char === '(') {
  //       stack.push(char);
  //     }
  //     else if (char === ')') {
  //       while (stack.length > 0 && stack[stack.length - 1] !== '(') {
  //         postfix += stack.pop();
  //       }
  //       if (stack.length > 0)
  //         stack.pop();
  //     }
  //     else if (this.isOperator(char)) {
  //       // if (stack.length > 0 && precedence(char) < precedence(stack[stack.length - 1])) {

  //       // }
  //       while (stack.length > 0 && precedence(char) < precedence(stack[stack.length - 1])) {
  //         postfix += stack.pop();
  //       }
  //       stack.push(char);
  //     }
  //     else {
  //       postfix += char;
  //     }
  //   }

  //   while (stack.length > 0) {
  //     postfix += stack.pop();
  //   }

  //   return postfix;
  // }

  // solvePostfix = (postfix) => {
  //   var result = '';
  //   var stack = [];

  //   const calculate = (operator, a, b) => {
  //     switch (operator) {
  //       case '/':
  //         return b === 0 ? 'NaN' : a / b;
  //         break;
  //       case '*':
  //         return a * b;
  //       case '+':
  //         return a + b;
  //       case '-':
  //         return a - b;
  //       case '%':
  //         return a % b;
  //     }
  //   }

  //   for (let i = 0; i < postfix.length; i++) {
  //     const char = postfix[i];

  //     if (this.isOperator(char)) {
  //       const a = stack.pop();
  //       const b = stack.pop();

  //       var tempRes = calculate(char, b, a);
  //       stack.push(tempRes);
  //     }
  //     else {
  //       stack.push(Number(char));
  //     }
  //   }

  //   result = stack.pop();

  //   this.setExpression(result + '');
  // }

  render() {
    return (
      <div className="App" >
        <h2>React Calculator</h2>
        <Display output={this.state.expression}></Display>
        <Keypad keyPressed={this.keyPressed}></Keypad>

      </div>
    );
  }
}

export default App;

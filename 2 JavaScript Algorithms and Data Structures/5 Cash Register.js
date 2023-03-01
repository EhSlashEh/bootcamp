function checkCashRegister(price, cash, cid) {
  // Dictionary of bill values
  let changeValues = [
    { name: 'ONE HUNDRED', val: 100},
    { name: 'TWENTY', val: 20},
    { name: 'TEN', val: 10},
    { name: 'FIVE', val: 5},
    { name: 'ONE', val: 1},
    { name: 'QUARTER', val: 0.25},
    { name: 'DIME', val: 0.1},
    { name: 'NICKEL', val: 0.05},
    { name: 'PENNY', val: 0.01}
  ];
  
  // Variables
  let output =
  {
    status: null,
    change: []
  };

  var change = cash - price;

  var register = cid.reduce(function(acc, curr) {
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
  },
  {total: 0});
  if(register.total === change) {
    output.status = 'CLOSED';
    output.change = cid;
    return output;
  }
  if (register.total < change) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }
  
  var change_arr = changeValues.reduce(function(acc, curr) {
    var value = 0;
    while (register[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;
      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      acc.push([ curr.name, value ]);
    }
    return acc;
  },
  []);
  
  if (change_arr.length < 1 || change > 0) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }

  output.status = 'OPEN';
  output.change = change_arr;
  return output;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
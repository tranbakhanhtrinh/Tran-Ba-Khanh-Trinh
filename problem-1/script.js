var sum_to_n_a = function (n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result += i
  }
  return result;
};

var sum_to_n_b = function (n) {
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2
};
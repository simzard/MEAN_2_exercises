module.exports = {
    add: function (n1, n2) {
        return n1 + n2;
    },
    subtract: function (n1, n2) {
        return n1 - n2;
    },
    multiply: function (n1, n2) {
        return n1 * n2;
    },
    divide: function (n1, n2) {
        if (n2 == 0) {
            throw new Error("Attempt to divide by zero");
        }
        return n1 / n2;
    }
};





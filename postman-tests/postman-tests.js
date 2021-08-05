let counter = 1;
let testName = null;


//TEST
testName = buildTestName("Check status");
pm.test(testName, function() {
    let exp = 200;
    let res = pm.response.status;
    logExpectedAndResultValues(exp, res, "status");
    pm.response.to.have.status(exp);
});


//TEST
testName = buildTestName("Check p_airline in any rule");
pm.test(testName, function() {
    let rules = pm.response.json();
    let exp = "AK_";
    let res = rules[0].p_airline;
    logExpectedAndResultValues(exp, res, "p_airline in any rule");
    pm.expect(res).to.eql(exp);
});


/**
 * UTILS METHOD
 * Build test name
 * 
 * @param {string} testName 
 * @returns - name like "=== TEST 1 Your test name ==="
 */
function buildTestName(testName) {
    let fullName = "=== TEST " + counter++ + " " + testName + " ===";
    console.log(fullName);
    return fullName;
}

/**
 * UTILS METHOD
 * Log expected and result values into console
 * 
 * @param {*} expected 
 * @param {*} result 
 * @param {*} parameterName - like "flight_number" or so
 */
function logExpectedAndResultValues(expected, result, parameterName) {
    console.log(`exp : ${parameterName} = ${expected}`);
    console.log(`res : ${parameterName} = ${result}`);
}
const assert = require('assert');
const test = require('node:test');

function replaceDoubleQuotes(string) {
    return string.replace(/"/g, "'");
}

// Test cases
test('replaceDoubleQuotes should correctly replace double quotes with single quotes', (t) => {
    // Test case 1: String with double quotes
    let input = 'This is a "test" string';
    let expectedOutput = "This is a 'test' string";
    let actualOutput = replaceDoubleQuotes(input);
    assert.strictEqual(actualOutput, expectedOutput);

    // Test case 2: String without any double quotes
    input = 'This is a test string';
    expectedOutput = 'This is a test string';
    actualOutput = replaceDoubleQuotes(input);
    assert.strictEqual(actualOutput, expectedOutput);

    // Test case 3: String with multiple double quotes
    input = '"Hello" "world"';
    expectedOutput = "'Hello' 'world'";
    actualOutput = replaceDoubleQuotes(input);
    assert.strictEqual(actualOutput, expectedOutput);

    // Test case 4: Empty string
    input = '';
    expectedOutput = '';
    actualOutput = replaceDoubleQuotes(input);
    assert.strictEqual(actualOutput, expectedOutput);

    // Test case 5: String with nested quotes
    input = 'He said, "It\'s a \"great\" day!"';
    expectedOutput = "He said, 'It\'s a 'great' day!'";
    actualOutput = replaceDoubleQuotes(input);
    assert.strictEqual(actualOutput, expectedOutput);

    console.log('All test cases passed.');
});

test('Replace double quotes from a string', () => {
    let input = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2000\" height=\"2000\" viewBox=\"0 0 2048 2048\"><g transform=\"translate(0 0)\"><rect width=\"511.822\" height=\"339.235\" fill=\"grey\" stroke=\"#010101\" class=\"bin\" transform=\"translate(0 0)\"/><g transform=\"translate(586.07175 -488.634) rotate(90)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(586.07175 -430.1451896) rotate(90)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(-165.6375455 -263.06775) rotate(0)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(-107.14873510000001 -263.06775) rotate(0)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(586.07175 -371.6563792) rotate(90)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(-48.65992470000003 -263.06775) rotate(0)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(373.46798709999996 -422.06092519999993) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(-560.5709839 -102.81456110000002) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(435.0221647999999 -398.82588209999994) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(699.0523767999999 606.3865397) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(-203.7238373999999 803.3701628000001) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(511.4453821999999 -312.0194661) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(-149.9595493999999 821.7897656) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(575.1033723999999 -330.9129582) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(-86.3015591999999 802.8962734) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(632.7510500999999 -315.86369709999997) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(-525.1896666 -41.83961720000002) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(-225.93876349999982 1060.8139648) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1043.7230224999998 -332.82251360000004) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-167.44995309999985 1060.8139648) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(1060.8139648 875.1438094) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(604.5209960999999 -756.8986177999999) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(604.5209960999999 -740.9260015999998) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1043.7230224999998 -450.5724842000001) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(1060.8139648 705.2339509) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(604.5209960999999 -835.7324570999999) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-588.1400145999999 1102.3265499) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(1060.8139648 689.9232172999999) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1043.7230224999998 -518.0431056000001) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(1060.8139648 629.8317986999999) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1033.1464930999998 -573.6215818000001) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(614.2890014999999 -729.4750738999999) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(618.3552910999999 -748.9157099999999) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(618.5490096 -1009.1105809) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1030.4664993 -495.07661580000007) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1030.4656383 -510.38750790000006) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(618.9684752 -764.6709064999999) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-564.5334773999998 1367.0685915) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(1084.7182360999998 626.4891068999999) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1017.2099380999999 -502.7271648000001) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(1087.4108299999998 705.2236492999999) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(632.6621673999999 -773.4201704999998) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-558.9949176999999 1102.3152613999998) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-1007.6014994999999 -386.5401363000001) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(643.3767797999999 -1014.7471232999999) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-546.6640585999999 1153.1966842) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-540.7677747999999 1102.3082015999998) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(-532.3773740999998 1160.7937622) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g><g transform=\"translate(660.8880958999999 -894.4842547999999) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"1057.909,602.939 1049.363,604.521 1043.723,597.907 1046.628,589.714 1055.174,588.14 1060.814,594.753\"/></g></g><g transform=\"translate(0 372.90000000000003)\"><rect width=\"511.822\" height=\"339.235\" fill=\"grey\" stroke=\"#010101\" class=\"bin\" transform=\"translate(0 0)\"/><g transform=\"translate(547.1625 586.0717499999998) rotate(180)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(-430.2173933 -263.06775) rotate(0)\"><path id=\"_x36_3-Science_x5F_Centre\" fill=\"green\" stroke=\"#ffffff\" stroke-width=\"0.7056\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" d=\"M 488.63399999999996 280.125 L 525.1724999999999 263.06775 C 525.1724999999999 263.06775 532.85925 286.53075 535.7782499999998 298.5495 C 539.0939999999999 312.20025000000004 541.6987499999999 326.067 543.5917499999999 340.02375 C 545.5065 354.1245 547.0484999999999 368.349 547.1624999999999 382.59675000000004 C 547.2734999999999 396.5295 545.7457499999998 410.43600000000004 544.3364999999999 424.28774999999996 C 543.0052499999999 437.37749999999994 541.4332499999998 450.46574999999996 539.0219999999998 463.3785 C 536.9167499999999 474.64725 534.5024999999998 485.8995 531.0494999999999 496.782 C 525.8362499999998 513.213 518.6159999999999 528.84 511.90049999999985 544.63425 C 508.02224999999976 553.7549999999999 499.6964999999998 571.71225 499.6964999999998 571.71225 L 488.7524999999998 586.07175 L 488.63399999999996 280.125 z\" fill-opacity=\"1\"/></g><g transform=\"translate(-239.4981434999999 899.8059839) rotate(270)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"582.528,372.964 624.57,373.468 631.906,347.062 620.936,326.309 609.533,329.092 592.663,309.654 560.571,335.878 \"/></g><g transform=\"translate(824.5149434 441.8026236999999) rotate(180)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"661.185,157.016 652.101,203.035 718.574,209.716 734.568,180.887 \"/></g><g transform=\"translate(-549.5025348 28.715672799999993) rotate(0)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"661.185,157.016 652.101,203.035 718.574,209.716 734.568,180.887 \"/></g><g transform=\"translate(321.1154184999999 -652.1010132) rotate(90)\"><polygon fill=\"green\" stroke=\"#010101\" stroke-miterlimit=\"10\" points=\"661.185,157.016 652.101,203.035 718.574,209.716 734.568,180.887 \"/></g></g></svg>";
    console.log(replaceDoubleQuotes(input));
});

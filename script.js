var numbers = $('.number'),
    operations = $('.operation'),
    decimalBtn = $('#decimal'),
    c = $('#c'),
    bksp = $ ('.bksp'),
    display = $('#display'),
    sign = $('.sign'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '',
    BkspArray = [];

// ----------------ввод чисел : ----------------------

// мышкой:
    numbers.click( function (e) {
        numberPress(e.target.textContent);
    });

// с клавиатуры:
$ (window).keypress (function(eventObject){

       if (eventObject.which >= 48 && eventObject.which <= 57) {
    numberPress((eventObject.which - 48));
        }
        else if (eventObject.which === 46) {
           decimal();
       }
        else {
           switch (eventObject.which) {
               case 42:
                   keyboardOperation = '*';
                   break;
               case 43:
                   keyboardOperation = '+';
                   break;
               case 45:
                   keyboardOperation = '-';
                   break;
               case 47:
                   keyboardOperation = '/';
                   break;
               case 61:
               case 13:
                   keyboardOperation = '=';
                   console.log(eventObject.which);
                   break;
               }
           operation(keyboardOperation);
           console.log(keyboardOperation);
       };
    });

// --------------- операции -------------------------------------------
// мышкой:
    operations.click( function (e) {
        operation(e.target.textContent);
        });



// -------------------------------------------------------------

    c.click( function (e) {
        clear(e.currentTarget.id);
    });

    sign.click(function (e) {
        var signValue = (display.get(0).value) * (-1);
        display.get(0).value = signValue;
    })

    bksp.click( function (e) {
        var BkspValue = display.get(0).value,
            BkspNewValue = '';
            if (BkspValue.length > 1) {
            for (var i = 0; i < BkspValue.length-1; i++) {
                BkspArray[i] = BkspValue[i];
                BkspNewValue += BkspValue[i];
            };
            } else {
                BkspNewValue = '0';
        }
            display.get(0).value = BkspNewValue;
    } )


    decimalBtn.click( decimal );

function numberPress (number) {
    if (MemoryNewNumber) {
        display.get(0).value = number;
        MemoryNewNumber = false;
    }else {
        if (display.get(0).value === '0') {
            display.get(0).value = number;
        }
        else {
            display.get(0).value += number;
        }
    }


}

function operation (op) {
    var localOperationMemory = display.get(0).value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.get(0).value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };
        display.get(0).value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    };
};

function decimal () {
    var localDecimalMemory = display.get(0).value;
console.log(MemoryNewNumber);
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.get(0).value = localDecimalMemory;
};


function clear (id) {
    display.get(0).value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
    };


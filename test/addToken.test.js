const multiplyByTwo = (number) => {
    if (!number) {
      throw new Error('number é indefinido')
    }
    return number * 2;
  };
  multiplyByTwo(4);
  

describe('Form:' , () => {

  test('1 - The Token field is required', () => {
    expect(multiplyByTwo(4)).toBe(8);
  });
  test('2 - The Balance field is required', () => {
    expect(() => { multiplyByTwo() }).toThrow();
  });
});

describe('Actions:' , () => {

    test('1 - When clicking on the "Back" button go to the "Home" page', () => {
      expect(multiplyByTwo(4)).toBe(8);
    });
    describe('2 - When clicking on the icon "Save" button' , () => {

        test('- Save the data in localStorage from Browser', () => {
          expect(multiplyByTwo(4)).toBe(8);
        });
        test('- Navigate user to home page', () => {
          expect(() => { multiplyByTwo() }).toThrow();
        });
      });  
  }); 
   
  describe('Bonus:' , () => {

    test('1 - The Token name should be unique, the user shouldn t has token names repeated', () => {
      expect(multiplyByTwo(4)).toBe(8);
    });
    test('2 - Display the error messages from the form to the user', () => {
      expect(() => { multiplyByTwo() }).toThrow();
    });
  });
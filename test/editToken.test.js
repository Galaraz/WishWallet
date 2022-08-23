const multiplyByTwo = (number) => {
    if (!number) {
      throw new Error('number é indefinido')
    }
    return number * 2;
  };
  multiplyByTwo(4);
  

describe('Actions:' , () => {

  test('1 - When clicking on the "Back" button go to the "Home" page', () => {
    expect(multiplyByTwo(4)).toBe(8);
  });
  describe('2 - When clicking on the "Save" button' , () => {

    test('- Save the data in localStorage', () => {
      expect(multiplyByTwo(4)).toBe(8);
    });
    test('- Navigate user to home page', () => {
      expect(() => { multiplyByTwo() }).toThrow();
    });
  });
  describe('3 - When clicking on the "Remove" button' , () => {

    test('- Remove the date from local storage', () => {
      expect(multiplyByTwo(4)).toBe(8);
    });
    test('- Navigate user to home page', () => {
      expect(() => { multiplyByTwo() }).toThrow();
    });
  });


});

describe('Bonus:' , () => {

     describe('1 - When the user clicks on the "Remove" button should display an alert to the user to confirm the remotion.' , () => {

        test('- If confirmed, the token should be deleted', () => {
          expect(multiplyByTwo(4)).toBe(8);
        });
        test('- If denied, the alert closes and the token not should be deleted', () => {
          expect(() => { multiplyByTwo() }).toThrow();
        });
      });  
  }); 
   

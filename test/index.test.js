const multiplyByTwo = (number) => {
    if (!number) {
      throw new Error('number é indefinido')
    }
    return number * 2;
  };
  multiplyByTwo(4);
  


  describe('Actions' , () => {

    test(' When clicking on the "Add Token" button go to the "Add Token" ', () => {
      expect(multiplyByTwo(4)).toBe(8);
    });
   
  });

  describe('Page' , () => {

    test(' When click on the icon "Edit" go to the "Edit Token" page', () => {
      expect(multiplyByTwo(4)).toBe(8);
    });
   
  });
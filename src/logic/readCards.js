const cardValues = (id)=> {
        let value = "";
        
        switch (Math.floor(id / 14)) {
          case 0:
          case 4:
            value += 'Red_';
            break;
          case 1:
          case 5:
            value += 'Yellow_';
            break;
          case 2:
          case 6:
            value = 'Green_';
            break;
          case 3:
          case 7:
            value = 'Blue_';
            break;
            default:
                break;
        }
        if (id % 14 === 13) {
          value = 'Wild_';
        }
      
        switch (id % 14) {
          case 10: //Skip
            value += "Block"
            break;
          case 11: //Reverse
            value += "Reverse"
            break;
          case 12: //Draw 2
            value += "Take2"
            break;
          case 13: //Wild nebo Wild Draw 4
            if (Math.floor(id / 14) >= 4) {
              value+= "Pick4"
            } else {
              value += "SwapColor"
            }
            break;
          default: value += (id % 14);
          break;
        }
        return value
}   

export default cardValues
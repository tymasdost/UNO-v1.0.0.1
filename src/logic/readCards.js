const cardValues = (id)=> {
        let value = "";
        
        switch (Math.floor(id / 14)) {
          case 0:
          case 4:
            value += 'red_';
            break;
          case 1:
          case 5:
            value += 'yellow_';
            break;
          case 2:
          case 6:
            value = 'green_';
            break;
          case 3:
          case 7:
            value = 'blue_';
            break;
            default:
                break;
        }
        if (id % 14 === 13) {
          value = 'wild_';
        }
      
        switch (id % 14) {
          case 10: //Skip
            value += "skip"
            break;
          case 11: //Reverse
            value += "reverse"
            break;
          case 12: //Draw 2
            value += "picker"
            break;
          case 13: //Wild or Wild Draw 4
            if (Math.floor(id / 14) >= 4) {
              value+= "pick_four"
            } else {
              value += "color_changer"
            }
            break;
          default: value += (id % 14);
          break;
        }
        return value
}   

export default cardValues
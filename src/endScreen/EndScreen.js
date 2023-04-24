import {React} from 'react';
import './EndScreen.css'

const App = (props) => {
    let text = "";
    switch (props.props) {
        case 0:
            text = "You WON!! GGGGG go next"
        break;
        case 1:
            text = "Player1 WON!! ff go next"
        break;
        case 2:
            text = "Player2 WONER!! you are bad"
        break;
        case 3:
            text = "Player3 is Win!! go play tetris"
        break;
        default:
            text = "Neco je spatne"
    }
  return (
    <>
        <div id='end-wrapper'>
                <div id='winner-heading'>
                    {text}
                </div>
                <div id='play-next' onClick={()=>window.location.href=window.location.href}>
                    Play Again
                </div>
        </div>
    </>
  );
};

export default App;

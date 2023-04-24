import {React, useState} from 'react';
import './Menu.css'

    const skins = ["Uno_Cards","Crypto_Cards"]

const Menu = (props) => {
    const [index, setIndex] = useState(2);
    const playClick = () => {
        props.startPlay(true);
    }
    const startCards = event => {
        document.getElementById('cards').innerHTML = `Starting Cards: ${event.target.value}`;
        props.startCards(event.target.value);
    }
    const gameSpeed = event => {
        document.getElementById('speed').innerHTML = `Ai Play Speed: ${event.target.value}ms`;
        props.gameSpeed(event.target.value);
    }
    const setSkin = (skin)=> {
        props.setSkin(skin);
    }
    const skinPlace = (pos)=> {
        let skin = (pos+index)%skins.length;
        let skinSet = (2+index)%skins.length;
        setSkin(skinSet < 0 ? skins[skinSet *-1] : skins[skinSet]);
        return (skin < 0 ? skins[skin *-1] : skins[skin]);
    }

    return (
        <>
            <div id='wrapper'>
                <div id='left-box'>
                    <div id='play' onClick={playClick}>Play</div>
                    <div className='default-card-wrapper'>
                        <span className="rangeValue" id='cards'>Starting Cards: 5</span>
                        <input
                            type='range'
                            onChange={startCards}
                            min={1}
                            max={11}
                            step={1}
                            defaultValue={5}
                            className='range'>
                        </input>
                    </div>
                    <div className='default-card-wrapper'>
                        <span className="rangeValue" id='speed'>Ai Play Speed: 350ms</span>
                        <input
                            type='range'
                            onChange={gameSpeed}
                            min={0}
                            max={1000}
                            step={50}
                            defaultValue={350}
                            className='range'>
                        </input>
                    </div>
                </div>
                <div id='right-box'>
                    <span id='header-skins'>Skin Preview</span>
                    <div id='skin-container'>
                        <div className='slot' onClick={()=>setIndex(index-1)}><img src={`/${skinPlace(1)}/SkinPRW.png`} alt='Skin' className='skinprew'></img></div>
                        <div id='main-slot'><img src={`/${skinPlace(2)}/SkinPRW.png`} alt='Skin' className='skinprew'></img></div>
                        <div className='slot' onClick={()=>setIndex(index+1)}><img src={`/${skinPlace(3)}/SkinPRW.png`} alt='Skin' className='skinprew'></img><span></span></div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Menu;

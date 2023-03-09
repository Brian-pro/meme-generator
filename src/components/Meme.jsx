import React from "react";

export default function Meme () {

    const [memeImage, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemeImages, setAllMemeImages] = React.useState([]);

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemeImages(data.data.memes)
        }
        
        getMemes()
    }, [])

    console.log(allMemeImages);

    function getMemeImage(event) {
        const {name, type, value} = event.target
        setMemeImage(prevMemeImage => {
            return {
                ...prevMemeImage,
                [name]: type === "button" ? (allMemeImages[Math.floor(Math.random() * allMemeImages.length)].url) : value
            }
        });
    }

    return (
        <main>
            <div className="meme-form">
                <div className="input-container">
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Top Text"
                        name="topText"
                        value={memeImage.topText}
                        onChange={getMemeImage}
                    />
                    <input
                        type="text" 
                        className="input-field" 
                        placeholder="Bottom Text"
                        name="bottomText"
                        value={memeImage.bottomText}
                        onChange={getMemeImage}
                    />
                </div>
                <button type="button" onClick={getMemeImage} className="submit-button" name="randomImage">Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeImage.randomImage} className="meme-image"/>
                <h2 className="meme-text top">{memeImage.topText}</h2>
                <h2 className="meme-text bottom">{memeImage.bottomText}</h2>
            </div>
        </main>
    )
}
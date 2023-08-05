import React from 'react'

const PokemonThumb = ({id, image, name, type, description}) => {
    const style = type + " thumb-container";
    return (
        <div className={style}>
            <div className="number"><small>{id}</small></div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Type: {type}</small>
            </div>
        </div>
    )
}

export default PokemonThumb